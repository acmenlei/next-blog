import { getCurrentFontColor } from '@/utils/theme'
import styled from 'styled-components'

export const ArticleProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${(props: any) => getCurrentFontColor(props.theme)};
  margin-left: 10px;
  
    .ant-image-mask {
      border-radius: 50%;
    }
  .avatar {
    display: flex;
    margin: 10px 0;

    .self-desc {
      flex: 1;
      padding: 0 10px;
      align-self: flex-end;
    }
    img {
    border-radius: 50%;
  }
  }
  a {
    color: inherit;
  }
    i {
      font-size: 20px;
    }
`