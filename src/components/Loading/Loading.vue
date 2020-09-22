<template>
<div class="cs-loader">
  <div class="cs-loader-inner">
    <label>●</label>
    <label>●</label>
    <label>●</label>
    <label>●</label>
    <label>●</label>
    <label>●</label>
  </div>
   <p class="title">{{$store.state.LoadingTitle}}</p>
</div>
</template>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  background:#3498db;
}

.cs-loader {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 100%);
    color: white;
    font-size: .9rem;
    font-weight: bold;
    letter-spacing: 5px;
    font-family: monospace;
  }
}

.cs-loader-inner {
  transform: translateY(-50%);
  top: 50%;
  position: absolute;
  width: calc(100%);
  color: #FFF;
  padding: 0 100px;
  text-align: center;
}

.cs-loader-inner label {
  font-size: 1.5rem;
  opacity: 0;
  display:inline-block;
  letter-spacing: 5px;
}

@keyframes lol {
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    transform: translateX(0px);
  }
  66% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(300px);
  }
}

@-webkit-keyframes lol {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  66% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(300px);
  }
}
.cs-loader-inner label:nth-child(6) {
  -webkit-animation: lol 3s 100ms infinite ease-in-out;
  animation: lol 3s 100ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(5) {
  -webkit-animation: lol 3s 200ms infinite ease-in-out;
  animation: lol 3s 200ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(4) {
  -webkit-animation: lol 3s 300ms infinite ease-in-out;
  animation: lol 3s 300ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(3) {
  -webkit-animation: lol 3s 400ms infinite ease-in-out;
  animation: lol 3s 400ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(2) {
  -webkit-animation: lol 3s 500ms infinite ease-in-out;
  animation: lol 3s 500ms infinite ease-in-out;
}
.cs-loader-inner label:nth-child(1) {
  -webkit-animation: lol 3s 600ms infinite ease-in-out;
  animation: lol 3s 500ms infinite ease-in-out;
}
</style>