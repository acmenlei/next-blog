import styled from 'styled-components'

import { comment } from "@/components/profile-info/style"

export const ProfileFixPWDWrapper = styled(comment)`
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    flex-direction: column;
    .ant-form-item {
      width: 80%;
      label {
        color: #999;
      }
    }
  }
`