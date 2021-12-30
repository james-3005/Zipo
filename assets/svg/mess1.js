import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M20.418 3.438H9.582c-3.776 0-6.144 2.673-6.144 6.457v10.21c0 3.784 2.355 6.458 6.144 6.458h10.835c3.789 0 6.146-2.674 6.146-6.458V9.895c0-3.784-2.357-6.457-6.145-6.457z"
        stroke="#200E32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.401 16.497A1.498 1.498 0 017.904 15 1.5 1.5 0 019.4 13.503a1.5 1.5 0 011.498 1.498c0 .825-.672 1.496-1.498 1.496M15 16.497A1.498 1.498 0 0113.503 15 1.5 1.5 0 0115 13.503a1.5 1.5 0 011.498 1.498c0 .825-.672 1.496-1.498 1.496M20.599 16.497A1.498 1.498 0 0119.102 15a1.5 1.5 0 011.497-1.498 1.5 1.5 0 011.497 1.498c0 .825-.67 1.496-1.497 1.496"
        fill="#200E32"
      />
    </Svg>
  );
}

export default SvgComponent;
