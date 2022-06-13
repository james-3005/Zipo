import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { LIGHT_THEME, DARK_THEME } from '../../src/utilities/theme';

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9 2.19l7 3.11V10c0 4.52-2.98 8.69-7 9.93-4.02-1.24-7-5.41-7-9.93V5.3l7-3.11zM9 0L0 4v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V4L9 0zM8 6h2v2H8V6zm0 4h2v6H8v-6z"
        fill={props.theme ? DARK_THEME.THEME : LIGHT_THEME.THEME}
      />
    </Svg>
  );
}

export default SvgComponent;
