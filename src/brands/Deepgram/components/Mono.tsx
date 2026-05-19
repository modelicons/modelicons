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
      viewBox="0 0 100 104.9"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{TITLE}</title>
      <path d="m48.4 17.8h-31.9l-1.8 2.2 0.1 33 1.8 1.8h19.4l0.8-0.8v-14h11.2c5.4 0 10 4.6 10 10.1 0 5.4-4.1 9.9-9.6 9.9h-11.1l-22.3 25.4 1.5 2.6h29.9c15.5 0 29.6-10 33.5-23.1 5.2-17.4-5.9-47.1-31.5-47.1z"/>
  <path d="m48.3 20h-31.3v33h19.5v-13.7h11.5c5.9 0 11.5 4.7 11.5 10.7 0.8 6.2-3.6 12-10.2 16h-12l-19.3 19.9 1.5 0.6h28.5c15.9 0 28-9.5 31.9-21.9 5.1-17-4.3-44.6-31.6-44.6z"/>
  <path d="m41.8 22.2h-21.8v28.4h14v-11.3h12.6c8.2 0 13.3 5.7 14.3 11.4 1.2 9.2-6.2 16.2-12.9 16.2h-11.3l-15.3 16.7h24.6c17.2 0 32-8.3 32-30.5 0-15.1-7.5-30.9-36.2-30.9z"/>
    </svg>
  );
});

export default Icon;
