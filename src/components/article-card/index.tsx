import { Image, Tag } from 'antd';
import React, { memo, useContext } from 'react';
import { FormOutlined, TableOutlined, TagOutlined } from '@ant-design/icons';

import { COLORS } from '@/common/colors';
import { ThemeContext } from '@/common/context';
import { formatCategory, formatTime } from '@/utils/format';
import { ArticleCardWrapper } from "./style"

export default memo(function ArticleCard(props: any) {
  const theme = useContext(ThemeContext)
  const {
    ll_title,
    ll_introduce,
    ll_category,
    ll_tags,
    ll_createdTime,
    ll_cover } = props

  return (
    <ArticleCardWrapper theme={theme}>
      <div className="card-item-left">
        <Image preview={false} src={ll_cover} height={300} width={400} alt='文章列表_文章封面' />
      </div>
      <div className="card-item-right">
        <h3 className='text-two-line'>{ll_title}</h3>
        <p className='card-item-introduce'>{ll_introduce}</p>
        <p><strong><FormOutlined />&nbsp;&nbsp;发布时间：</strong>{formatTime(ll_createdTime)}</p>
        <p className='card-item-tags'>
          <strong><TagOutlined />&nbsp;&nbsp;标签：</strong>
          {
            ll_tags.split(",").map((item: any, index: number) => {
              return <Tag key={index} color={COLORS[index]}>{item}</Tag>
            })
          }
        </p>
        <p>
          <strong><TableOutlined />&nbsp;&nbsp;文章类别：</strong>
          <Tag color="#2db7f5">{formatCategory(ll_category)}</Tag>
        </p>
      </div>
      {/* 三个彩球 */}
      <div className='three-colors-ball'>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </ArticleCardWrapper>
  );
});
