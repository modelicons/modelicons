import { memo } from 'react';

import type { IconType } from '../../../types';

import { TITLE } from '../style';

const Icon: IconType = memo(({ size = '1em', style, ...rest }) => {
  return (
    <svg
      fillRule="evenodd"
      height={size}
      style={{ flex: 'none', lineHeight: 1, ...style }}
      viewBox="0 0 100 100"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{TITLE}</title>
      <path fill="#020203" d="m85 100h-70c-6.6 0-15-4-15-11v-78c0-6 6.1-11 13-11h72c6.4 0 14 5.2 14 11v78c0 6-7.3 11-14 11z"/>
  <path fill="#FFFFFF" d="m24.2 48h-7.2c-1.7 0-2.7-1.3-2.7-3v-5.7c0-1.6 1-4.7 2.7-4.7h6.8l16.6-16.1c0.7-0.5 1.2-0.7 1.9-0.8h9.7c2 0.1 4.2 0.7 4.2 3.3v6c0 1.7-0.6 3.3-2.7 3.4h-9.5l-17.4 16.9c-0.6 0.5-1.6 0.7-2.4 0.7z"/>
  <path fill="#FFFFFF" d="m53.7 81.3h-7.2c-1.7 0-3.4-1.1-3.4-2.8v-6.5c0-1.7 1.7-3.9 3.4-3.9h6.4l16.3-16.1c0.5-0.5 1.8-0.7 2.5-0.7h10.3c2.3 0 3.8 0.9 3.8 3.3v6.1c0 1.7-1.6 3.5-3.3 3.5h-9.9l-16.4 16.4c-0.6 0.4-1.8 0.7-2.5 0.7z"/>
  <path fill="#FFFFFF" d="m23.5 73.9h-6.5c-1.6 0-3.3-1.5-3.3-3.3v-6.6c0-1.8 1.5-4 3.3-4h6.7l17.9-17c0.5-0.5 1.4-0.7 2.1-0.7h9.6l16.6-16.7c0.5-0.4 1.4-0.7 2.1-0.7h10c2 0 3.8 1.1 3.8 3.5v5.4c0 1.9-1.2 4.5-3.3 5.2l-9.3-0.4-17.5 16.9c-0.5 0.5-1.3 0.5-2 0.5h-9.8l-17.4 17c-0.7 0.6-2.2 0.9-3 0.9z"/>
    </svg>
  );
});

export default Icon;
