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
        d="M8.25 5A.75.75 0 019 4.25h9a.75.75 0 01.75.75v8.5a.75.75 0 01-1.5 0V5.75H9A.75.75 0 018.25 5zm-6.537.307a.75.75 0 01.817.163l13 13a.75.75 0 01-.53 1.28H2a.75.75 0 01-.75-.75V6a.75.75 0 01.463-.693zM2.75 7.811V18.25h10.44L2.75 7.81z"
        fill="#FFFF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.316 6.32a.75.75 0 01.434.68v10a.75.75 0 01-1.234.573l-4-3.375a.75.75 0 01-.266-.573v-3.25a.75.75 0 01.266-.573l4-3.375a.75.75 0 01.8-.107zm-3.566 4.403v2.553l2.5 2.11V8.614l-2.5 2.11zM1.47 1.47a.75.75 0 011.06 0l20 20a.75.75 0 11-1.06 1.06l-20-20a.75.75 0 010-1.06z"
        fill="#FFFF"
      />
    </Svg>
  );
}

export default SvgComponent;
