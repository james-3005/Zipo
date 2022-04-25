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
        d="M1.25 5A.75.75 0 012 4.25h16a.75.75 0 01.75.75v14a.75.75 0 01-.75.75H2a.75.75 0 01-.75-.75V5zm1.5.75v12.5h14.5V5.75H2.75z"
        fill="#FFFF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.316 6.32a.75.75 0 01.434.68v10a.75.75 0 01-1.234.573l-4-3.375a.75.75 0 01-.266-.573v-3.25a.75.75 0 01.266-.573l4-3.375a.75.75 0 01.8-.107zm-3.566 4.403v2.553l2.5 2.11V8.614l-2.5 2.11zM7.924 9.02a.75.75 0 011.056-.096l3 2.5a.75.75 0 010 1.152l-3 2.5a.75.75 0 11-.96-1.152L10.329 12l-2.31-1.924a.75.75 0 01-.095-1.056z"
        fill="#FFFF"
      />
    </Svg>
  );
}

export default SvgComponent;
