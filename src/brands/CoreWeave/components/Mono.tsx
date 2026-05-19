import { memo } from 'react';

import type { IconType } from '../../../types';

import { TITLE } from '../style';

const Icon: IconType = memo(({ size = '1em', style, ...rest }) => {
  return (
    <svg
      fill="currentColor"
      fillRule="evenodd"
      height={size}
      style={{ flex: 'none', lineHeight: 1, ...style }}
      viewBox="0 0 150 150"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{TITLE}</title>
      <rect x="4.1" y="4.1" width="28.5" height="56.6"/>
  <rect x="60.7" y="31.8" width="28.9" height="85.7"/>
  <rect x="117.4" y="4.1" width="28.6" height="56.6"/>
  <rect x="4.1" y="117.3" width="28.5" height="28.4"/>
  <rect x="117.4" y="117.3" width="28.6" height="28.4"/>
    </svg>
  );
});

export default Icon;
