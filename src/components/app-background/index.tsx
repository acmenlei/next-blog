import React, { memo, useContext } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group"

import { AppBackGroundWrapper } from "./style"

import AppDarkBackGround from '@/components/app-dark-bg'
import AppLightBackGround from '@/components/app-light-bg'
import { ThemeContext } from '@/common/context';

export default memo(function AppBackGround() {

  const theme = useContext(ThemeContext)

  return (
    <AppBackGroundWrapper>
      <SwitchTransition>
        <CSSTransition
          key={theme}
          timeout={200}
          classNames="theme-bg">
            {
              theme === 'dark' ? <AppDarkBackGround /> : <AppLightBackGround />
            }
        </CSSTransition>
      </SwitchTransition>
    </AppBackGroundWrapper>
  );
});
