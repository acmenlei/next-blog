import styled from "styled-components"

export const AppHeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: ${(props: any) => props.theme};
    transition: background-color .2s;
    
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    span {
      margin-top: 10px;
      cursor: pointer;
    }
  }
`

export const AppHeaderLeftWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  
  span.logo-desc {
      color: #f8f8f8;
      margin: 20px 0 0 10px;
  }
`

export const AppHeaderCenterWrapper = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;

  a , .nav-item{
    color: #f8f8f8;
  }
  .nav-item {
    padding: 15px 20px;
    cursor: pointer;

    i {
      margin-right: 5px;
    }

    &:hover {
      opacity: .8;
      background-color: #333;
    }
  }
  .ant-avatar {
    & + span {
      margin-top: 20px;
      margin-left: 5px;
      color: #ccc;
    }
  }
  
`

export const AppHeaderRightWrapper = styled.div`
  flex: 0.5;
  color: #f8f8f8;
  text-align: right;
  cursor: pointer;
  overflow: hidden;
  
  img {
    animation: rotate-slow 10s linear infinite;
  }

  @keyframes rotate-slow {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .theme-enter {
    transform: translateY(-50px);
  }
  .theme-enter-active {
    transform: translateY(0);
    transition: transform .3s;
  }
  .theme-enter-done {
    transform: translateY(0);
    transition: transform .3s;
  }
  .theme-exit {
    transform: translateY(0);
  }
  .theme-exit-active {
    transform: translateY(50px);
    transition: transform .3s;
  }
  .theme-exit-done {
    transform: translateY(50px);
    transition: transform .3s;
  }
`