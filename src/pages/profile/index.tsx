import { Empty } from 'antd';
import { NextPage } from 'next';
import React, { memo, useCallback, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { CSSTransition, SwitchTransition } from "react-transition-group"

import { ProfileWrapper } from "@/styles/profile"

import ProfileInfo from '@/components/profile-info';
import ProfileUpdateInfo from '@/components/profile-update-info';
import ProfileFixPwd from '@/components/profile-fix-pwd';

const Profile: NextPage = memo(function MyProfile(props: any) {
  // 0 = 信息展示 1 = 修改信息 2 = 修改密码
  const [step, setStep] = useState(0);
  const { userInfo } = useSelector((state: any) => {
    return {
      userInfo: state.getIn(["login", 'userInfo'])
    }
  }, shallowEqual)

  const triggerStep = useCallback((idx: number) => {
    setStep(idx)
  }, [])
  const getCurerntShowComponent = useCallback((idx: number) => {
    return [
      <ProfileInfo key={1} userInfo={userInfo} triggerStep={triggerStep} />,
      <ProfileUpdateInfo key={2} userInfo={userInfo} triggerStep={triggerStep} />,
      <ProfileFixPwd key={3} userInfo={userInfo} triggerStep={triggerStep} />,
    ][idx]
  }, [userInfo, triggerStep])

  return (
    <ProfileWrapper>
      {
        userInfo ?
          <SwitchTransition>
            <CSSTransition classNames="userInfo" timeout={200} key={step}>
              {getCurerntShowComponent(step)}
            </CSSTransition>
          </SwitchTransition>
          : <Empty style={{color: "#999"}} description="未找到对应内容 你好像还没登录？请先去登录～"/>
      }
    </ProfileWrapper>
  );
});

export default Profile
