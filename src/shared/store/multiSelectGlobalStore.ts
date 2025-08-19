import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cva, type VariantProps } from "class-variance-authority";

// Variants globais para multiselect
export const globalMultiSelectVariants = cva(
  "mx-1 transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-105 duration-200",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-blue-200 hover:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:text-white dark:border-blue-500/30",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-100 dark:border-zinc-600/30",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white dark:border-red-500/30",
        success:
          "border-foreground/10 bg-green-100 hover:bg-green-200 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white dark:border-green-500/30",
        warning:
          "border-foreground/10 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white dark:border-yellow-500/30",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2 py-0.5",
        lg: "text-base px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);


// Configuração de ícones globais
export const globalIconConfig = {
  remove: {
    className: "ml-2 h-4 w-4 cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors",
  },
  dropdown: {
    className: "h-4 w-4 cursor-pointer text-muted-foreground",
  },
  clear: {
    className: "h-4 mx-2 cursor-pointer text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors",
  },
};

// Configuração de animações globais
export const globalAnimationConfig = {
  duration: 0.2,   
  bounce: false,   // remove o efeito de quicar
  scale: 0.02, 
};

// Configuração de comportamento global
export const globalBehaviorConfig = {
  maxDisplayCount: 3,
  showCount: true,
  allowClear: true,
  allowSelectAll: true,
  searchable: true,
};

// Tipo para configuração customizada
export interface CustomMultiSelectConfig {
  variant?: VariantProps<typeof globalMultiSelectVariants>["variant"];
  size?: VariantProps<typeof globalMultiSelectVariants>["size"];
  maxDisplayCount?: number;
  showCount?: boolean;
  allowClear?: boolean;
  allowSelectAll?: boolean;
  searchable?: boolean;
  customStyles?: {
    badge?: string;
    icon?: string;
    container?: string;
  };
}

// Interface do store
interface MultiSelectGlobalState {
  // Configurações globais
  globalConfig: {
    variant: VariantProps<typeof globalMultiSelectVariants>["variant"];
    size: VariantProps<typeof globalMultiSelectVariants>["size"];
    maxDisplayCount: number;
    showCount: boolean;
    allowClear: boolean;
    allowSelectAll: boolean;
    searchable: boolean;
  };
  
  // Configurações específicas por componente
  componentConfigs: Record<string, CustomMultiSelectConfig>;
  
  // Actions
  updateGlobalConfig: (config: Partial<MultiSelectGlobalState["globalConfig"]>) => void;
  setComponentConfig: (componentId: string, config: CustomMultiSelectConfig) => void;
  removeComponentConfig: (componentId: string) => void;
  resetToDefaults: () => void;
  clearAllComponentConfigs: () => void;
  
  // Utilitários
  getConfigForComponent: (componentId: string) => CustomMultiSelectConfig;
  getVariants: () => typeof globalMultiSelectVariants;
  getIcons: () => typeof globalIconConfig;
  getAnimation: () => typeof globalAnimationConfig;
}

// Configuração padrão
const defaultGlobalConfig = {
  variant: "default" as const,
  size: "md" as const,
  maxDisplayCount: globalBehaviorConfig.maxDisplayCount,
  showCount: globalBehaviorConfig.showCount,
  allowClear: globalBehaviorConfig.allowClear,
  allowSelectAll: globalBehaviorConfig.allowSelectAll,
  searchable: globalBehaviorConfig.searchable,
};

export const useMultiSelectGlobalStore = create<MultiSelectGlobalState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      globalConfig: defaultGlobalConfig,
      componentConfigs: {},
      
      // Actions
      updateGlobalConfig: (config) => set((state) => ({
        globalConfig: { ...state.globalConfig, ...config }
      })),
      
      setComponentConfig: (componentId, config) => set((state) => ({
        componentConfigs: {
          ...state.componentConfigs,
          [componentId]: config
        }
      })),
      
      removeComponentConfig: (componentId) => set((state) => {
        const newConfigs = { ...state.componentConfigs };
        delete newConfigs[componentId];
        return { componentConfigs: newConfigs };
      }),
      
      resetToDefaults: () => set({
        globalConfig: defaultGlobalConfig,
        componentConfigs: {},
      }),
      
      // Limpar todas as configurações específicas
      clearAllComponentConfigs: () => set((state) => ({
        ...state,
        componentConfigs: {},
      })),
      
      // Utilitários
      getConfigForComponent: (componentId) => {
        const state = get();
        const componentConfig = state.componentConfigs[componentId];
        
        if (componentConfig) {
          return {
            ...state.globalConfig,
            ...componentConfig,
          };
        }
        
        return state.globalConfig;
      },
      
      getVariants: () => globalMultiSelectVariants,
      getIcons: () => globalIconConfig,
      getAnimation: () => globalAnimationConfig,
    }),
    {
      name: "molclass_multi_select_global",
      partialize: (state) => ({
        globalConfig: state.globalConfig,
        componentConfigs: state.componentConfigs,
      }),
    }
  )
);