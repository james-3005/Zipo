import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

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
        clipRule="evenodd"
        d="M14.701 26.067a43.546 43.546 0 01-7.527-5.86 14.988 14.988 0 01-3.583-5.713c-1.345-4.181.226-8.968 4.623-10.385a7.473 7.473 0 016.781 1.143 7.484 7.484 0 016.781-1.143c4.397 1.417 5.98 6.204 4.634 10.385a14.989 14.989 0 01-3.583 5.712 43.55 43.55 0 01-7.527 5.861l-.294.183-.305-.183z"
        stroke="#200E32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.674 8.816a3.477 3.477 0 012.396 3.028"
        stroke="#200E32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
