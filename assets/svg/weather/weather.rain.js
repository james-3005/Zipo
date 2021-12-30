import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
function SvgComponent(props) {
  return (
    <Svg
      width={300}
      height={300}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Rect width={300} height={300} rx={150} fill="url(#pattern0)" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_237_1130" transform="scale(.00024)" />
        </Pattern>
        <Image
          id="image0_237_1130"
          width={4096}
          height={4096}
        />
      </Defs>
    </Svg>
  );
}
export default SvgComponent;