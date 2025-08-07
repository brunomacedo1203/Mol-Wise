# MolView Feature

## Visão Geral

Esta feature incorpora o MolView (visualizador de moléculas) no Mol Wise via iframe, permitindo aos usuários explorar moléculas de forma interativa sem sair da aplicação.

## Arquitetura

```
src/features/molview/
├── components/
│   └── MolViewIframe.tsx    # Componente principal do iframe
├── types/
│   └── molview.types.ts     # Definições TypeScript
├── index.ts                 # Exportações da feature
└── README.md               # Esta documentação
```

## Componentes

### MolViewIframe

Componente principal que renderiza o iframe do MolView.

**Props:**

- `width?: string` - Largura do iframe (padrão: '100%')
- `height?: string` - Altura do iframe (padrão: '600px')
- `className?: string` - Classes CSS adicionais

**Características:**

- URL: `https://app.molview.org/`
- Sandbox habilitado para segurança
- Lazy loading para performance
- Título acessível
- Classes Tailwind para estilo

**Exemplo de uso:**

```tsx
import { MolViewIframe } from "@/features/molview";

<MolViewIframe width="100%" height="700px" className="w-full" />;
```

## Tipos TypeScript

### MolViewIframeProps

```typescript
export interface MolViewIframeProps {
  width?: string;
  height?: string;
  className?: string;
}
```

## Página de Implementação

A página está localizada em `src/app/[locale]/molview/page.tsx` e inclui:

- Layout responsivo
- Título e descrição
- Componente MolViewIframe integrado
- Suporte a internacionalização

## Menu de Navegação

### Configuração Adicionada

**Constantes (`src/shared/components/menu/constants.ts`):**

```typescript
export const MENU_SECTIONS = {
  CALCULATORS: "calculators",
  CATALOG: "catalog",
  MOLVIEW: "molview", // Nova seção
} as const;
```

**Configuração do Menu (`src/shared/components/menu/config/menuConfig.ts`):**

```typescript
{
  id: MENU_SECTIONS.MOLVIEW,
  icon: Atom,
  translationKey: "navigation.molview",
  items: [
    {
      icon: Atom,
      translationKey: "molview.title",
      type: "link",
      href: (locale: string) => `/${locale}/molview`,
    } as const
  ],
}
```

## Internacionalização

### Chaves de Tradução Necessárias

**Português (`src/messages/pt.json`):**

```json
{
  "navigation": {
    "molview": "MolView"
  },
  "molview": {
    "title": "Visualizador de Moléculas"
  }
}
```

**Inglês (`src/messages/en.json`):**

```json
{
  "navigation": {
    "molview": "MolView"
  },
  "molview": {
    "title": "Molecule Viewer"
  }
}
```

## Segurança

### Configurações do iframe

- **Sandbox**: `allow-scripts allow-same-origin allow-forms`
- **Loading**: `lazy` para performance
- **Title**: Atributo acessível definido

### Content Security Policy (Opcional)

Se necessário, adicionar ao `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "frame-src 'self' https://app.molview.org;"
        }
      ]
    }
  ];
}
```

## Benefícios da Implementação

✅ **Simplicidade**: Estrutura enxuta e focada  
✅ **Performance**: Lazy loading e otimizações  
✅ **Acessibilidade**: Título e atributos adequados  
✅ **Segurança**: Sandbox configurado  
✅ **Responsividade**: Funciona em todos os dispositivos  
✅ **Internacionalização**: Suporte completo a i18n  
✅ **TypeScript**: Tipagem completa  
✅ **Manutenibilidade**: Código limpo e documentado

## Fluxo de Uso

1. Usuário acessa `/molview` via menu de navegação
2. Página carrega com título e descrição
3. iframe do MolView é renderizado
4. Usuário interage diretamente com o MolView
5. Mol Wise não controla ou envia dados para o MolView

## Considerações Técnicas

- **Sem Controle**: O Mol Wise não controla o MolView
- **URL Externa**: `https://app.molview.org/`
- **Responsividade**: iframe se adapta ao container
- **Performance**: Lazy loading reduz tempo de carregamento
- **SEO**: Página indexável com meta tags adequadas

## Próximos Passos (Opcionais)

- [ ] Adicionar loading state visual
- [ ] Implementar error handling
- [ ] Adicionar analytics de uso
- [ ] Criar testes unitários
- [ ] Adicionar mais configurações de tema
