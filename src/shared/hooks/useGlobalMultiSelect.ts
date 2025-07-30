import { useMultiSelectGlobalStore, type CustomMultiSelectConfig } from "../store/multiSelectGlobalStore";

export function useGlobalMultiSelect(componentId?: string, customConfig?: CustomMultiSelectConfig) {
  const {
    getConfigForComponent,
    getVariants,
    getIcons,
    getAnimation,
    setComponentConfig,
    removeComponentConfig,
  } = useMultiSelectGlobalStore();

  // Se um componentId foi fornecido, usar configuração específica
  const config = componentId ? getConfigForComponent(componentId) : getConfigForComponent("default");
  
  // Aplicar configuração customizada se fornecida
  const finalConfig = customConfig ? { ...config, ...customConfig } : config;

  return {
    config: finalConfig,
    variants: getVariants(),
    icons: getIcons(),
    animation: getAnimation(),
    setComponentConfig: componentId ? setComponentConfig : undefined,
    removeComponentConfig: componentId ? removeComponentConfig : undefined,
  };
} 