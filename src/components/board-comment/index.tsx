import { Comment, Empty, Image, Modal, Tooltip } from 'antd';
import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { formatTime, formatTimeFromNow } from '@/utils/format';
import { CommentWrapper } from './style';
import TextArea from 'antd/lib/input/TextArea';
import { ThemeContext } from '@/common/context';
import { getCurrentNickNameColor } from '@/utils/theme';
import { useSelector } from 'react-redux';

export default memo(function BoardComment(props: any) {
  // redux hook
  const { userInfo } = useSelector((state: any) => {
    return {
      userInfo: state.getIn(["login", "userInfo"])
    }
  })
  const { commentsList } = props
  const [modal, contextHolder] = Modal.useModal();
  const [replyContent, setReplyContent] = useState((""))
  const [pId, setPid] = useState(-1)
  const [pUsername, setPusername] = useState("")
  const [nickName, setNickName] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false);

  const theme = useContext(ThemeContext)
  // 删除modal
  const isRemoveComment = useCallback((cb) => {
    modal.confirm({
      title: "提示",
      content: (<span>确定要删除该留言吗？</span>),
      cancelText: "取消",
      okText: "确认",
      onOk: cb
    })
  }, [modal])
  // 回复modal
  const isReplyComment = useCallback((nickname, pid, pUsername) => {
    setReplyContent("@" + nickname + "：")
    setPusername(pUsername)
    setNickName(nickname)
    setPid(pid)
    setIsModalVisible(true)
  }, [])
  // 回复逻辑
  const replyComment = useCallback(() => {
    // 切割正确的内容
    props.reply(pId, pUsername, nickName, replyContent.slice(replyContent.indexOf("：") + 1))
    // 重置内容
    setReplyContent(replyContent.slice(0, replyContent.indexOf("：") + 1))
  }, [props, replyContent, pId, pUsername, nickName])
  // 取消回复
  const cancelReply = useCallback(() => {
    setPusername("")
    setNickName("")
    setPid(-1)
    setReplyContent("")
    setIsModalVisible(false)
  }, [])
  // action操作的JSX内容
  const ActionJSX = ({ ll_id, ll_level, ll_username, ll_nick_name }: any) => {
    return [
      // 只有评论者自己才能删除评论 当然还有站长
      userInfo && userInfo.ll_username == ll_username &&
      <span
        key={1}
        style={{ color: getCurrentNickNameColor(theme) }}
        onClick={() => isRemoveComment(() => props.removeComment({
          id: ll_id,
          level: ll_level,
          username: ll_username
        }))}>删除</span>,
      <span
        key={2}
        style={{ color: getCurrentNickNameColor(theme) }}
        onClick={() => isReplyComment(ll_nick_name, ll_id, ll_username)}>回复</span>
    ]
  }
  // 获取字体颜色
  const borderColor = useMemo(() => {
    let pre = '1px solid '
    return pre += theme == 'light' ? '#eee' : '#444'
  }, [theme])

  return (
    <>
      {
        (commentsList && commentsList.length) ? <CommentWrapper>
          <TransitionGroup>
            {
              commentsList && commentsList.map((item: any) => {
                const { children, ll_level, ll_nick_name, ll_username, ll_avatar, ll_createdTime, ll_content, ll_id } = item
                // 必须添加唯一的key 因为在删除item的时候需要对item做移除动画
                return (
                  <CSSTransition
                    timeout={300}
                    unmountOnExit
                    classNames="comment-item"
                    key={ll_id}>
                    <Comment
                      style={{ borderBottom: borderColor }}
                      key={ll_id}
                      actions={ActionJSX({ ll_id, ll_level, ll_nick_name, ll_username })}
                      author={<a href='#!' style={{color: getCurrentNickNameColor(theme)}}>{ll_nick_name}</a>}
                      avatar={<Image src={ll_avatar} alt='评论留言_用户头像'/>}
                      content={ll_content}
                      datetime={
                        <Tooltip
                          placement="top"
                          title={formatTime(ll_createdTime)}>
                          {formatTimeFromNow(ll_createdTime)}
                        </Tooltip>}>
                      {
                        children && children.map((citem: any) => {
                          return (

                            <Comment
                              key={citem.ll_id}
                              actions={ActionJSX({ ll_id, ll_level: citem.ll_level, ll_nick_name: citem.ll_nick_name, ll_username })}
                              author={<a href='#!' style={{color: getCurrentNickNameColor(theme)}}>{citem.ll_nick_name}</a>}
                              avatar={<Image src={citem.ll_avatar} alt='回复留言_用户头像'/>}
                              // 二级留言内容 前缀@
                              content={
                                <>
                                  <span style={{color: '#00a8ff'}}>
                                    @{citem.ll_p_nick_name}：
                                  </span>
                                  {citem.ll_content}
                                </>}
                              datetime={
                                <Tooltip
                                  placement="top"
                                  title={formatTime(citem.ll_createdTime)}>
                                  {formatTimeFromNow(citem.ll_createdTime)}
                                </Tooltip>} />
                          )
                        })
                      }
                    </Comment>
                  </CSSTransition>
                )

              })
            }
          </TransitionGroup>
          {contextHolder}
          <Modal
            title="回复输入框"
            visible={isModalVisible}
            cancelText="取消"
            okText="回复"
            onCancel={cancelReply}
            onOk={replyComment}>
            <TextArea
              value={replyContent}
              rows={5}
              showCount
              maxLength={200}
              onChange={e => setReplyContent(e.target.value)} />
          </Modal>
        </CommentWrapper>
          :
          <Empty description="这里竟然一条内容都没有～" style={{ color: "#ccc" }} />
      }
    </>
  );
});
