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
        d="M15.713 12L9.702 5.99 8.288 7.404l4.6 4.6-4.6 4.593 1.414 1.414L15.713 12z"
        fill={props.theme ? DARK_THEME.THEME : LIGHT_THEME.THEME}
      />
    </Svg>
  );
}

export default SvgComponent;
