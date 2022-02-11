import { getCurrentFontColor } from "@/utils/theme"
import styled from "styled-components"

export const ArticleRecentWrapper = styled.ul`
  li {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    transform: translateX(-30px);
    cursor: pointer;
    transition: transform 300ms;
    &:hover {
      transform: translateX(-20px);
    }
    &:hover span {
      text-decoration: underline;
    }
    span {
      &:nth-child(1) {
        flex: 1;
        color: ${(props: any) => getCurrentFontColor(props.theme)};
      }

      &:nth-child(2) {
        width: 130px;
        color: ${(props:any) => props.color};
        font-weight: bold;
        margin-left: 10px;
        white-space: nowrap;
      }
    }
  }
`