import React, { memo } from 'react';
import { Badge, Tag } from 'antd';

import { DEEP_COLORS } from '@/common/colors';
import { formatCategory } from '@/utils/format';

import ArticleRContainer from "@/components/article-r-container"

export default memo(function myArticleCategory(props: any) {
  const { categoryList, categoryCounts } = props
  return (
    <ArticleRContainer title="文章类别" icon="iconfont icon-fenlei" color="green">
      {
       categoryList && categoryList.map((item: any, index: number) => {
          return (
            <Badge
                key={index}
                className='mr-15'
                count={categoryCounts[index].count}>
              <Tag 
                className='m-5'
                onClick={() => props.searchArticle({ ll_category: item.ll_category })} 
                color={DEEP_COLORS[index]}>{formatCategory(item.ll_category)}</Tag>
            </Badge>
          )
        })
      }
    </ArticleRContainer>
  );
});

