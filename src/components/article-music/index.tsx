import React, { memo } from 'react';

import ArticleRContainer from "@/components/article-r-container"

export default memo(function ArticleMusic() {
  return (
    <div>
      <ArticleRContainer color="#a40011" title="音乐鉴赏" icon="iconfont icon-yinleyule">
        <iframe
          marginWidth={0}
          frameBorder={0}
          marginHeight={0}
          width="330"
          height="86"
          src="//music.163.com/outchain/player?type=2&id=167876&auto=1&height=66">
        </iframe>
      </ArticleRContainer>
    </div>
  );
});
