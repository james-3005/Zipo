import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={41}
      height={17}
      viewBox="0 0 41 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.5.855c-7.365.018-14.396 1.6-17.965 5.168C.918 7.641.092 9.592.162 11.947c.053 1.319.422 2.655 1.266 3.498.58.598 1.406.932 2.426.756l6.486-1.107c.861-.159 1.512-.44 1.969-.88.562-.527.773-1.37.773-2.513l.035-1.775a.9.9 0 01.281-.668c.159-.194.405-.281.598-.334 1.125-.299 3.533-.615 6.504-.615 2.97 0 5.361.246 6.504.632.193.053.404.159.562.317a.773.773 0 01.264.615l.053 1.828c.035 1.143.264 1.969.808 2.514.457.457 1.108.72 1.987.879l6.293 1.072c1.072.193 1.95-.176 2.619-.826.773-.791 1.23-2.022 1.248-3.463.035-2.356-.861-4.29-2.444-5.854C34.827 2.455 27.866.838 20.5.855z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
