import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes, SVGAttributes } from 'react';

export interface IconBaseProps extends SVGAttributes<SVGSVGElement> {
  size?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export type IconType = ForwardRefExoticComponent<IconBaseProps & RefAttributes<SVGSVGElement>>;
