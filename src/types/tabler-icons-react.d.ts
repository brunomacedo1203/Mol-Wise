declare module '@tabler/icons-react' {
  import { FC, SVGProps } from 'react';

  export interface TablerIconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: number | string;
  }

  export type TablerIcon = FC<TablerIconProps>;

  export const IconKeyboard: TablerIcon;
  export const IconChevronDown: TablerIcon;
  export const IconChevronUp: TablerIcon;
  export const IconLayoutSidebarLeftCollapse: TablerIcon;
  export const IconLayoutSidebarRightCollapse: TablerIcon;
} 