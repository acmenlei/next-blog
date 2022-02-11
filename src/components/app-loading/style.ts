import styled from "styled-components"

export const AppLoadingWrapper = styled.div`
  background:#ECF0F1;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: .9;

.load{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);
  width:100px;
  height:100px;
  hr:nth-child(1) {
    background:#19A68C;animation-delay:-1.5s;
  }
  hr:nth-child(2) {
    background:#F63D3A;animation-delay:-1s
  }
  hr:nth-child(3) {
    background:#FDA543;animation-delay:-0.5s
  }
  hr:nth-child(4) {
    background:#193B48
  }
}
.load hr{border:0;margin:0;width:30%;height:30%;position:absolute;border-radius:50%;animation:spin 2s ease infinite}

@keyframes spin{
  0%,100%{transform:translate(0)}
  25%{transform:translate(160%)}
  50%{transform:translate(160%, 160%)}
  75%{transform:translate(0, 160%)}
}

  .loading-enter {
    opacity: 0;
  }
  .loading-enter-active {
    opacity: 1;
    transition: opacity .3s;
  }
  .loading-enter-done {
    opacity: 1;
    transition: opacity .3s;
  }
  .loading-exit {
    opacity: 1;
  }
  .loading-exit-active {
    opacity: 0;
    transition: opacity .3s;
  }
  .loading-exit-done {
    opacity: 0;
    transition: opacity .3s;
  }
`