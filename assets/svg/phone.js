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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.555 9.832A1 1 0 0010 9V5a3 3 0 00-3-3H3a1 1 0 00-1 1c0 9.941 9.059 19 19 19a1 1 0 001-1v-4a3 3 0 00-3-3h-4a1 1 0 00-.832.445l-1.905 2.858A18.888 18.888 0 016.97 12.15l-.274-.412 2.858-1.905zM15.535 16H19a1 1 0 011 1v2.965c-1.937-.134-3.828-.652-5.591-1.473l-.405-.195L15.535 16zM4.035 4H7a1 1 0 011 1v3.465l-2.297 1.53C4.77 8.119 4.18 6.087 4.035 4z"
        fill={props.white ? '#FFFF' : props.theme ? '#0F1828' : '#ADB5BD'}
      />
    </Svg>
  );
}

export default SvgComponent;
