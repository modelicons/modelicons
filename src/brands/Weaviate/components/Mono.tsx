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
      viewBox="0 0 111.6 122.5"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{TITLE}</title>
      <path d="m54.8 60.5v-51.6c0-6.1-6.4-10.6-12.5-7.9l-36.2 20.5c-3.4 1.9-6.1 5.8-6.1 10.4v44.9c0 2.2 0 4.7 2.4 6.6 2.5 2.2 6.4 3.2 10.9 0.6l41.5-23.5z"/>
  
  <path d="m54.8 60.5-41.5 23.5c-4.3 2.4-9 1.2-11.4-1.6-1.3-1.5-1.9-3.1-1.9-4.6v4.2c0 5.3 2.8 11.7 8.5 15.4l32.7 21c7.2 4.7 16.7 5.2 24.4 0.7l2.7-1.7c-5.4 1.8-13.5-0.3-13.5-7.9v-49z"/>
  
  <path d="m80.7 45.6-25.9 14.8v32l30.5-19.5c6.3-4.1 14.8-6.5 26.3-3.2v-28.9c-5.4-1.4-17.8-2.5-30.9 4.8z"/>
  
  <path d="m85.3 72.9-30.5 19.5v17.1c0 7.6 8.1 10.2 12.8 7.9l22.2-16.3c5-4 13.7-5.5 21.8-1.2v-30.2c-8.6-2.3-18.2-2-26.3 3.2z"/>
    </svg>
  );
});

export default Icon;
