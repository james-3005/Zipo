import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { LIGHT_THEME, DARK_THEME } from '../../src/utilities/theme';
function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.619 16.739c-.806 0-1.46-.655-1.46-1.461a1.461 1.461 0 012.92 0c0 .806-.654 1.46-1.46 1.46zm5.679 0c-.806 0-1.461-.655-1.461-1.461a1.461 1.461 0 012.921 0c0 .806-.654 1.46-1.46 1.46zm4.218-1.461a1.462 1.462 0 002.921 0 1.461 1.461 0 00-2.921 0z"
        fill={props.theme ? LIGHT_THEME.STROKE_ICON : DARK_THEME.STROKE_ICON}
      />
      <Path
        clipRule="evenodd"
        d="M15.025 2.5C7.762 2.5 2.5 8.433 2.5 15.019c0 2.103.612 4.267 1.688 6.245.2.327.224.739.087 1.128l-.838 2.805c-.187.676.388 1.175 1.026.975l2.524-.75c.688-.226 1.226.061 1.863.45 1.825 1.076 4.1 1.628 6.15 1.628 6.2 0 12.5-4.795 12.5-12.519C27.5 8.32 22.125 2.5 15.025 2.5z"
        stroke={props.theme ? LIGHT_THEME.STROKE_ICON : DARK_THEME.STROKE_ICON}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
