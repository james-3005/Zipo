import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { LIGHT_THEME, DARK_THEME } from '../../src/utilities/theme';
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
        d="M8.288 12l6.01 6.01 1.414-1.414-4.6-4.6 4.6-4.6-1.414-1.406L8.288 12z"
        fill={props.theme ? LIGHT_THEME.STROKE_ICON : DARK_THEME.STROKE_ICON}
      />
    </Svg>
  );
}

export default SvgComponent;
