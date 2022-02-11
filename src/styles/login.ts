import styled from "styled-components"

export const OutContainerWrapper = styled.div`
    height: calc(100vh - 190px);
`

export const ContainerWrapper = styled.div`
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: translateXAnimation .3s;
  overflow: hidden;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.24) inset;

  @keyframes translateXAnimation {
    0%{ transform: translate(-100%,-100%) }
   100%{ transform: translate(-50%, -50%) }
  }
  .login-enter {
    transform: translateY(-100%);
  }
  .login-enter-active {
    transform: translateY(0);
    transition: transform 300ms;
  }
  .login-enter-done {
    transform: translateY(0);
    transition: transform 300ms;
  }
  .login-exit {
    transform: translateY(0);
  }
  .login-exit-active {
    transform: translateY(100%);
    transition: transform 300ms;
  }
  .login-exit-done {
    transform: translateY(100%);
    transition: transform 300ms;
  }
`

const commonStyles = styled.div`
  background: white;
  width: 400px;
  align-items: center;
  position: relative;
`

export const LoginWrapper = styled(commonStyles)`
  
`

export const RegisterWrapper = styled(commonStyles)`

`