import { getCurrentCardBackground, getCurrentFontColor } from "@/utils/theme";
import styled from "styled-components"

export const ArticleRightContainerWrapper = styled.div`
    background-color: ${(props: any) => getCurrentCardBackground(props.theme)};
    padding: 5px 0;
    margin-bottom: 20px;
    box-shadow: 0 0 1px #333;
    transition: background-color .2s;
    border-radius: 8px;
    
    .container-title {
      border-bottom: 3px solid ${(props: any) => props.color};
      display: flex;
      justify-content: space-between;
      align-items: center;

      .container-title-left {
        i {
        margin:0 10px;
        color: ${(props: any) => props.color};
        font-size: 20px;
      }

        p {
          color: ${(props: any) => getCurrentFontColor(props.theme)};
          display: inline-block;
        }
      }
      .container-title-right {
        margin-right: 20px;
        cursor: pointer;
        color: #74b9ff;
      }
    }
    
    .container-children {
      padding: 15px 10px;
    }
    
` 