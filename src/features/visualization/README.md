# Visualization Feature

## 🎯 Visão Geral

Esta feature permite a visualização interativa de moléculas químicas em **2D (via OpenChemLib - OCL)** e **3D (via 3Dmol.js)**, usando dados obtidos da **PubChem API**. O estado da visualização é gerenciado globalmente com **Zustand**, e os componentes seguem a arquitetura modular do projeto Mol Class.

---

## 🧱 Arquitetura da Feature

```
src/features/visualization/
├── components/
│   ├── MoleculeSearch.tsx          # Input de busca (nome, fórmula, SMILES ou CID)
│   ├── MoleculeViewer2D.tsx        # Renderizador 2D usando OpenChemLib (SVG)
│   ├── MoleculeViewer3D.tsx        # Renderizador 3D usando 3Dmol.js
│   └── VisualizationContainer.tsx  # Componente principal que agrupa tudo
│
├── store/
│   └── visualizationStore.ts       # Zustand global state
│
├── types/
│   └── 3dmol.d.ts                  # Tipagens auxiliares do 3Dmol.js
│
├── utils/
│   ├── pubchemAPI.ts               # Busca SMILES/SDF na PubChem (resolve CID)
│   └── waitFor3Dmol.ts             # Aguardador do namespace $3Dmol no client
│
├── index.ts                        # Exportações da feature
└── README.md                       # Esta documentação
```

---

## 🧪 Componentes

### MoleculeSearch

Componente de input com botão de busca. Realiza chamada à API da PubChem e atualiza o estado global.

### MoleculeViewer2D

Renderiza a estrutura 2D da molécula gerando um SVG com **OpenChemLib (OCL)**.

- Prioriza dados em **SDF/Molfile** quando disponíveis
- Fallback para **SMILES** (OCL gera coordenadas 2D automaticamente)

### MoleculeViewer3D

Renderiza a estrutura 3D da molécula usando o **SDF** da PubChem e a biblioteca **3Dmol.js** via CDN.

### VisualizationContainer

Componente principal da feature. Contém:

- Barra de busca
- Botões de alternância entre visualização 2D/3D
- Renderização condicional com base no estado

---

## 🧠 Estado Global (Zustand)

```ts
type ViewMode = "2D" | "3D";

interface VisualizationState {
  viewMode: ViewMode;
  smilesData: string | null;
  sdfData: string | null;
  setViewMode: (mode: ViewMode) => void;
  setSmilesData: (value: string | null) => void;
  setSdfData: (value: string | null) => void;
}
```

---

## 🌐 Integração com PubChem

As buscas aceitam nome, fórmula, SMILES ou CID. A lógica resolve um **CID** e então busca dados robustos:

- **SMILES (IsomericSMILES):**  
  `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/QUERY/property/IsomericSMILES/TXT`

- **SDF (preferência 3D com fallback 2D por CID):**
  1. `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/CID/SDF?record_type=3d`
  2. `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/CID/SDF`

> Observação: quando a entrada é fórmula ou SMILES, a aplicação resolve o CID antes de buscar o SDF.

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

- **✔️ Open Source**: Uso de OpenChemLib e 3Dmol.js (BSD)
- **✔️ Client-side**: Nenhum backend necessário
- **✔️ Escalável**: Pronto para novos formatos de input (CID, fórmula, etc)
- **✔️ Educacional**: Ideal para fins didáticos e científicos
- **✔️ Separação de responsabilidades**: Cada parte da lógica em seu próprio componente
- **✔️ Consistente com arquitetura do Mol Class**

---

## 🔄 Fluxo de Uso

1. Usuário acessa `/visualization`
2. Digita o nome/fórmula/SMILES/CID (ex: "etanol", "H2O", "C1=CC=CC=C1", "241")
3. A aplicação resolve CID na PubChem e busca SMILES e SDF
4. OpenChemLib gera a estrutura 2D (SVG)
5. 3Dmol.js renderiza a estrutura 3D (SDF)
6. Usuário alterna entre os modos 2D e 3D

---
