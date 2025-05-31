import { ComponentType } from 'react';

export type MenuItemType = 'link' | 'calculator';
export type CalculatorId = 'molar-mass'; // Adicionando tipo específico para IDs de calculadoras

export interface BaseMenuItemProps {
  icon: ComponentType<{ className?: string }>;
  translationKey: string;
  type: MenuItemType;
}

export interface LinkMenuItemProps extends BaseMenuItemProps {
  type: 'link';
  href: (locale: string) => string;
}

export interface CalculatorMenuItemProps extends BaseMenuItemProps {
  type: 'calculator';
  calculatorId: CalculatorId;
}

export type MenuItemConfig = LinkMenuItemProps | CalculatorMenuItemProps;

// Tipo para os itens do menu após processamento
export interface MenuItemProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  isCollapsed?: boolean;
}

// Tipo para as seções do menu após processamento
export interface MenuSection {
  id: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  items: MenuItemProps[];
}

// Tipo para as seções do menu na configuração
export interface MenuSectionConfig {
  id: string;
  icon: ComponentType<{ className?: string }>;
  translationKey: string;
  items: MenuItemConfig[];
}

export interface MenuState {
  openSections: Record<string, boolean>;
  collapsed: boolean;
}

export interface MenuContextType {
  state: MenuState;
  toggleSection: (id: string) => void;
  setCollapsed: (collapsed: boolean) => void;
}

// Tipo para as props do Menu principal
export interface MenuProps {
  collapsed: boolean;
}

// Tipo para as props do MenuAccordion
export interface MenuAccordionProps {
  section: MenuSection;
}

// Tipo para as props do Submenu
export interface SubmenuProps {
  isOpen: boolean;
  items: MenuItemProps[];
} 