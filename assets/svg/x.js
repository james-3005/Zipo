import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { DARK_THEME, LIGHT_THEME } from '../../src/utilities/theme';

function SvgComponent(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.284 6.97l-12 12M6.284 6.97l12 12"
        stroke={DARK_THEME.STROKE_ICON}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
