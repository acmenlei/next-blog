import styled from 'styled-components'

export const ProfileWrapper = styled.div`
  height: calc(100vh - 190px);
  display: flex;
  justify-content: center;
  align-items: center;

  .userInfo-enter {
    transform: translateX(-100%);
  }
  .userInfo-enter-active {
    transform: translateX(0);
    transition: transform 300ms;
  }
  .userInfo-enter-done {
    transform: translateX(0);
    transition: transform 300ms;
  }
  .userInfo-exit {
    transform: translateX(0);
  }
  .userInfo-exit-active {
    transform: translateX(100%);
    transition: transform 300ms;
  }
  .userInfo-exit-done {
    transform: translateX(100%);
    transition: transform 300ms;
  }
  animation: transformXAnimation .5s;

  @keyframes transformXAnimation {
    from { transform: translateX(-50%) }
    to { transform: translateX(0) }
  }
`