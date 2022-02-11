import { Image } from 'antd';
import React, { memo } from 'react';

export default memo(function NOT_FOUNT() {
  return (
    <Image src={require("@/assets/svg/404.svg")}/>
  );
});
