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
        d="M21 18H3v-2h18v2zm0-5H3v-2h18v2zm0-5H3V6h18v2z"
        fill={props.theme ? '#0F1828' : '#ADB5BD'}
      />
    </Svg>
  );
}

export default SvgComponent;
