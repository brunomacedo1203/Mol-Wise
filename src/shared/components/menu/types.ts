import { ComponentType } from 'react';

export interface MenuItemProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  isCollapsed?: boolean;
}

export interface MenuSection {
  id: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  items: MenuItemProps[];
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