import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 11a1 1 0 011 1 8.001 8.001 0 01-6.999 7.938L13 21a1 1 0 11-2 0v-1.062A8.001 8.001 0 014 12a1 1 0 112 0 6 6 0 0012 0 1 1 0 011-1zm-7-9a4 4 0 014 4v6a4 4 0 01-8 0V6a4 4 0 014-4zm0 2a2 2 0 00-2 2v6a2 2 0 104 0V6a2 2 0 00-2-2z"
        fill="#FFFF"
      />
    </Svg>
  );
}

export default SvgComponent;
