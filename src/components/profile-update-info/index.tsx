import { ThemeContext } from '@/common/context';
import { errorMessage, successMessage, warningMessage } from '@/common/message';
import { updateUserInfo } from '@/services/modules/login';
import { formatTimeFromNow } from '@/utils/format';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Image, Input, Space, Upload } from 'antd';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useContext, useState } from 'react';
import { ProfileUpdateInfoWrapper } from './style';

export default memo(function ProfileUpdateInfo(props: any) {
  const { userInfo, triggerStep } = props
  const { ll_id, ll_avatar, ll_username, ll_nick_name, ll_createdTime } = userInfo
  const [avatar, setAvatar] = useState(ll_avatar)
  const theme = useContext(ThemeContext)
  const router = useRouter()
  const onFinish = useCallback(async ({ ll_nick_name }) => {
    if (!ll_nick_name) {
      return warningMessage('昵称不能为空～')
    }
    const { code, msg }: any = await updateUserInfo({ ll_id, ll_nick_name, ll_avatar: avatar })
    if (code == 200) {
      successMessage(msg)
      router.reload()
    } else {
      errorMessage(msg)
    }
  }, [router, ll_id, ll_nick_name, avatar])

  const uploadHandler = useCallback((files) => {
    const file = files.file, chunkSize = 1024 * 1024; // 每次限制上传文件的大小为1MB

    async function upload(index: number) {
      const start = index * chunkSize;
      const [filename, ext] = file.name.split('.');

      // 进行切片
      if (start > file.size) {
        // 上传完毕了之后进行切片
        return merge(file.name);
      }
      // 切片为blob
      const blob = file.slice(start, start + chunkSize)
      const blobName = `${filename}.${index}.${ext}`;
      const blobFile = new File([blob], blobName);

      const form = new FormData();
      form.append("file", blobFile)

      try {
        await fetch(`http://localhost:9001/reception/fileUpload/upload`, { method: "POST", body: form })
        upload(++index);
      } catch (err) { }
    }

    async function merge(name: string) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json")
      try {
        const res = await fetch('http://localhost:9001/reception/fileUpload/merge', { method: "POST", body: JSON.stringify({ name }), headers })
        const restUrl = await res.json();
        setAvatar(restUrl.url)
      } catch (err) {
        errorMessage(String(err))
      }
    }
    upload(0)
  }, [])


  return (
    <ProfileUpdateInfoWrapper theme={theme}>
      <Image src={avatar} alt='修改用户信息_用户头像' />
      <Form onFinish={onFinish} className='form' labelCol={{ span: 6 }} labelAlign="left">
        <Form.Item label="更换头像" name="ll_new_avatar">
          <Upload customRequest={uploadHandler}>
            <Button icon={<UploadOutlined />}>更换新头像</Button>
          </Upload>
        </Form.Item>
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
