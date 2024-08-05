import React from 'react';
import {Svg, Defs, LinearGradient, Stop, Rect} from 'react-native-svg';

type GradientProps = {
  colorFrom: string;
  colorTo: string;
  id: string;

  borderRadius: number;
  height: number;
};

const Gradient: React.FC<GradientProps> = ({
  colorFrom,
  colorTo,
  id,

  borderRadius,
  height,
}) => {
  // Linear gradient values diagonally top-left to bottom-right:
  const x1 = '0';
  const y1 = '0';
  const x2 = '1';
  const y2 = '1';

  return (
    <Svg height={height} width="100%">
      <Defs>
        <LinearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
          <Stop offset="0" stopColor={colorFrom} stopOpacity="1" />
          <Stop offset="1" stopColor={colorTo} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#${id})`}
        stroke="none" // borderColor
        rx={borderRadius}
      />
    </Svg>
  );
};

export default Gradient;
