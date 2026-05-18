import { forwardRef, memo } from 'react';

import DefaultIcon from './DefaultIcon';
import type { IconAvatarProps } from './IconAvatar';

// Background falls back to a transparent gray so it works in both light and
// dark mode without needing a theme context. Override via the `background`
// prop or the `--llmicons-fill-secondary` CSS variable on a parent element.
const DEFAULT_BG = 'var(--llmicons-fill-secondary, rgba(0, 0, 0, 0.06))';

const DefaultAvatar = memo(
  forwardRef<HTMLDivElement, Omit<IconAvatarProps, 'Icon'>>(function DefaultAvatar(
    {
      shape = 'circle',
      color,
      background,
      size = 24,
      style,
      iconMultiple = 0.6,
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
          background: background || DEFAULT_BG,
          borderRadius: shape === 'circle' ? '50%' : Math.floor(size * 0.1),
          color,
          display: 'flex',
          flex: 'none',
          height: size,
          justifyContent: 'center',
          width: size,
          ...style,
        }}
        {...rest}
      >
        <DefaultIcon
          className={iconClassName}
          color={color}
          size={size * iconMultiple}
          style={iconStyle}
        />
      </div>
    );
  }),
);

export default DefaultAvatar;
