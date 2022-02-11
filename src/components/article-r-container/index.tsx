import { ThemeContext } from '@/common/context';
import React, { memo, useContext } from 'react';
import { ArticleRightContainerWrapper } from "./style"

export default memo(function ArticleRightContainer(props: any) {
  const theme = useContext(ThemeContext)

  const { children, title, icon, color } = props
  return (
    <ArticleRightContainerWrapper color={color} theme={theme}>
      <div className="container-title">
        <div className='container-title-left'>
          <i className={icon}></i><p>{title}</p>
        </div>
        <span className='container-title-right'>more</span>
      </div>
      <div className='container-children'>
        {children}
      </div>
    </ArticleRightContainerWrapper>
  );
});
