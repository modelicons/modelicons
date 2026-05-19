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
      viewBox="0 0 128 128"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{TITLE}</title>
      <polygon points="2.6 28.9 63.9 2.9 123.9 28.9 63.9 55.9"/>
  <polygon points="2.6 29.5 2.9 83 49.3 50.1"/>
  <polygon points="63.9 55.9 63.9 103.6 108 36.3"/>
  
  
  
  <path d="m125.3 27-60.4-25.9c-0.8-0.3-2.2-0.4-2.9-0.1l-60.4 25.9c-0.6 0.3-1.3 0.6-1.3 1.2v70.4c0 1.3 0.6 2.6 1.9 3.3l61.2 25.7 60.6-24.8c1.1-0.5 2.4-2.1 2.4-3.5l0.1-70.7c0-0.9-0.5-1.2-1.2-1.5zm-120.7 5.2 40.7 18.1-40.6 29.3-0.1-47.4zm0.1 66c-0.1-4.6-0.2-7.8-0.1-13.3l45.4-32.6 10.7 4.7c0.4 1.2 0.4 2.1 0.3 3.9l-53.7 38.5-2.6-1.2zm56.1 23.4-48.5-20.4 48.5-34.8c0.2 14.6 0.1 40 0 55.2zm-53-92.9 55-23.3c0.7-0.4 1-0.2 1.4-0.1l54.6 23.5-55.2 24.6-55.8-24.7zm57.9 28.7 36.7-16.6-36.7 56.9v-40.3zm56.2 40.9-38.9 16.1 38.8-63.3c0.5 11.4 0.3 32.3 0.1 47.2zm0.1-56.3-46.5 75.8-9.8 4c-0.2-4.2-0.2-10.5-0.1-16.2l43.8-68 12.5-5.6 0.2 0.1-0.1 9.9z"/>
    </svg>
  );
});

export default Icon;
