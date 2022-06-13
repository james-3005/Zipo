import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.032 27.898a2.436 2.436 0 01-2.435-2.435 2.435 2.435 0 014.87 0 2.436 2.436 0 01-2.435 2.435zm9.464 0a2.436 2.436 0 01-2.434-2.435 2.435 2.435 0 014.869 0 2.436 2.436 0 01-2.435 2.435zm7.03-2.435a2.436 2.436 0 002.434 2.435 2.436 2.436 0 002.435-2.435 2.435 2.435 0 00-4.869 0z"
        fill="#200E32"
      />
      <Path
        clipRule="evenodd"
        d="M25.042 4.167c-12.105 0-20.875 9.887-20.875 20.864 0 3.506 1.02 7.113 2.812 10.41.334.544.375 1.23.146 1.88l-1.396 4.673c-.312 1.127.646 1.96 1.709 1.626l4.208-1.25c1.146-.376 2.041.102 3.104.751 3.042 1.792 6.833 2.712 10.25 2.712 10.333 0 20.833-7.99 20.833-20.864 0-11.102-8.958-20.802-20.791-20.802z"
        stroke="#200E32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
