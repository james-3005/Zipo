import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.998 20h-2v-3h2v3zm5.364-2.222l-2.121-2.121 1.414-1.414 2.122 2.122-1.413 1.413h-.002zm-12.728 0l-1.415-1.414 2.12-2.122 1.415 1.414-2.12 2.121v.001zm6.364-2.771a5.007 5.007 0 11.004-10.014 5.007 5.007 0 01-.004 10.014zm0-8.014a3.007 3.007 0 10.004 6.014 3.007 3.007 0 00-.004-6.014zm10 4.007h-3V9h3v2zm-17 0h-3V9h3v2zm12.656-5.242l-1.413-1.415 2.121-2.122 1.415 1.415-2.122 2.121-.001.001zm-11.313 0l-2.12-2.121 1.415-1.414 2.12 2.122-1.414 1.412-.001.001zM11.998 3h-2V0h2v3z"
        fill="#0F1828"
      />
    </Svg>
  );
}

export default SvgComponent;
