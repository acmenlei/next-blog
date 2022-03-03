import React, { memo, useContext, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group"

import { AppBackGroundWrapper } from "./style"
import { createLinearColors } from '@/utils/theme';

import AppDarkBackGround from '@/components/app-dark-bg'
import AppLightBackGround from '@/components/app-light-bg'
import { ThemeContext } from '@/common/context';

export default memo(function AppBackGround() {

  const theme = useContext(ThemeContext)
  useEffect(() => {
    createLinearColors()
  }, [])
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
