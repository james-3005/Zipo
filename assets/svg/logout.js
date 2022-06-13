import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { DARK_THEME, LIGHT_THEME } from '../../src/utilities/theme';

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
        d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
        stroke={props.theme ? LIGHT_THEME.STROKE_ICON : DARK_THEME.STROKE_ICON}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
