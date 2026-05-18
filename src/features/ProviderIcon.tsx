import { memo, useMemo, type CSSProperties } from 'react';

import { providerMappings } from '../_internal/providerConfig';
import { ModelProvider, type ModelProviderKey } from '../_internal/providerEnum';
import DefaultAvatar from '../runtime/DefaultAvatar';
import DefaultIcon from '../runtime/DefaultIcon';

export interface ProviderIconProps {
  className?: string;
  forceMono?: boolean;
  provider?: ModelProviderKey | string;
  shape?: 'circle' | 'square';
  size?: number;
  style?: CSSProperties;
  type?: 'avatar' | 'mono' | 'color' | 'combine' | 'combine-color';
}

const ProviderIcon = memo<ProviderIconProps>(
  ({ provider: originProvider, size = 12, type = 'avatar', forceMono, shape, ...rest }) => {
    const Render = useMemo(() => {
      if (!originProvider) return;
      const provider = originProvider.toLowerCase();
      for (const item of providerMappings) {
        if (item.keywords.some((k) => k.toLowerCase() === provider)) return item;
      }
    }, [originProvider]);

    const props: any = { size, ...Render?.props, ...rest };

    switch (type) {
      case 'avatar':
        if (!Render?.Icon) return <DefaultAvatar shape={shape} {...props} />;
        return <Render.Icon.Avatar shape={shape} {...props} />;
      case 'mono':
        if (!Render?.Icon) return <DefaultIcon {...props} />;
        if (!forceMono && originProvider === ModelProvider.LobeHub) {
          const C = (Render.Icon as any).Color;
          if (C) return <C {...props} />;
        }
        return <Render.Icon {...props} />;
      case 'color': {
        if (!Render?.Icon) return <DefaultIcon {...props} />;
        const Color = (Render.Icon as any).Color;
        return Color ? <Color {...props} /> : <Render.Icon {...props} />;
      }
      case 'combine': {
        if (!Render?.Icon) return <DefaultIcon {...props} />;
        const I = Render.Icon as any;
        if (I.Combine) return <I.Combine type="mono" {...props} />;
        if (I.Brand) return <I.Brand {...props} />;
        if (I.Text) return <I.Text {...props} />;
        return <Render.Icon {...props} />;
      }
      case 'combine-color': {
        if (!Render?.Icon) return <DefaultIcon {...props} />;
        const I = Render.Icon as any;
        if (I.Combine) return <I.Combine type="color" {...props} />;
        if (I.BrandColor) return <I.BrandColor {...props} />;
        if (I.Text) return <I.Text {...props} />;
        return <Render.Icon {...props} />;
      }
      default:
        return <DefaultIcon {...props} />;
    }
  },
);

ProviderIcon.displayName = 'ProviderIcon';
export default ProviderIcon;
