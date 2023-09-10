import { type FC } from 'react';

interface SliderCustomProps {}

const SliderCustom: FC<SliderCustomProps> = ({}) => {
  return <input type='range' min='0' max='10' />;
};

export default SliderCustom;
