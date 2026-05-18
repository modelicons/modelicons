import { memo, useMemo, type HTMLAttributes } from 'react';

import { providerMappings } from '../_internal/providerConfig';
import type { ModelProviderKey } from '../_internal/providerEnum';
import DefaultIcon from '../runtime/DefaultIcon';

export interface ProviderCombineProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  provider?: ModelProviderKey | string;
  size?: number;
  type?: 'mono' | 'color';
}

const ProviderCombine = memo<ProviderCombineProps>(
  ({ provider: originProvider, size = 12, type = 'color', ...rest }) => {
    const Render = useMemo(() => {
      if (!originProvider) return;
      const provider = originProvider.toLowerCase();
      for (const item of providerMappings) {
        if (item.keywords.some((k) => k.toLowerCase() === provider)) return item;
      }
    }, [originProvider]);

    const iconProps: any = {
      size: size * (Render?.combineMultiple || 1),
      type,
      ...Render?.props,
    };

    let icon;
    if (Render?.Combine) {
      const C = Render.Combine;
      icon = <C {...iconProps} />;
    } else if ((Render?.Icon as any)?.Combine) {
      const C = (Render!.Icon as any).Combine;
      icon = <C {...iconProps} />;
    } else if ((Render?.Icon as any)?.Text) {
      const T = (Render!.Icon as any).Text;
      icon = <T {...iconProps} />;
    } else {
      icon = <DefaultIcon size={size} />;
    }

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flex: 'none',
          flexDirection: 'row',
          height: size * 1.5,
          width: 'fit-content',
        }}
        {...rest}
      >
        {icon}
      </div>
    );
  },
);

ProviderCombine.displayName = 'ProviderCombine';
export default ProviderCombine;
