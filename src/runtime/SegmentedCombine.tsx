import { forwardRef, memo, type HTMLAttributes, type ReactNode } from 'react';

export interface SegmentedCombineProps extends HTMLAttributes<HTMLDivElement> {
  left: ReactNode;
  right: ReactNode;
  size?: number;
}

// Replaces upstream `features/ProviderCombine/Combine.tsx` which used
// @lobehub/ui Flexbox + antd Divider. Same visual: two icons separated by a
// thin vertical line whose height tracks `size`.
const SegmentedCombine = memo(
  forwardRef<HTMLDivElement, SegmentedCombineProps>(function SegmentedCombine(
    { left, right, size = 24, style, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        style={{
          alignItems: 'center',
          display: 'flex',
          flex: 'none',
          flexDirection: 'row',
          gap: size / 3,
          ...style,
        }}
        {...rest}
      >
        {left}
        <span
          aria-hidden
          style={{
            alignSelf: 'stretch',
            background: 'currentColor',
            display: 'inline-block',
            marginInline: size / 6,
            opacity: 0.18,
            width: 1,
          }}
        />
        {right}
      </div>
    );
  }),
);

export default SegmentedCombine;
