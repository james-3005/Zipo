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
        d="M7.75 5.5a4.25 4.25 0 018.5 0V12a4.25 4.25 0 01-8.5 0V5.5zM12 2.75A2.75 2.75 0 009.25 5.5V12a2.75 2.75 0 105.5 0V5.5A2.75 2.75 0 0012 2.75zM19.5 10.75a.75.75 0 01.75.75 8.224 8.224 0 01-.687 3.3.75.75 0 11-1.374-.6c.36-.826.561-1.739.561-2.7a.75.75 0 01.75-.75z"
        fill="#FFFF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 10.75a.75.75 0 01.75.75 6.75 6.75 0 009 6.366.75.75 0 01.5 1.414 8.25 8.25 0 01-11-7.78.75.75 0 01.75-.75z"
        fill="#FFFF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 18.25a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM2.47 2.47a.75.75 0 011.06 0l18 18a.75.75 0 11-1.06 1.06l-18-18a.75.75 0 010-1.06z"
        fill="#FFFF"
      />
    </Svg>
  );
}

export default SvgComponent;
