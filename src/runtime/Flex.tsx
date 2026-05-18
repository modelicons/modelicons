import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  horizontal?: boolean;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  gap?: number | string;
  flex?: CSSProperties['flex'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  children?: ReactNode;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { horizontal, align, justify, gap, flex, width, height, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: align,
        justifyContent: justify,
        gap,
        flex,
        width,
        height,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Flex;
