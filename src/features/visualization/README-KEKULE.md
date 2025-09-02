# KekuleViewer - Visualização Molecular 2D Avançada

## 🎯 Visão Geral

O KekuleViewer é um componente de visualização molecular 2D que utiliza a biblioteca **Kekule.js** para renderização de alta qualidade, com fallback automático para **OpenChemLib** em caso de falha. Oferece funcionalidades avançadas de edição e customização visual.

## 🚀 Características Principais

### ✅ Renderização de Alta Qualidade
- **Kekule.js**: Renderização precisa com geometria molecular correta
- **Fallback Automático**: OpenChemLib como backup em caso de falha
- **Suporte a SMILES e SDF**: Carregamento direto de ambos os formatos

### ✅ Customização Visual
- **Estilos de Renderização**: Completa, Bastão e Esfera, Esqueleto, Arame
- **Cores por Elemento**: Configuração individual de cores para cada elemento químico
- **Temas**: Suporte automático a modo claro/escuro
- **Parâmetros Avançados**: Raio dos átomos, largura das ligações, visibilidade de hidrogênios

### ✅ Ferramentas de Edição
- **Ferramentas Disponíveis**: Selecionar, Desenhar, Apagar, Rotacionar, Mover
- **Controle Individual**: Ativar/desativar ferramentas independentemente
- **Posicionamento Flexível**: Toolbar posicionável em qualquer direção
- **Interface Intuitiva**: Controles visuais com ícones e indicadores

## 📦 Componentes Disponíveis

### KekuleViewerComplete
Componente principal que integra todas as funcionalidades:

```tsx
import { KekuleViewerComplete } from '@/features/visualization';

<KekuleViewerComplete
  showControls={true}
  showToolbar={true}
  toolbarPosition="top"
  controlsPosition="right"
  config={{
    renderStyle: 'complete',
    elementColors: { N: '#0000FF', O: '#FF0000' },
    atomRadius: 12,
    bondWidth: 2,
    enabledTools: ['select', 'draw', 'erase']
  }}
  onMoleculeChange={(molecule) => console.log('Molécula alterada:', molecule)}
  onError={(error) => console.error('Erro:', error)}
/>
```

### KekuleViewer2D
Componente básico sem controles:

```tsx
import { KekuleViewer2D } from '@/features/visualization';

<KekuleViewer2D
  config={{ renderStyle: 'ballStick' }}
  onMoleculeChange={handleMoleculeChange}
/>
```

### KekuleViewerWithFallback
Componente com fallback automático:

```tsx
import { KekuleViewerWithFallback } from '@/features/visualization';

<KekuleViewerWithFallback
  fallbackEnabled={true}
  onFallbackUsed={(reason) => console.log('Fallback usado:', reason)}
/>
```

## 🎛️ Configurações

### RenderStyle
```typescript
type RenderStyle = 'complete' | 'ballStick' | 'skeleton' | 'wireframe';
```

### ElementColor
```typescript
interface ElementColor {
  [element: string]: string; // Ex: { N: '#0000FF', O: '#FF0000' }
}
```

### KekuleViewerConfig
```typescript
interface KekuleViewerConfig {
  renderStyle: RenderStyle;
  elementColors: ElementColor;
  atomRadius: number;
  bondWidth: number;
  showHydrogens: boolean;
  showCharges: boolean;
  showIsotopes: boolean;
  backgroundColor: string;
  enabledTools: EditTool[];
}
```

## 🛠️ Hooks Disponíveis

### useKekuleRenderer
Hook principal para renderização:

```tsx
const {
  isReady,
  hasError,
  errorMessage,
  molecule,
  widget,
  loadMolecule,
  applyConfigToWidget,
} = useKekuleRenderer({
  containerRef,
  smiles,
  sdf,
  config,
  onMoleculeChange,
  onError,
});
```

### useKekuleConfig
Hook para gerenciar configurações:

```tsx
const { config, updateConfig, resetConfig } = useKekuleConfig(initialConfig);
```

### useKekuleEditTools
Hook para ferramentas de edição:

```tsx
const {
  currentTool,
  enabledTools,
  isEditing,
  setCurrentTool,
  toggleTool,
  startEditing,
  stopEditing,
} = useKekuleEditTools(['select', 'draw', 'erase']);
```

## 🔧 Exemplo de Implementação Completa

```tsx
"use client";

import { useState } from "react";
import { KekuleViewerComplete } from "@/features/visualization";
import { useVisualizationStore } from "@/features/visualization/store/visualizationStore";

export function VisualizationPage() {
  const [config, setConfig] = useState({
    renderStyle: 'complete' as const,
    elementColors: { N: '#0000FF', O: '#FF0000', S: '#FFFF00' },
    atomRadius: 12,
    bondWidth: 2,
    enabledTools: ['select', 'draw', 'erase', 'rotate', 'move'] as const,
  });

  const handleConfigChange = (updates: any) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleMoleculeChange = (molecule: any) => {
    console.log('Molécula carregada:', molecule);
  };

  const handleError = (error: Error) => {
    console.error('Erro no visualizador:', error);
  };

  return (
    <div className="w-full h-screen">
      <KekuleViewerComplete
        config={config}
        showControls={true}
        showToolbar={true}
        toolbarPosition="top"
        controlsPosition="right"
        onMoleculeChange={handleMoleculeChange}
        onError={handleError}
        className="w-full h-full"
      />
    </div>
  );
}
```

## 🎨 Customização de Cores

```tsx
// Cores padrão para elementos químicos
const customColors = {
  C: '#000000', // Carbono - Preto
  H: '#FFFFFF', // Hidrogênio - Branco
  N: '#0000FF', // Nitrogênio - Azul
  O: '#FF0000', // Oxigênio - Vermelho
  S: '#FFFF00', // Enxofre - Amarelo
  P: '#FFA500', // Fósforo - Laranja
  F: '#00FF00', // Flúor - Verde
  Cl: '#00FF00', // Cloro - Verde
  Br: '#8B0000', // Bromo - Vermelho escuro
  I: '#800080',  // Iodo - Roxo
};

<KekuleViewerComplete
  config={{
    ...config,
    elementColors: customColors,
  }}
/>
```

## 🔄 Sistema de Fallback

O sistema de fallback funciona automaticamente:

1. **Tenta carregar Kekule.js**
2. **Se falhar**: Ativa fallback para OpenChemLib
3. **Indicador visual**: Mostra quando fallback está sendo usado
4. **Transparente**: Usuário não percebe a mudança

```tsx
<KekuleViewerWithFallback
  fallbackEnabled={true}
  onFallbackUsed={(reason) => {
    console.log('Fallback ativado:', reason);
    // Pode mostrar notificação ao usuário
  }}
/>
```

## 📱 Responsividade

O componente é totalmente responsivo e funciona em:

- **Desktop**: Controles completos com toolbar e painel lateral
- **Tablet**: Controles adaptados para touch
- **Mobile**: Interface simplificada com controles essenciais

## 🎯 Benefícios

### ✅ Qualidade Visual Superior
- Geometria molecular precisa
- Ângulos e distâncias corretos
- Renderização profissional

### ✅ Funcionalidades Avançadas
- Edição interativa de moléculas
- Customização completa de aparência
- Ferramentas profissionais

### ✅ Robustez
- Fallback automático
- Tratamento de erros
- Compatibilidade ampla

### ✅ Flexibilidade
- Componentes modulares
- Configuração granular
- Posicionamento flexível

## 🚀 Próximos Passos

1. **Testes**: Implementar testes unitários e de integração
2. **Performance**: Otimizar carregamento e renderização
3. **Acessibilidade**: Melhorar suporte a screen readers
4. **Documentação**: Expandir exemplos e casos de uso

