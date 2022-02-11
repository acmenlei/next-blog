import { getCurrentCardBackground, getCurrentFontColor } from '@/utils/theme'
import styled from 'styled-components'

export const comment = styled.div`
  width: 400px;
  background-color: ${(props: any) => getCurrentCardBackground(props.theme)};
  transition: background-color .2s;
  box-shadow: 0 0 1px #333 inset;
  border-radius: 8px;
  color: ${(props: any) => getCurrentFontColor(props.theme)};
`

export const ProfileInfoWrapper = styled(comment)`


  div.line {
    padding: 10px;
    
    label {
      color: #999;
    }
  }

  .operator {
    padding: 10px;
  }
`