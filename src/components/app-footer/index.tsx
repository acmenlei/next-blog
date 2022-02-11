import React, { memo, useContext } from 'react';

import { AppFooterWrapper } from './style';
import { ThemeContext } from '@/common/context';

export default memo(function AppFooter() {
  const theme = useContext(ThemeContext)
  return (
    <AppFooterWrapper theme={theme}>
     本网站由react+node驱动&nbsp;&copy;搬运文章请注明出处;
    </AppFooterWrapper>
  );
});
