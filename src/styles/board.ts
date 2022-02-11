import { getCurrentCardBackground, getCurrentFontColor } from "@/utils/theme"
import styled from "styled-components"

export const MessageBoardWrapper = styled.div`
  padding: 20px;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 0 1px #333;
  background-color: ${(props: any) => getCurrentCardBackground(props.theme)};
  transition: background-color .2s, color .2s;
  color: ${(props: any) => getCurrentFontColor(props.theme)};
  animation: transformXAnimation .5s;

  @keyframes transformXAnimation {
    from { transform: translateX(-100%) }
    to { transform: translateX(0) }
  }
`