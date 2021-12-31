import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { LIGHT_THEME, DARK_THEME } from '../../src/utilities/theme';
function SvgComponent(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.416 4.168c1.052 0 2.102.148 3.1.483 6.152 2 8.369 8.75 6.517 14.65a21.213 21.213 0 01-5.015 8.015 64.087 64.087 0 01-10.552 8.267l-.416.252-.434-.269A63.488 63.488 0 019.001 27.3a21.555 21.555 0 01-5.018-7.998c-1.883-5.9.333-12.65 6.552-14.685a7.53 7.53 0 011.481-.348h.2c.469-.069.934-.1 1.4-.1h.184c1.05.031 2.066.215 3.051.55h.099a.584.584 0 01.15.098 5.88 5.88 0 011.05.435l.633.283c.153.082.325.207.473.315.094.068.179.13.244.169l.082.048c.143.084.292.17.418.267a10.438 10.438 0 016.416-2.165zm4.434 12a1.37 1.37 0 001.316-1.268V14.7c.05-2.335-1.365-4.45-3.516-5.267-.684-.235-1.434.134-1.684.834-.233.7.134 1.466.834 1.715 1.068.4 1.783 1.451 1.783 2.617v.051c-.032.382.083.75.317 1.034.233.283.583.448.95.483z"
        fill={props.theme ? LIGHT_THEME.STROKE_ICON : DARK_THEME.STROKE_ICON}
      />
    </Svg>
  );
}

export default SvgComponent;
