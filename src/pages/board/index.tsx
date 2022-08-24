import { Button, Pagination } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { NextPage } from 'next';
import React, { memo, useCallback, useContext, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { successMessage, warningMessage } from '@/common/message';
import { MessageBoardWrapper } from "@/styles/board"
import { delComment, publishComment, queryComments, replyComment } from '@/services/modules/comment';
import { ThemeContext } from '@/common/context';

import BoardComment from '@/components/board-comment';
import CommentEmojiCpn from '@/components/comment-emoji-cpn';
import { useKeyBoradEventHook } from '@/utils/hook';

const MessageBoard: NextPage = memo(function MyBoard(props: any) {
  // redux hooks
  const { userInfo } = useSelector((state: any) => {
    return {
      userInfo: state.getIn(["login", "userInfo"])
    }
  }, shallowEqual)
  const theme = useContext(ThemeContext)
  const [content, setContent] = useState("")
  const [pageNum, setPageNum] = useState(1)
  const [commentsList, setCommentsList] = useState(props.commentsList)
  const [total, setTotal] = useState(props.total)

  const resetCommentsList = useCallback(async (page) => {
    const { data, total }: any = await queryComments({ pageNum: page, pageSize: 10 })
    setTotal(total)
    setCommentsList(data)
  }, [])
  // 发表留言
  const publishMessage = useCallback(async () => {
    // 判断是否登录
    if (!userInfo) {
      // 未登录
      return warningMessage("先登录再来留言吧～")
    }
    if (!content) {
      return warningMessage("内容不能为空～")
    }
    // 1. dispatch request...
    const { ll_username, ll_nick_name, ll_avatar } = userInfo
    const { code, msg }: any = await publishComment({ ll_username, ll_avatar, ll_nick_name, ll_content: content })
    if (code == 200) {
      successMessage(msg)
      // 输入框置空
      setContent("")
    }
    // 本应该抽俩出去 但是redux-thunk 不起效 暂时先这么写
    resetCommentsList(pageNum)
  }, [userInfo, content, pageNum, resetCommentsList])

  // 自定义键盘hook 回车发送留言
  useKeyBoradEventHook("Enter", publishMessage)

  // 删除留言(level1/level2)（没登录的情况下不开放显示）如果是一级留言 那么它的子集都要被删除
  const removeComment = useCallback(async ({ id, level, username }) => {
    const { code, msg }: any = await delComment({
      ll_id: id,
      ll_level: level,
      ll_username: username
    })
    // console.log(code, "执行删除")
    if (code === 200) {
      successMessage(msg)
      resetCommentsList(pageNum)
    }
  }, [pageNum, resetCommentsList])
  // 回复留言
  const reply = useCallback(async (id, username, nickName, content) => {
    if (!userInfo) {
      warningMessage("你还没有登录 先去登录吧～")
      return
    }
    const { ll_nick_name, ll_avatar, ll_username } = userInfo
    const { code, msg }: any = await replyComment({
      ll_username,
      ll_p_username: username,
      ll_pid: id,
      ll_content: content,
      ll_nick_name,
      ll_avatar,
      ll_p_nick_name: nickName
    })
    if (code === 200) {
      // 重新拉取一下数据
      successMessage(msg)
      resetCommentsList(pageNum)
    }
  }, [userInfo, pageNum, resetCommentsList])
  // 分页
  const pageNumChange = useCallback((pageNum: number) => {
    setPageNum(pageNum)
    // 重新拉取一下数据
    resetCommentsList(pageNum)
  }, [resetCommentsList])
  // emoji选择
  const onEmojiClick = useCallback((event: any, emojiObject: any) => {
    setContent(content + emojiObject.emoji)
  },[content])

  return (
    <MessageBoardWrapper theme={theme}>
      <TextArea
              value={content}
              placeholder='你想对我说什么？'
              rows={5}
              showCount
              maxLength={200}
              onChange={e => setContent(e.target.value)} />
      {/* emoji选择 */}
      <div className="emoji-container">
        <CommentEmojiCpn onEmojiClick={onEmojiClick}/>
      </div>
      <Button className='mt-15 publish-btn' type="primary" onClick={publishMessage}>发表</Button>
      {/* 留言板内容 */}
      <BoardComment commentsList={commentsList} removeComment={removeComment} reply={reply} />
      {/* 分页 */}
      {
        total && <Pagination
          style={{ color: "#ccc" }}
          showTotal={(total) => `共${total}条`}
          pageSize={10}
          current={pageNum}
          onChange={pageNumChange}
          total={total} />
      }
    </MessageBoardWrapper>
  );
});

MessageBoard.getInitialProps = async () => {
  const commentsList: any = await queryComments({ pageNum: 1, pageSize: 10 })
  return {
    commentsList: commentsList.data,
    total: commentsList.total
  }
}

export default MessageBoard
