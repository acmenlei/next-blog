import React, { memo } from 'react';

import { AppDarkBackGroundWrapper } from "./style"

export default memo(function AppDarkBackGround() {
  return (
    <AppDarkBackGroundWrapper>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </AppDarkBackGroundWrapper>
  );
});
