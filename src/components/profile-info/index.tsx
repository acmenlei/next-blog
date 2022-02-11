import { ThemeContext } from '@/common/context';
import { formatTimeFromNow } from '@/utils/format';
import { Button, Image, Space } from 'antd';
import React, { memo, useContext } from 'react';
import { ProfileInfoWrapper } from './style';

export default memo(function ProfileInfo(props: any) {
  const theme = useContext(ThemeContext)

  const { userInfo, triggerStep } = props
  const { ll_id, ll_avatar, ll_username, ll_nick_name, ll_createdTime, ll_updatedTime} = userInfo
  return (
    <ProfileInfoWrapper theme={theme}>
      <div className="avatar">
        <Image src={ll_avatar}  alt='修改信息_用户头像'/>
      </div>
      <div className="user-id line">
        <label>用户ID：</label> {ll_id}
      </div>
      <div className="nickname line">
        <label>用户名：</label> {ll_username}
      </div>
      <div className="username line">
        <label>昵称：</label> {ll_nick_name}
      </div>
      <div className="createTime line">
        <label>注册时间：</label> {formatTimeFromNow(ll_createdTime)}
      </div>
      <div className="updateTime line">
        <label>上次修改：</label> {formatTimeFromNow(ll_updatedTime)}
      </div>
      <div className="operator">
        <Space>
          <Button onClick={() => triggerStep(1)} type='primary'>修改信息</Button>
          <Button onClick={() => triggerStep(2)}>修改密码</Button>
        </Space>
      </div>
    </ProfileInfoWrapper>
  );
});
