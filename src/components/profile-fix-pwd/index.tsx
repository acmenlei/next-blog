import { ThemeContext } from '@/common/context';
import { errorMessage, successMessage, warningMessage } from '@/common/message';
import { updatePWD } from '@/services/modules/login';
import { Button, Form, Image, Input, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useContext } from 'react';
import { ProfileFixPWDWrapper } from './style';

export default memo(function ProfileFixPwd(props: any) {
  const { userInfo, triggerStep } = props
  const { ll_id, ll_avatar } = userInfo

  const theme = useContext(ThemeContext)
  const router = useRouter()

  const onFinish = useCallback(async ({ new_password, old_password }) => {
    if(!new_password || !old_password) {
      return warningMessage("请根据提示输入完整的信息～")
    }
    const { code, msg }: any = await updatePWD({ new_password, old_password, ll_id })
    if (code == 200) {
      successMessage("密码修改成功 请重新登录～")
      router.reload()
    } else {
      errorMessage(msg)
    }
  }, [router, ll_id])
  return (
    <ProfileFixPWDWrapper theme={theme}>
      <Image src={ll_avatar}  alt='修改密码_用户头像'/>
      <Form className='form' onFinish={onFinish}>
        <Form.Item name='old_password' label="旧密码">
          <Input placeholder='请输入旧密码' />
        </Form.Item>
        <Form.Item name='new_password' label="新密码">
          <Input placeholder='请输入新密码' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>确认</Button>
            <Button onClick={() => triggerStep(0)}>返回</Button>
          </Space>
        </Form.Item>
      </Form>

    </ProfileFixPWDWrapper>
  );
});
