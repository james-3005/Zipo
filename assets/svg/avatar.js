import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

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
      <Rect width={49.0991} height={50} rx={24.5495} fill="#EDEDED" />
      <Path
        d="M20 21a5 5 0 1110 0 5 5 0 01-10 0zm5 3a3 3 0 100-6 3 3 0 000 6zM19.343 29.343A8 8 0 0017 35h2a6 6 0 1112 0h2a8 8 0 00-13.657-5.657z"
        fill="#0F1828"
      />
    </Svg>
  );
}

export default SvgComponent;
