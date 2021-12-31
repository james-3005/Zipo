import * as React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { LIGHT_THEME, DARK_THEME } from '../../src/utilities/theme';
function SvgComponent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M27.742 21.835l-.83 1.44a2.55 2.55 0 01-3.478.94v0a2.539 2.539 0 00-3.478.903c-.22.37-.337.79-.342 1.22v0a2.55 2.55 0 01-2.55 2.625H15.39a2.538 2.538 0 01-2.538-2.551v0a2.55 2.55 0 00-2.55-2.514c-.43.004-.852.122-1.221.341v0a2.55 2.55 0 01-3.479-.94l-.89-1.464a2.55 2.55 0 01.927-3.478v0a2.55 2.55 0 000-4.418v0a2.539 2.539 0 01-.928-3.466v0l.843-1.452a2.55 2.55 0 013.478-.989v0a2.526 2.526 0 003.466-.927c.22-.37.337-.791.342-1.22v0a2.55 2.55 0 012.55-2.552h1.672a2.55 2.55 0 012.551 2.539v0a2.54 2.54 0 002.55 2.55 2.6 2.6 0 001.221-.341v0a2.55 2.55 0 013.478.927v0l.88 1.465a2.539 2.539 0 01-.928 3.478v0a2.538 2.538 0 00-.928 3.479c.221.386.541.706.928.927v0a2.55 2.55 0 01.927 3.466v.012z"
        stroke={props.theme ? LIGHT_THEME.STROKE_ICON : DARK_THEME.STROKE_ICON}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Ellipse
        rx={3.51487}
        ry={3.51487}
        transform="matrix(1 0 0 -1 16.233 16.148)"
        stroke={props.theme ? LIGHT_THEME.STROKE_ICON : DARK_THEME.STROKE_ICON}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
