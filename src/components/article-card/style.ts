import { getCurrentCardBackground, getCurrentFontColor } from "@/utils/theme"
import styled from "styled-components"

export const ArticleCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: any) => getCurrentCardBackground(props.theme)};
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 0 1px #333;
  transition: background-color .2s;
  border-radius: 8px;

  .card-item-left {
    width: 400px;
    overflow: hidden;

    img {
      transition: transform .3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .card-item-right {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 10px 20px;
    color: ${(props: any) => getCurrentFontColor(props.theme)};
    
    .card-item-introduce {
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }

    h3 {
      line-height: 22px;
      padding-top: 12px;
      color: ${(props: any) => getCurrentFontColor(props.theme)};
    }

    .card-item-tags {
      .ant-tag {
        margin-bottom: 5px;
      }
    }
  }

  .three-colors-ball {
    position: absolute;
    top: 10px;
    right: 10px;
    span {
    display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 5px;

      &:nth-child(1) {
        background-color: red;
      }
      &:nth-child(2) {
        background-color: orange;
      }
      &:nth-child(3) {
        background-color: green;
      }
    }
  }
`