import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18 16H2a2 2 0 01-2-2V1.913A2 2 0 012 0h16a2 2 0 012 2v12a2 2 0 01-2 2zM2 3.868V14h16V3.868L10 9.2 2 3.868zM2.8 2L10 6.8 17.2 2H2.8z"
        fill="#0F1828"
      />
    </Svg>
  );
}

export default SvgComponent;
