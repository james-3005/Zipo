import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={19}
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 5a5 5 0 1110 0A5 5 0 013 5zm5 3a3 3 0 100-6 3 3 0 000 6zM2.343 13.343A8 8 0 000 19h2a6 6 0 1112 0h2a8 8 0 00-13.657-5.657z"
        fill="#0F1828"
      />
    </Svg>
  );
}

export default SvgComponent;
