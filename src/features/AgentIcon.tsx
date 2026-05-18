import { memo, useMemo, type CSSProperties } from 'react';

import { agentMappings } from '../_internal/agentConfig';
import DefaultAvatar from '../runtime/DefaultAvatar';
import DefaultIcon from '../runtime/DefaultIcon';

export interface AgentIconProps {
  agent?: string;
  className?: string;
  shape?: 'circle' | 'square';
  size?: number;
  style?: CSSProperties;
  type?: 'avatar' | 'mono' | 'color' | 'combine' | 'combine-color';
}

const AgentIcon = memo<AgentIconProps>(
  ({ agent: originAgent, size = 12, type = 'avatar', shape, ...rest }) => {
    const Render = useMemo(() => {
      if (!originAgent) return;
      const target = originAgent.toLowerCase();
      for (const item of agentMappings) {
        if (item.keywords.some((k) => new RegExp(k, 'i').test(target))) return item;
      }
    }, [originAgent]);

    const props: any = { size, ...Render?.props, ...rest };

    switch (type) {
      case 'avatar': {
        if (!Render?.Icon) return <DefaultAvatar shape={shape} {...props} />;
        return <Render.Icon.Avatar shape={shape} {...props} />;
      }
      case 'mono': {
        if (!Render?.Icon) return <DefaultIcon {...props} />;
        return <Render.Icon {...props} />;
      }
      case 'color': {
        if (!Render?.Icon) return <DefaultIcon {...props} />;
        const C = (Render.Icon as any).Color;
        return C ? <C {...props} /> : <Render.Icon {...props} />;
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

AgentIcon.displayName = 'AgentIcon';
export default AgentIcon;
