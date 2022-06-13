import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={343}
      height={2}
      viewBox="0 0 343 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M0 1h343" stroke="#EDEDED" />
    </Svg>
  );
}

export default SvgComponent;
