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
      viewBox="0 0 100 100"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{TITLE}</title>
      <path d="m98.8 71.5-45.6-63c-0.6-1.3-1.5-1.5-2.3-1.5-0.9 0-2.6-0.3-4.1 2l-45.7 62.6c-0.6 0.8-0.9 2.2-0.5 3.5s1.5 2.1 2.5 2.4l45.8 15.1c0.9 0.3 1.3 0.4 2.2 0.1l45.6-14.8c1.2-0.3 2.1-1.1 2.5-2.2s0.3-3.1-0.4-4.2zm-52.6 12.3-36-11.9 13.7-19 22.3-7.2v38.1zm4-47.2c-0.9 0-1.3 0.1-2 0.3l-16.7 5.6 18.4-25.6 18.5 25.6-16.3-5.5c-0.5-0.2-1.1-0.4-1.9-0.4zm3.4 47.2v-38.1l22.5 7.2 13.6 18.9-36.1 12z"/>
    </svg>
  );
});

export default Icon;
