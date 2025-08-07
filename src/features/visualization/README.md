# Visualization Feature

## 🎯 Visão Geral

Esta feature permite a visualização interativa de moléculas químicas em **2D (via RDKit-JS)** e **3D (via 3Dmol.js)**, usando dados obtidos da **PubChem API**. O estado da visualização é gerenciado globalmente com **Zustand**, e os componentes seguem a arquitetura modular do projeto Mol Wise.

---

## 🧱 Arquitetura da Feature

```
src/features/visualization/
├── components/
│   ├── MoleculeSearch.tsx          # Input de busca (nome ou fórmula)
│   ├── MoleculeViewer2D.tsx        # Renderizador 2D usando RDKit-JS
│   ├── MoleculeViewer3D.tsx        # Renderizador 3D usando 3Dmol.js
│   └── VisualizationContainer.tsx  # Componente principal que agrupa tudo
│
├── store/
│   └── visualizationStore.ts       # Zustand global state
│
├── types/
│   └── visualization.types.ts      # Tipagens TypeScript da feature
│
├── utils/
│   └── pubchemAPI.ts               # Função para buscar SMILES e SDF da PubChem
│
├── index.ts                        # Exportações da feature
└── README.md                       # Esta documentação
```

---

## 🧪 Componentes

### MoleculeSearch

Componente de input com botão de busca. Realiza chamada à API da PubChem e atualiza o estado global.

### MoleculeViewer2D

Renderiza a estrutura 2D da molécula usando o SMILES com a biblioteca RDKit-JS compilada para WebAssembly.

### MoleculeViewer3D

Renderiza a estrutura 3D da molécula usando o SDF da PubChem e a biblioteca 3Dmol.js via CDN.

### VisualizationContainer

Componente principal da feature. Contém:

- Barra de busca
- Botões de alternância entre visualização 2D/3D
- Renderização condicional com base no estado

---

## 🧠 Estado Global (Zustand)

```ts
interface VisualizationState {
  query: string;
  smilesData: string;
  sdfData: string;
  viewMode: "2D" | "3D";
  setQuery: (value: string) => void;
  setSmilesData: (value: string) => void;
  setSdfData: (value: string) => void;
  setViewMode: (mode: "2D" | "3D") => void;
}
```

---

## 🌐 Integração com PubChem

As buscas são realizadas por nome ou fórmula. Dois endpoints são utilizados:

- **SMILES:**  
  `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/QUERY/property/CanonicalSMILES/TXT`

- **SDF (3D):**  
  `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/QUERY/SDF`

---

## 📄 Página da Feature

Local: `src/app/[locale]/visualization/page.tsx`

- Utiliza o componente `VisualizationContainer`
- Suporte a i18n com `next-intl`
- Responsivo e acessível

---

## 🧭 Navegação

**Constantes (`src/shared/components/menu/constants.ts`):**

```ts
export const MENU_SECTIONS = {
  CALCULATORS: "calculators",
  CATALOG: "catalog",
  VISUALIZATION: "visualization",
} as const;
```

**Configuração do Menu (`src/shared/components/menu/config/menuConfig.ts`):**

```ts
{
  id: MENU_SECTIONS.VISUALIZATION,
  icon: Atom,
  translationKey: "navigation.visualization",
  items: [
    {
      icon: Atom,
      translationKey: "visualization.title",
      type: "link",
      href: (locale: string) => `/${locale}/visualization`,
    } as const
  ],
}
```

---

## 🈳 Internacionalização

### Chaves necessárias

**`pt.json`**

```json
{
  "navigation": {
    "visualization": "Visualização"
  },
  "visualization": {
    "title": "Visualizador de Moléculas",
    "subtitle": "Explore estruturas químicas em 2D e 3D",
    "description": "Digite o nome de uma molécula para visualizá-la usando dados da PubChem."
  }
}
```

**`en.json`**

```json
{
  "navigation": {
    "visualization": "Visualization"
  },
  "visualization": {
    "title": "Molecule Viewer",
    "subtitle": "Explore molecular structures in 2D and 3D",
    "description": "Enter a molecule name to visualize its structure using PubChem data."
  }
}
```

---

## ✅ Benefícios da Implementação

- **✔️ Open Source**: Uso de RDKit-JS e 3Dmol.js (ambas BSD)
- **✔️ Client-side**: Nenhum backend necessário
- **✔️ Escalável**: Pronto para novos formatos de input (CID, fórmula, etc)
- **✔️ Educacional**: Ideal para fins didáticos e científicos
- **✔️ Separação de responsabilidades**: Cada parte da lógica em seu próprio componente
- **✔️ Internamente consistente com arquitetura do Mol Wise**

---

## 🔄 Fluxo de Uso

1. Usuário acessa `/visualization`
2. Digita o nome de uma molécula (ex: "etanol")
3. A aplicação busca o SMILES e SDF na PubChem
4. RDKit gera a estrutura 2D (SVG)
5. 3Dmol.js renderiza a estrutura 3D
6. Usuário alterna entre os modos 2D e 3D

---
