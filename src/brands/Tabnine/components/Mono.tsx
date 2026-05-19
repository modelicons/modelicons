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
      <path d="m91.8 24-40.4-22.2c-0.7-0.4-1.7-0.4-2.4 0l-41.1 22.1c-0.8 0.5-1.4 1.3-1.4 2.3l-0.1 45.9c0 1 0.6 1.8 1.4 2.3l40.7 22.6c0.4 0.2 0.8 0.4 1.3 0.4s0.9-0.1 1.3-0.3l40.6-22.3c0.8-0.4 1.5-1.2 1.5-2.2l0.1-46.3c0-0.9-0.6-1.9-1.5-2.3zm-4.1 20.5-52.3-29.2 14.4-7.9 37.9 20.7v16.4zm-55.4-24.3 52.2 29.1-52.1 29.3-0.2-58.4zm-20.1 7.9 14.2-7.9 0.2 58.4-14.3-8.2-0.1-42.3zm37.6 63.2-14.3-8 52.1-29.1v16.1l-37.8 21z"/>
    </svg>
  );
});

export default Icon;
