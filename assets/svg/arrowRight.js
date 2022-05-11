import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={8}
      height={25}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.713 7L1.702.99.288 2.404l4.6 4.6-4.6 4.593 1.414 1.414L7.713 7z"
        fill="#0F1828"
      />
    </Svg>
  );
}

export default SvgComponent;
