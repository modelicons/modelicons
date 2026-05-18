import { forwardRef, memo, type CSSProperties, type HTMLAttributes } from 'react';

import type { IconType } from '../types';

const normalizeHex = (hex: string): string | null => {
  const m = hex.trim().toLowerCase();
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(m)) return null;
  if (m.length === 4) return `#${m[1]}${m[1]}${m[2]}${m[2]}${m[3]}${m[3]}`;
  return m;
};

// Mirrors lobe-icons getAvatarShadow: add a faint inset ring on pure black/white
// so the avatar boundary is visible against same-color page backgrounds.
const getAvatarShadow = (background?: string): string | undefined => {
  if (!background) return undefined;
  const hex = normalizeHex(background);
  if (!hex) return undefined;
  if (hex === '#000000') return '0 0 0 1px rgba(255,255,255,0.1) inset';
  if (hex === '#ffffff') return '0 0 0 1px rgba(0,0,0,0.05) inset';
  return undefined;
};

export interface IconAvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  Icon?: IconType;
  background?: string;
  color?: string;
  iconClassName?: string;
  iconMultiple?: number;
  iconStyle?: CSSProperties;
  shape?: 'circle' | 'square';
  size: number;
}

const IconAvatar = memo(
  forwardRef<HTMLDivElement, IconAvatarProps>(function IconAvatar(
    {
      shape = 'circle',
      color = '#fff',
      background,
      size = 24,
      style,
      iconMultiple = 0.75,
      Icon,
      iconStyle,
      iconClassName,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        style={{
          alignItems: 'center',
          background,
          borderRadius: shape === 'circle' ? '50%' : Math.floor(size * 0.1),
          boxShadow: getAvatarShadow(background),
          color,
          display: 'flex',
          flex: 'none',
          height: size,
          justifyContent: 'center',
          overflow: 'hidden',
          width: size,
          ...style,
        }}
        {...rest}
      >
        {Icon && (
          <Icon
            className={iconClassName}
            color={color}
            size={size}
            style={{ transform: `scale(${iconMultiple})`, ...iconStyle }}
          />
        )}
      </div>
    );
  }),
);

export default IconAvatar;
