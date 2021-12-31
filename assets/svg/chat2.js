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
        d="M3.333 20.025c0-8.78 7.017-16.692 16.7-16.692 9.467 0 16.634 7.762 16.634 16.642 0 10.299-8.4 16.692-16.667 16.692-2.733 0-5.767-.735-8.2-2.17-.85-.518-1.567-.902-2.483-.601L5.95 34.897c-.85.267-1.617-.4-1.367-1.302L5.7 29.857c.183-.518.15-1.069-.117-1.503-1.433-2.637-2.25-5.525-2.25-8.329zm14.5 0c0 1.185.95 2.137 2.134 2.153a2.139 2.139 0 002.133-2.136c0-1.185-.95-2.137-2.133-2.137-1.167-.017-2.134.952-2.134 2.12zm7.684.017c0 1.168.95 2.136 2.133 2.136a2.139 2.139 0 002.133-2.136c0-1.185-.95-2.137-2.133-2.137a2.128 2.128 0 00-2.133 2.137zm-13.234 2.136a2.15 2.15 0 01-2.133-2.136c0-1.185.95-2.137 2.133-2.137 1.184 0 2.134.952 2.134 2.137 0 1.168-.95 2.12-2.134 2.136z"
        fill={props.theme ? LIGHT_THEME.STROKE_ICON : DARK_THEME.STROKE_ICON}
      />
    </Svg>
  );
}

export default SvgComponent;
