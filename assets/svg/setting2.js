import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

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
        d="M34.004 22.634c.596.316 1.056.816 1.38 1.316.63 1.034.578 2.3-.035 3.417l-1.192 2a3.55 3.55 0 01-3.015 1.733c-.596 0-1.26-.167-1.805-.5-.443-.283-.954-.383-1.5-.383-1.685 0-3.099 1.383-3.15 3.033 0 1.917-1.567 3.417-3.526 3.417h-2.316c-1.976 0-3.543-1.5-3.543-3.417-.034-1.65-1.448-3.033-3.134-3.033-.562 0-1.073.1-1.499.383-.545.333-1.226.5-1.805.5a3.556 3.556 0 01-3.032-1.733l-1.175-2c-.63-1.084-.665-2.384-.035-3.417.273-.5.784-1 1.363-1.316.477-.234.784-.617 1.073-1.067.852-1.433.34-3.317-1.107-4.167a3.407 3.407 0 01-1.26-4.716l1.14-1.967a3.54 3.54 0 014.804-1.267c1.482.8 3.406.267 4.275-1.15.273-.467.426-.967.392-1.467a2.975 2.975 0 01.477-1.766 3.658 3.658 0 013.015-1.734h2.401c1.26 0 2.402.7 3.032 1.734.307.5.511 1.117.46 1.766-.034.5.12 1 .392 1.467.868 1.417 2.793 1.95 4.292 1.15a3.52 3.52 0 014.786 1.267l1.141 1.966a3.379 3.379 0 01-1.26 4.717c-1.448.85-1.959 2.734-1.09 4.167.272.45.579.833 1.056 1.067zm-18.821-2.617c0 2.617 2.163 4.7 4.837 4.7s4.786-2.083 4.786-4.7S22.694 15.3 20.02 15.3c-2.674 0-4.837 2.1-4.837 4.717z"
        fill="#200E32"
      />
    </Svg>
  );
}

export default SvgComponent;
