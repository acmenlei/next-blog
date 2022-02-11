import { getCurrentTheme } from "@/utils/theme"
import styled from "styled-components"

export const AppFooterWrapper = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #f8f8f8;
  background-color: ${(props: any) => getCurrentTheme(props.theme)};
  transition: background-color .2s;
`