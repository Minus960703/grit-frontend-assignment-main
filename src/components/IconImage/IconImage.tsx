
import React from 'react'
import ArrowLeft   from 'assets/arrow_left.png';
import ArrowRight from 'assets/arrow_right.png';
import ArrowDown from 'assets/arrow_down.png';

interface IconProps {
  icon: 'ARROWLEFT' | 'ARROWRIGHT' | 'ARROWDOWN';
}

interface IconImageProps extends IconProps {
  width       ?: number;
  height      ?: number;
}

const isDiscernIcon = ({ icon }: IconProps) => {
  switch (icon) {
    case 'ARROWLEFT':
      return ArrowLeft;
    case 'ARROWRIGHT':
      return ArrowRight;
    case 'ARROWDOWN':
      return ArrowDown;
    default:
      break;
  }
}

const IconImage = ({
  icon,
  width       = 24,
  height      = 24
}: IconImageProps) => {
  const Icon: any = isDiscernIcon({icon});
  return (
    <>
      <img src={Icon} alt="아이콘" width={width} height={height} />
    </>
  )
}

export { IconImage };