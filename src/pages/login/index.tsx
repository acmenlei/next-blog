import React, { memo, useCallback, useState } from 'react';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { useRouter } from 'next/router';
import Image from 'next/image';

import { 
  OutContainerWrapper, 
  ContainerWrapper, 
  LoginWrapper, 
  RegisterWrapper } from "@/styles/login";
import { userLoginVerify, userRegister } from '@/services/modules/login';
import { userLoginAction } from '@/store/modules/login/actionCreators';
import { errorMessage, successMessage, warningMessage } from '@/common/message';
import ContainerTrigger from "@/components/login-ctn-trigger"

const Login: NextPage = memo(function MyLogin() {
  // redux hooks
  const dispatch = useDispatch()
  // other hooks
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const triggerContaienr = useCallback(() => {
    setIsLogin(!isLogin)
  }, [isLogin])
  // 登录逻辑
  const onFinishLogin = useCallback(({ username, password }) => {
    // redux-thunk 莫名不起效果 暂时这么写。
    userLoginVerify({ ll_username: username, ll_password: password })
      .then(({ data, code, msg }: any) => {
        if (code != 200) {
          warningMessage(msg)
        } else {
          dispatch(userLoginAction(data))
          successMessage(msg)
          router.reload()
        }
      })
  }, [dispatch, router])
  // 注册框逻辑
  const onFinishRegister = useCallback(({ username, password }) => {
    userRegister({ ll_username: username, ll_password: password })
      .then(({ code, msg }: any) => {
        if (code === 200) {
          successMessage(msg);
        } else if (code == -96) {
          warningMessage(msg);
        } else {
          errorMessage(msg);
        }
      })
  }, [])

  return (
    <OutContainerWrapper>
      <ContainerWrapper >
        <SwitchTransition>
          <CSSTransition classNames="login" timeout={300} key={isLogin}>
            {isLogin ?
              <LoginWrapper>
                <Image
                  alt='登录界面_风景图'
                  width={400}
                  height={300}
                  className='container-top'
                  src={require("../../assets/img/loginlight.jpg")} />
                <ContainerTrigger triggerContaienr={triggerContaienr} title="登录" onFinish={onFinishLogin} />
              </LoginWrapper> :
              <RegisterWrapper>
                <Image
                  alt='注册界面_风景图'
                  className='container-top'
                  width={400}
                  height={300}
                  src={require("../../assets/img/logindark.jpg")} />
                <ContainerTrigger triggerContaienr={triggerContaienr} title="注册帐户" onFinish={onFinishRegister} />
              </RegisterWrapper>
            }
          </CSSTransition>
        </SwitchTransition>
      </ContainerWrapper>
    </OutContainerWrapper>
  );
});

export default Login