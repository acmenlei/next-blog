import styled from "styled-components"

export const AppBackGroundWrapper = styled.div`
  top: 0;
  left: 0;
  z-index: -99;

  .theme-bg-enter {
    transform: translateY(-100%);
  }
  .theme-bg-enter-active {
    transform: translateY(0);
    transition: transform .2s;
  }
  .theme-bg-enter-done {
    transform: translateY(0);
    transition: transform .2s;
  }
  .theme-bg-exit {
    transform: translateY(0);
  }
  .theme-bg-exit-active {
    transform: translateY(-100%);
    transition: transform .2s;
  }
  .theme-bg-exit-done {
    transform: translateY(-100%);
    transition: transform .2s;
  }
`
