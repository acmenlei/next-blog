import React, { memo, useContext } from 'react';

import ArticleRContainer from '../article-r-container';
import { formatTime } from '@/utils/format';
import { ArticleRecentWrapper } from "./style"
import Link from 'next/link';
import { ThemeContext } from '@/common/context';

export default memo(function ArticleRecent(props: any) {
  const theme = useContext(ThemeContext)

  const { recentList } = props
  return (
    <ArticleRContainer title="最近文章" icon="iconfont icon-zuijinlaifang" color="yellow">
      <ArticleRecentWrapper color="purple" theme={theme}>
        {
         recentList && recentList.map((item: any) => {
            return (
              <Link key={item.ll_id} href={`/article/detail/${item.ll_id}`} passHref>
                <li>
                  <span className='article-title text-one-line'>{item.ll_title}</span>
                  <span className='article-publish-time'>{formatTime(item.ll_updatedTime)}</span>
                </li>
              </Link>
            )
          })
        }
      </ArticleRecentWrapper>
    </ArticleRContainer>
  );
});
