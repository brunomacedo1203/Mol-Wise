import { useEffect, useRef, useState, useCallback } from 'react';
import type { KekuleViewerConfig, KekuleViewerState } from '../types/kekuleViewer.types';
import { KEKULE_LOAD_TIMEOUT } from '../constants/kekuleViewer.constants';

interface UseKekuleRendererProps {
  containerRef: React.RefObject<HTMLDivElement>;
  smiles: string | null;
  sdf: string | null;
  config: KekuleViewerConfig;
  onMoleculeChange?: (molecule: any) => void;
  onError?: (error: Error) => void;
}

export function useKekuleRenderer({
  containerRef,
  smiles,
  sdf,
  config,
  onMoleculeChange,
  onError,
}: UseKekuleRendererProps) {
  const [state, setState] = useState<KekuleViewerState>({
    isReady: false,
    hasError: false,
    errorMessage: null,
    isEditing: false,
    currentTool: null,
    molecule: null,
    widget: null,
  });

  const kekuleRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);
  const _retryCountRef = useRef(0);

  // Carrega Kekule.js dinamicamente
  const loadKekule = useCallback(async (): Promise<boolean> => {
    try {
      const Kekule = await import('kekule');
      kekuleRef.current = Kekule.default || Kekule;
      return true;
    } catch (error) {
      console.error('❌ Erro ao carregar Kekule.js:', error);
      return false;
    }
  }, []);

  // Inicializa o widget Kekule
  const initializeWidget = useCallback(async (): Promise<boolean> => {
    const container = containerRef.current;
    const Kekule = kekuleRef.current;
    
    if (!container || !Kekule) return false;

    try {
      // Cria o widget
      const widget = new Kekule.Widget.ChemSpaceWidget(container);
      widgetRef.current = widget;

      // Configura o widget
      widget.setRenderMode(Kekule.Style.RenderMode.COMPLETE);
      widget.setEditMode(Kekule.EditMode.SELECT);

      // Aplica configurações
      applyConfigToWidget(widget, config);

      setState(prev => ({
        ...prev,
        isReady: true,
        widget,
        hasError: false,
        errorMessage: null,
      }));

      return true;
    } catch (error) {
      console.error('❌ Erro ao inicializar widget Kekule:', error);
      return false;
    }
  }, [containerRef, config]);

  // Aplica configurações ao widget
  const applyConfigToWidget = useCallback((widget: any, config: KekuleViewerConfig) => {
    if (!widget) return;

    const Kekule = kekuleRef.current;
    if (!Kekule) return;

    try {
      // Configura modo de renderização
      switch (config.renderStyle) {
        case 'complete':
          widget.setRenderMode(Kekule.Style.RenderMode.COMPLETE);
          break;
        case 'ballStick':
          widget.setRenderMode(Kekule.Style.RenderMode.BALL_STICK);
          break;
        case 'skeleton':
          widget.setRenderMode(Kekule.Style.RenderMode.SKELETON);
          break;
        case 'wireframe':
          widget.setRenderMode(Kekule.Style.RenderMode.WIREFRAME);
          break;
      }

      // Configura cores dos elementos
      if (config.elementColors) {
        // Kekule.js tem sistema próprio de cores, aplicamos via CSS customizado
        applyElementColors(config.elementColors);
      }

      // Configura ferramentas habilitadas
      config.enabledTools.forEach(tool => {
        widget.enableTool(tool, true);
      });

      // Desabilita ferramentas não habilitadas
      ['select', 'draw', 'erase', 'rotate', 'move'].forEach(tool => {
        if (!config.enabledTools.includes(tool as any)) {
          widget.enableTool(tool, false);
        }
      });

    } catch (error) {
      console.warn('⚠️ Erro ao aplicar configurações:', error);
    }
  }, []);

  // Aplica cores dos elementos via CSS
  const applyElementColors = useCallback((elementColors: Record<string, string>) => {
    const container = containerRef.current;
    if (!container) return;

    // Remove estilos anteriores
    const existingStyle = container.querySelector('#kekule-element-colors');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Cria novo estilo
    const style = document.createElement('style');
    style.id = 'kekule-element-colors';
    
    const cssRules = Object.entries(elementColors)
      .map(([element, color]) => 
        `.kekule-atom[data-element="${element}"] { fill: ${color} !important; }`
      )
      .join('\n');
    
    style.textContent = cssRules;
    container.appendChild(style);
  }, [containerRef]);

  // Carrega molécula no widget
  const loadMolecule = useCallback(async (): Promise<boolean> => {
    const widget = widgetRef.current;
    const Kekule = kekuleRef.current;
    
    if (!widget || !Kekule) return false;

    try {
      let molecule = null;

      // Tenta carregar a partir do SDF
      if (sdf) {
        try {
          molecule = Kekule.Chem.Molecule.fromMolfile(sdf);
        } catch (error) {
          console.warn('⚠️ Erro ao processar SDF:', error);
        }
      }

      // Fallback para SMILES
      if (!molecule && smiles) {
        try {
          molecule = Kekule.Chem.Molecule.fromSmiles(smiles);
        } catch (error) {
          console.warn('⚠️ Erro ao processar SMILES:', error);
        }
      }

      if (!molecule) {
        setState(prev => ({
          ...prev,
          molecule: null,
          hasError: true,
          errorMessage: 'Não foi possível carregar a molécula',
        }));
        return false;
      }

      // Define a molécula no widget
      widget.setMolecule(molecule);
      widget.repaint();

      setState(prev => ({
        ...prev,
        molecule,
        hasError: false,
        errorMessage: null,
      }));

      // Notifica mudança
      onMoleculeChange?.(molecule);

      return true;
    } catch (error) {
      console.error('❌ Erro ao carregar molécula:', error);
      setState(prev => ({
        ...prev,
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Erro desconhecido',
      }));
      onError?.(error instanceof Error ? error : new Error('Erro ao carregar molécula'));
      return false;
    }
  }, [smiles, sdf, onMoleculeChange, onError]);

  // Inicialização principal
  useEffect(() => {
    let disposed = false;

    const initialize = async () => {
      if (disposed) return;

      setState(prev => ({ ...prev, isReady: false, hasError: false }));

      // Carrega Kekule.js
      const kekuleLoaded = await loadKekule();
      if (!kekuleLoaded || disposed) {
        if (!disposed) {
          setState(prev => ({
            ...prev,
            hasError: true,
            errorMessage: 'Falha ao carregar Kekule.js',
          }));
        }
        return;
      }

      // Inicializa widget
      const widgetInitialized = await initializeWidget();
      if (!widgetInitialized || disposed) {
        if (!disposed) {
          setState(prev => ({
            ...prev,
            hasError: true,
            errorMessage: 'Falha ao inicializar widget',
          }));
        }
        return;
      }

      // Carrega molécula se disponível
      if ((smiles || sdf) && !disposed) {
        await loadMolecule();
      }
    };

    // Timeout para carregamento
    const timeout = setTimeout(() => {
      if (!disposed && !state.isReady) {
        setState(prev => ({
          ...prev,
          hasError: true,
          errorMessage: 'Timeout ao carregar Kekule.js',
        }));
      }
    }, KEKULE_LOAD_TIMEOUT);

    initialize();

    return () => {
      disposed = true;
      clearTimeout(timeout);
    };
  }, []); // Executa apenas uma vez na montagem

  // Recarrega molécula quando dados mudam
  useEffect(() => {
    if (state.isReady && (smiles || sdf)) {
      loadMolecule();
    }
  }, [smiles, sdf, state.isReady, loadMolecule]);

  // Aplica configurações quando mudam
  useEffect(() => {
    if (state.isReady && state.widget) {
      applyConfigToWidget(state.widget, config);
    }
  }, [config, state.isReady, state.widget, applyConfigToWidget]);

  return {
    ...state,
    loadMolecule,
    applyConfigToWidget,
  };
}
