import { useRouter } from 'next/router';
import React, { memo, useContext } from 'react';
import routes from "@/router"
import Image from 'next/image';
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { Dropdown, Menu, Tooltip } from 'antd';

import {
  AppHeaderWrapper,
  AppHeaderLeftWrapper,
  AppHeaderCenterWrapper,
  AppHeaderRightWrapper
} from "./style"
import { ThemeContext } from '@/common/context';
import { getCurrentTheme } from '@/utils/theme';
import logo from "@/assets/svg/logo.svg"
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import { logOutAction } from '@/services/modules/login';
import { errorMessage, successMessage } from '@/common/message';
import { changeUserInfoAction } from '@/store/modules/login/actionCreators';

const THEME_TITLE_PRE = '单击/Ctrl+R'

const AppHeader = memo(function MyAppHeader(props: any) {
  // redux hooks
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: any) => {
    return {
      userInfo: state.getIn(["login", "userInfo"])
    }
  })
  // other hooks
  const theme = useContext(ThemeContext)
  const router = useRouter()

  const logout = async () => {
    const { code, msg }: any = await logOutAction({ ll_username: userInfo.ll_username })
    if (code === 200) {
      successMessage(msg)
      dispatch(changeUserInfoAction())
    } else {
      errorMessage(msg)
    }
  }
  // 根据登录状态决定渲染哪个组件
  const LoginOrAvatar = () => {
    if (!userInfo) {
      return (
        <div className='nav-item' onClick={() => router.replace('/login')}>
          <i className={`iconfont icon-denglu`}></i>
          <span>登录</span>
        </div>
      )
    }
    return (
      <>
        <Dropdown overlay={<Menu>
          <Menu.Item key={1} onClick={() => logout()}>
            退出登录
          </Menu.Item>
        </Menu>} placement="bottomCenter" arrow>
          <Avatar alt='头像' src={userInfo.ll_avatar} />
        </Dropdown>
        <span>{userInfo.ll_nick_name}</span>
      </>)
  }
  // render...
  return (
    <AppHeaderWrapper theme={getCurrentTheme(theme)}>
      <div className='container-wrap nav'>
        <AppHeaderLeftWrapper>
          <Image onClick={() => router.push("/")} width={50} height={50} src={logo} alt='网站logo'/>
          <span className='logo-desc'>CODERLEI</span>
        </AppHeaderLeftWrapper>
        <AppHeaderCenterWrapper>
          {
            routes.map((item, index) => {
              return (
                <div onClick={() => router.push(item.path)} key={index} className='nav-item'>
                  <i className={`iconfont ${item.icon}`}></i>
                  <span>{item.name}</span>
                </div>
              )
            })
          }
          <a href="https://github.com/Acmenlei" className='nav-item'>
            <i className={`iconfont icon-github-fill`}></i>
            <span>Github</span>
          </a>
          {
            <LoginOrAvatar />
          }
        </AppHeaderCenterWrapper>

        <AppHeaderRightWrapper>
          <SwitchTransition>
            <CSSTransition
              classNames="theme"
              key={theme === 'light' ? 'sunshine' : 'moon'}
              timeout={300} >
              <Tooltip placement="right" title={theme === 'light' ? `${THEME_TITLE_PRE}切换夜间模式` : `${THEME_TITLE_PRE}切换白天模式`}>
                <Image
                  alt='切换主题显示对应的图标'
                  onClick={props.changeTheme}
                  src={require(`@/assets/svg/${theme === 'light' ? 'sunshine' : 'moon'}.svg`)}
                  width={40}
                  height={40} />
              </Tooltip>
            </CSSTransition>
          </SwitchTransition>
        </AppHeaderRightWrapper>
      </div>
    </AppHeaderWrapper>
  );
});

export default AppHeader