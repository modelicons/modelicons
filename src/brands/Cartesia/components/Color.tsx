import { memo } from 'react';

import type { IconType } from '../../../types';

import { TITLE } from '../style';

const Icon: IconType = memo(({ size = '1em', style, ...rest }) => {
  return (
    <svg
      fillRule="evenodd"
      height={size}
      style={{ flex: 'none', lineHeight: 1, ...style }}
      viewBox="0 0 120 120"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{TITLE}</title>
      <polygon fill="#5FCCA2" points="94.2 25.4 94.2 3.3 25.6 3.3 25.6 25.4 3.3 25.4 3.3 48.5 25.6 48.5 25.6 70.8 48.8 70.8 48.8 48.5 71.2 48.5 71.2 70.9 94.2 70.9 94.2 48.5 116.7 48.5 116.7 25.4"/>
  <polygon fill="#5FCCA2" points="94 70.7 94 93.8 71.3 93.8 71.3 116.4 116.7 116.4 116.7 70.7"/>
  <polygon fill="#5FCCA2" points="3.3 70.7 3.3 116.4 48.8 116.4 48.8 93.8 25.8 93.8 25.8 70.7"/>
    </svg>
  );
});

export default Icon;
