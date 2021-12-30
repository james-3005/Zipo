import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.784 3.333h14.45c5.65 0 9.433 3.967 9.433 9.867v13.617c0 5.883-3.783 9.85-9.433 9.85h-14.45c-5.65 0-9.45-3.967-9.45-9.85V13.2c0-5.9 3.8-9.867 9.45-9.867zM12.534 22c-1.1 0-2-.9-2-2s.9-1.998 2-1.998 2 .898 2 1.998-.9 2-2 2zM18 20c0 1.1.9 2 2 2s2-.9 2-2-.9-1.998-2-1.998S18 18.9 18 20zm7.467 0c0 1.1.9 2 2 2s1.983-.9 1.983-2a1.99 1.99 0 00-1.983-1.998c-1.1 0-2 .898-2 1.998z"
        fill="#200E32"
      />
    </Svg>
  );
}

export default SvgComponent;
