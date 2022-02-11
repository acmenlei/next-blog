import { Button, Form, Input } from 'antd';
import React, { memo, useContext } from 'react';
import { LockOutlined, UserOutlined } from "@ant-design/icons"

import { ContainerTriggerWrapper } from "./style"

export default memo(function ContainerTrigger(props: any) {
  const { onFinish, title, triggerContaienr } = props

  return (
    <ContainerTriggerWrapper >
      <Form
        className='form-table'
        size="large"
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '用户名不为能空!' }]}
        >
          <Input prefix={<UserOutlined className='input-icon' />} placeholder='请输入账号' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '密码不能为空!' }]}
        >
          <Input.Password prefix={<LockOutlined className='input-icon' />} placeholder='请输入密码' />
        </Form.Item>

        <Form.Item >
          <Button type='primary' htmlType="submit">
            {title}
          </Button>
        </Form.Item>
        <Form.Item >
          <Button onClick={triggerContaienr} type='ghost'>
            { title == '登录' ? '注册帐户' :'现在去登录' }
          </Button>
        </Form.Item>
      </Form>
    </ContainerTriggerWrapper>
  );
});
