import { useState, useCallback, useRef } from 'react';
import type { EditTool, KekuleChemSpaceWidget } from '../types/kekuleViewer.types';

interface UseKekuleEditToolsResult {
  currentTool: EditTool | null;
  enabledTools: EditTool[];
  isEditing: boolean;
  setCurrentTool: (tool: EditTool | null) => void;
  toggleTool: (tool: EditTool) => void;
  enableTool: (tool: EditTool) => void;
  disableTool: (tool: EditTool) => void;
  setEnabledTools: (tools: EditTool[]) => void;
  startEditing: () => void;
  stopEditing: () => void;
}

export function useKekuleEditTools(
  initialEnabledTools: EditTool[] = ['select', 'draw', 'erase', 'rotate', 'move']
): UseKekuleEditToolsResult {
  const [currentTool, setCurrentTool] = useState<EditTool | null>(null);
  const [enabledTools, setEnabledTools] = useState<EditTool[]>(initialEnabledTools);
  const [isEditing, setIsEditing] = useState(false);
  const _widgetRef = useRef<KekuleChemSpaceWidget | null>(null);

  const toggleTool = useCallback((tool: EditTool) => {
    setEnabledTools(prev => {
      if (prev.includes(tool)) {
        // Remove a ferramenta
        const newTools = prev.filter(t => t !== tool);
        
        // Se a ferramenta atual foi desabilitada, volta para select
        if (currentTool === tool) {
          setCurrentTool(newTools.includes('select') ? 'select' : null);
        }
        
        return newTools;
      } else {
        // Adiciona a ferramenta
        return [...prev, tool];
      }
    });
  }, [currentTool]);

  const enableTool = useCallback((tool: EditTool) => {
    setEnabledTools(prev => {
      if (!prev.includes(tool)) {
        return [...prev, tool];
      }
      return prev;
    });
  }, []);

  const disableTool = useCallback((tool: EditTool) => {
    setEnabledTools(prev => {
      const newTools = prev.filter(t => t !== tool);
      
      // Se a ferramenta atual foi desabilitada, volta para select
      if (currentTool === tool) {
        setCurrentTool(newTools.includes('select') ? 'select' : null);
      }
      
      return newTools;
    });
  }, [currentTool]);

  const setCurrentToolSafe = useCallback((tool: EditTool | null) => {
    // Só permite selecionar ferramentas habilitadas
    if (tool === null || enabledTools.includes(tool)) {
      setCurrentTool(tool);
    } else {
      console.warn(`Ferramenta ${tool} não está habilitada`);
    }
  }, [enabledTools]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    // Se nenhuma ferramenta está selecionada, seleciona a primeira habilitada
    if (!currentTool && enabledTools.length > 0) {
      setCurrentTool(enabledTools[0]);
    }
  }, [currentTool, enabledTools]);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
    setCurrentTool(null);
  }, []);

  return {
    currentTool,
    enabledTools,
    isEditing,
    setCurrentTool: setCurrentToolSafe,
    toggleTool,
    enableTool,
    disableTool,
    setEnabledTools,
    startEditing,
    stopEditing,
  };
}
