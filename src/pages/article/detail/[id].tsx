import { NextPage } from 'next';
import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { Affix, Button } from "antd"
import "highlight.js/styles/github-dark.css"
import MarkdownNavbar from 'markdown-navbar';

import {
  ArticleDescWrapper,
  ArticleDetailWrapper,
  ArticleDetailContent,
  ArticleDetailOutLine
} from "@/styles/detail"
import { fetchArticleById } from '@/services/modules/article';
import { articleCommentPublish, articleCommentReply, deleteArticleCommentById, fetchAllArticleCommentList } from "@/services/modules/articleComment"
import { ThemeContext } from '@/common/context';
import { formatTime } from '@/utils/format';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector } from 'react-redux';
import { successMessage, warningMessage } from '@/common/message';
import { useRouter } from 'next/router';

import BoardComment from '@/components/board-comment';
import CommentEmojiCpn from '@/components/comment-emoji-cpn';

const ArticleDetail: NextPage = memo(function MyArticleDetail(props: any) {
  // redux hook
  const { userInfo } = useSelector((state: any) => {
    return {
      userInfo: state.getIn(["login", "userInfo"])
    }
  })
  const { articleDetail } = props
  console.log(articleDetail.ll_content_html)
  const [articleComments, setArticleComments] = useState(props.articleComments)
  const [total, setTotal] = useState(props.total)
  const [content, setContent] = useState("")

  const theme = useContext(ThemeContext)
  const router = useRouter()
  const articleId = useMemo(() => router.query.id, [router])

  // 请求所有文章评论数据
  const resetArticleCommentList = useCallback(async () => {
    const { data, total }: any = await fetchAllArticleCommentList({ ll_id: articleId })
    setArticleComments(data)
    setTotal(total)
  }, [articleId])
  // 发表文章评论逻辑
  const publishArticleComment = useCallback(async () => {
    if (!userInfo) {
      return warningMessage("请先登录再来评论～")
    }
    if (!content) {
      return warningMessage("评论内容不能为空～")
    }
    const { ll_username, ll_nick_name, ll_avatar } = userInfo
    // 提交
    const { code, msg }: any = await articleCommentPublish({
      ll_username,
      ll_avatar,
      ll_nick_name,
      ll_content: content,
      ll_article_id: articleId
    })
    if (code == 200) {
      successMessage(msg)
      // 请求数据 设置给state
      resetArticleCommentList()
    }
    setContent("")
  }, [userInfo, content, articleId, resetArticleCommentList])
  // 删除文章评论逻辑
  const removeComment = useCallback(async ({ id, level, username }) => {
    const { code, msg }: any = await deleteArticleCommentById({
      ll_id: id,
      ll_level: level,
      ll_username: username,
      ll_article_id: articleId
    })
    if (code === 200) {
      successMessage(msg)
      resetArticleCommentList()
    }
  }, [articleId, resetArticleCommentList])
  // 回复文章评论逻辑
  const reply = useCallback(async (id, username, nickName, content) => {
    if (!userInfo) {
      return warningMessage("你还没有登录 先去登录吧～")
    }
    const { ll_nick_name, ll_avatar, ll_username } = userInfo
    const { code, msg }: any = await articleCommentReply({
      ll_username,
      ll_p_username: username,
      ll_pid: id,
      ll_content: content,
      ll_nick_name,
      ll_avatar,
      ll_p_nick_name: nickName,
      ll_article_id: articleId
    })
    if (code == 200) {
      successMessage(msg)
      resetArticleCommentList()
    }
  }, [userInfo, articleId, resetArticleCommentList])
  // emoji选择
  const onEmojiClick = useCallback((event: any, emojiObject: any) => {
    setContent(content + emojiObject.emoji)
  },[content])

  return (
    <>
      <ArticleDescWrapper theme={theme}>
        <h2>{articleDetail.ll_title}</h2>
        <p>最后编辑时间：{formatTime(articleDetail.ll_updatedTime)}</p>
      </ArticleDescWrapper>
      <ArticleDetailWrapper theme={theme}>
        <div className='article-container'>
          <ArticleDetailContent dangerouslySetInnerHTML={{__html: articleDetail.ll_content_html}}  theme={theme} />
          <div className='content-container'>
            <p>共&nbsp;{total}&nbsp;条评论</p>
            <TextArea
                    value={content}
                    placeholder='你想对我说什么？'
                    rows={5}
                    showCount
                    maxLength={200}
                    onChange={e => setContent(e.target.value)} />
            {/* emoji选择 */}
            <div className="emoji-container">
              <CommentEmojiCpn onEmojiClick={onEmojiClick} />
            </div>
            <Button className='mt-15 publish-btn' type="primary" onClick={publishArticleComment}>发表</Button>
            <BoardComment removeComment={removeComment} reply={reply} commentsList={articleComments} />
          </div>
        </div>
        <Affix offsetTop={55}>
          <ArticleDetailOutLine theme={theme}>
            <MarkdownNavbar ordered={false} headingTopOffset={0} source={articleDetail.ll_content} />
          </ArticleDetailOutLine>
        </Affix>
      </ArticleDetailWrapper>
    </>
  );
});
// 获取初始化
ArticleDetail.getInitialProps = async (ctx) => {
  const articleDetail: any = await fetchArticleById({ ll_id: ctx.query.id })
  const articleComments: any = await fetchAllArticleCommentList({ ll_id: ctx.query.id })
  return {
    articleDetail: articleDetail.data,
    articleComments: articleComments.data,
    total: articleComments.total
  }
}

export default ArticleDetail