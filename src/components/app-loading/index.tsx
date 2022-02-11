import { NextPage } from 'next';
import React, { memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { SwitchTransition, CSSTransition } from "react-transition-group"

import { AppLoadingWrapper } from "./style"

const AppLoading: NextPage = memo(function MyAppLoading() {
  // redux hook
  const { requestLoading } = useSelector((state: any) => {
    return {
      requestLoading: state.getIn(["home", "requestLoading"])
    }
  }, shallowEqual)
  return (
    <SwitchTransition>
      <CSSTransition
        timeout={300}
        classNames="loading"
        key={requestLoading ? 'block' : 'none'}>
        <div style={{ display: requestLoading ? 'block' : 'none' }}>
          <AppLoadingWrapper>
            <div className="load">
              <hr />
              <hr />
              <hr />
              <hr />
            </div>
          </AppLoadingWrapper>
        </div>
      </CSSTransition>
    </SwitchTransition>

  );
});

export default AppLoading