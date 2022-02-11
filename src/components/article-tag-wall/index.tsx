import React, { memo } from 'react';
import { Tag } from 'antd';

import { ArticleTagWrapper } from "./style"
import { DEEP_COLORS } from '@/common/colors';

import ArticleRContainer from '../article-r-container';

export default memo(function ArticleTagWall(props: any) {
  const { tagList, searchArticle } = props
  return (
    <ArticleRContainer title="标签墙" icon="iconfont icon-jieshao" color="orange">
      <ArticleTagWrapper >
        {
         tagList && tagList.map((item: any, index: number) => {
            return (
              <Tag
                onClick={() => searchArticle({ keyword: item.ll_tag_name })}
                className='m-5'
                key={item.ll_id}
                color={DEEP_COLORS[index % 12]}>{item.ll_tag_name}</Tag>
            )
          })
        }
      </ArticleTagWrapper>
    </ArticleRContainer>

  );
});
