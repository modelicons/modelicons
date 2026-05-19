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
      <polygon points="34.5 23.2 23.1 42.6 29.1 42.6 37.3 28.6 53.2 28.5 56.5 23.2"/>
  <polygon points="57.4 23.9 54.5 28.7 57.4 34.2 60.6 28.7"/>
  <polygon points="38.8 29.7 42.1 35.2 56.5 35.2 53.6 29.7"/>
  <polygon points="37.6 30.3 30.3 43.2 33.6 48.6 40.9 36"/>
  <polygon points="23.2 43.9 26.2 49.1 32.2 49.1 29.2 43.9"/>
  <polygon points="26.1 50.3 23.1 55.6 29.1 55.6 32.3 50.3"/>
  <polygon points="33.6 50.8 30.3 56.4 37.6 68.4 40.9 63"/>
  <polygon points="23.2 57 34.4 76.6 56.4 76.6 53.1 71 37.3 70.9"/>
  <polygon points="42.1 63.7 39 69.3 53.1 69.3 56.7 63.7"/>
  <polygon points="57.5 64.2 54.5 69.9 57.5 76 60.6 70.4"/>
  <polygon points="58.3 63.8 61.6 69.3 67.9 69.3 65 63.8"/>
  <polygon points="65.9 50.5 58.5 62.6 64.7 62.6 72.1 50.5"/>
  <polygon points="58.3 36.2 66 49.2 72.2 49.2 64.9 36.2"/>
  <polygon points="61.8 29.6 58.4 35 64.7 35 67.8 29.6"/>
  <polygon points="69.1 30.1 65.9 35.6 74 49.9 65.9 62.8 69.1 68.8 79.9 50"/>
    </svg>
  );
});

export default Icon;
