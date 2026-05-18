import { forwardRef, memo, type CSSProperties, type SVGAttributes } from 'react';

export interface DefaultIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'color'> {
  color?: string;
  size?: number | string;
  style?: CSSProperties;
}

// Generic "provider" mark used when no brand match is found.
// Lucide-equivalent of upstream's lucide-react ProviderIcon, inlined to keep
// the package dependency-free.
const DefaultIcon = memo(
  forwardRef<SVGSVGElement, DefaultIconProps>(function DefaultIcon(
    { color, size = 12, style, ...rest },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        fill="none"
        height={size}
        stroke={color || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        style={{ flex: 'none', lineHeight: 1, ...style }}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }),
);

export default DefaultIcon;
