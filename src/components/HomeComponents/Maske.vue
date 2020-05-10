<template>
  <div class="Maskparent">
    <div id="Maske">
      <Center class="center" />
      <div class="bg"></div>
    </div>
  </div>
</template>
<script>
import Center from "./Center";
export default {
  name: "maske",
  components: {
    Center
  }
};
</script>
<style lang="scss" scoped>
#Maske {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  transition: all 0.5s;
  z-index: 5;
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
  }
  .bg {
    width: 100%;
    height: 100vh;
    animation: opcity 0.5s linear;
    background:linear-gradient(#000,#311133);
    // background: url('../../assets/images/maskeBG.jpg') no-repeat center;
    background-size: cover;
    z-index: -99;
  }
  .bg::after {
    content:'';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background:inherit;
    filter: blur(3px);
        opacity: .7;
  }
  @keyframes opcity {
    0% { transform: translateX(-100%) }
    100% {  transform: translateX(0%) }
  }
}
</style>