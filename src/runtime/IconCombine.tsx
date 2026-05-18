import { forwardRef, memo, type ComponentType, type CSSProperties, type HTMLAttributes } from 'react';

import type { IconType } from '../types';
import type { IconAvatarProps } from './IconAvatar';

// Matches upstream: some brands (LmStudio, XAI, Kimi, etc.) pass their Avatar
// component here, which has a stricter `size: number` prop signature than
// IconType. Accept either shape.
export interface IconCombineProps extends HTMLAttributes<HTMLDivElement> {
  Icon?: IconType | ComponentType<Omit<IconAvatarProps, 'Icon'>>;
  Text?: IconType;
  color?: string;
  extra?: string;
  extraClassName?: string;
  extraStyle?: CSSProperties;
  iconProps?: Partial<IconAvatarProps>;
  inverse?: boolean;
  showLogo?: boolean;
  showText?: boolean;
  size?: number;
  spaceMultiple?: number;
  textMultiple?: number;
}

const IconCombine = memo(
  forwardRef<HTMLDivElement, IconCombineProps>(function IconCombine(
    {
      Icon,
      Text,
      color,
      size = 24,
      spaceMultiple = 1,
      textMultiple = 1,
      extra,
      extraStyle,
      extraClassName,
      iconProps,
      inverse,
      showLogo = true,
      showText = true,
      style,
      ...rest
    },
    ref,
  ) {
    const logo = Icon && showLogo ? (
      <Icon
        size={size}
        {...(iconProps as any)}
        style={
          inverse
            ? { marginLeft: size * spaceMultiple, ...iconProps?.style }
            : { marginRight: size * spaceMultiple, ...iconProps?.style }
        }
      />
    ) : null;

    const text = showText && Text ? <Text size={size * textMultiple} /> : null;

    return (
      <div
        ref={ref}
        style={{
          alignItems: 'center',
          color,
          display: 'flex',
          flex: 'none',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          ...style,
        }}
        {...rest}
      >
        {inverse ? (
          <>
            {text}
            {logo}
          </>
        ) : (
          <>
            {logo}
            {text}
          </>
        )}
        {extra && (
          <span
            className={extraClassName}
            style={{ fontSize: size * textMultiple * 0.95, lineHeight: 1, ...extraStyle }}
          >
            {extra}
          </span>
        )}
      </div>
    );
  }),
);

export default IconCombine;
