import { ThemeContext } from '@/common/context';
import { errorMessage, successMessage, warningMessage } from '@/common/message';
import { updateUserInfo } from '@/services/modules/login';
import { formatTimeFromNow } from '@/utils/format';
import { Button, Image, Input, Space } from 'antd';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useContext } from 'react';
import { ProfileUpdateInfoWrapper } from './style';

export default memo(function ProfileUpdateInfo(props: any) {
  const { userInfo, triggerStep } = props
  const { ll_id, ll_avatar, ll_username, ll_nick_name, ll_createdTime } = userInfo

  const theme = useContext(ThemeContext)
  const router = useRouter()
  const onFinish = useCallback(async ({ ll_nick_name }) => {
    if(!ll_nick_name) {
      return warningMessage('昵称不能为空～')
    }
    const { code, msg }: any = await updateUserInfo({ ll_id, ll_nick_name })
    if(code == 200) {
      successMessage(msg)
      router.reload()
    } else {
      errorMessage(msg)
    }
  }, [router, ll_id])

  return (
    <ProfileUpdateInfoWrapper theme={theme}>
      <Image src={ll_avatar}  alt='修改用户信息_用户头像'/>
      <Form onFinish={onFinish} className='form' labelCol={{ span: 6 }} labelAlign="left">
        <Form.Item label="用户名" name="ll_username">
          <Input disabled defaultValue={ll_username} />
        </Form.Item>
        <Form.Item label="昵称" name="ll_nick_name">
          <Input placeholder="请输入昵称" defaultValue={ll_nick_name} />
        </Form.Item>
        <Form.Item label="注册时间" name="ll_createdTime">
          <Input disabled defaultValue={formatTimeFromNow(ll_createdTime)} />
        </Form.Item>
        <Form.Item >
          <Space>
            <Button type='primary' htmlType="submit">修改</Button>
            <Button type='primary' onClick={() => triggerStep(0)}>返回</Button>
          </Space>
        </Form.Item>
      </Form>


    </ProfileUpdateInfoWrapper >
  );
});
