<template>
  <div id="lampadario" @click="changebg">
    <input type="radio" name="switch" value="on" />
    <input type="radio" name="switch" value="off" checked="checked" />
    <label  for="switch"></label>
    <div id="filo"></div>
    <div id="lampadina">
      <div  id="sorpresa">
        <div id="footer">.</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'light',
  methods:{
    changebg() {
    this.$emit('changeBackground')
    }
  }
}
</script>
<style scoped>
#lampadario {
  position: fixed;
  left: 5%;
  top: 0;
  cursor: pointer;
  z-index: 1;
}
#filo {
  position: relative;
  background-color: #000000;
  width: 2px;
  height: 100px;
  left: 50%;
  margin-left: -1px;
  z-index: 99;
  -webkit-transform-origin: 0% 0%;
  -moz-transform-origin: 0% 0%;
  -ms-transform-origin: 0% 0%;
  -o-transform-origin: 0% 0%;
  transform-origin: 0% 0%;
  -webkit-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
  -moz-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
  -ms-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
  -o-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
  animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
}
#filo:after {
  content: " ";
  left: -3px;
  top: 100%;
  position: absolute;
  border-bottom: 15px solid #000000;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  height: 0;
  width: 4px;
}
input[value="off"]:checked ~ #filo {
  -webkit-box-shadow: -80px -10px 7px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -80px -10px 7px 0 rgba(0, 0, 0, 0.1);
  -ms-box-shadow: -80px -10px 7px 0 rgba(0, 0, 0, 0.1);
  -o-box-shadow: -80px -10px 7px 0 rgba(0, 0, 0, 0.1);
  box-shadow: -80px -10px 7px 0 rgba(0, 0, 0, 0.1);
}
input[value="off"]:checked ~ #filo:after {
  -webkit-box-shadow: -80px -10px 10px -2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -80px -10px 10px -2px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: -80px -10px 10px -2px rgba(0, 0, 0, 0.1);
  -o-box-shadow: -80px -10px 10px -2px rgba(0, 0, 0, 0.1);
  box-shadow: -80px -10px 10px -2px rgba(0, 0, 0, 0.1);
}

input {
  position: absolute;
  width: 90px;
  height: 70px;
  top: 150px;
  margin-left: -45px;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}

input[value="on"] {
  top: 110px;
}
input[value="off"] {
  top: -100px;
}
input[value="on"]:checked {
  top: -100px;
}
input[value="on"]:checked + input[value="off"] {
  top: 110px;
}

label {
  width: 51px;
  height: 51px;
  top: 114px;
  position: absolute;
  left: 0;
  margin-left: -24px;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  -o-border-radius: 100%;
  border-radius: 100%;
  -webkit-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
  -moz-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
  -ms-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
  -o-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
  animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
}
input[value="off"]:checked ~ label {
  background: rgba(223, 223, 223, 0.767);
  -webkit-box-shadow: inset 0px 1px 5px rgba(255, 255, 255, 0.5),
    inset 0px 2px 20px rgba(255, 255, 255, 0.1),
    -80px -15px 15px -5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0px 1px 5px rgba(255, 255, 255, 0.5),
    inset 0px 2px 20px rgba(255, 255, 255, 0.1),
    -80px -15px 15px -5px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: inset 0px 1px 5px rgba(255, 255, 255, 0.5),
    inset 0px 2px 20px rgba(255, 255, 255, 0.1),
    -80px -15px 15px -5px rgba(0, 0, 0, 0.1);
  -o-box-shadow: inset 0px 1px 5px rgba(255, 255, 255, 0.5),
    inset 0px 2px 20px rgba(255, 255, 255, 0.1),
    -80px -15px 15px -5px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0px 1px 5px rgba(255, 255, 255, 0.5),
    inset 0px 2px 20px rgba(255, 255, 255, 0.1),
    -80px -15px 15px -5px rgba(0, 0, 0, 0.1);
}
input[value="on"]:checked ~ label {
  background: rgb(255, 227, 66,0.8);
  -webkit-box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    -80px -15px 120px 0px rgba(255, 227, 66, 0.4);
  -moz-box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    -80px -15px 120px 0px rgba(255, 227, 66, 0.4);
  -ms-box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    -80px -15px 120px 0px rgba(255, 227, 66, 0.4);
  -o-box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    -80px -15px 120px 0px rgba(255, 227, 66, 0.4);
  box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    -80px -15px 120px 0px rgba(255, 227, 66,0.4);
}

input[value="off"]:checked ~ label:after {
  content: " ";
  width: 15px;
  height: 15px;
  top: 0;
  position: absolute;
  left: 0;
  margin-left: 15px;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  -o-border-radius: 100%;
  border-radius: 100%;
  border: 2px solid rgba(255, 255, 255, 0.03);
}
#sorpresa {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
@-webkit-keyframes oscillaFilo {
  from {
    -webkit-transform: rotate(5deg);
  }
  to {
    -webkit-transform: rotate(-5deg);
  }
}
@-moz-keyframes oscillaFilo {
  from {
    -moz-transform: rotate(5deg);
  }
  to {
    -moz-transform: rotate(-5deg);
  }
}
@-ms-keyframes oscillaFilo {
  from {
    -ms-transform: rotate(5deg);
  }
  to {
    -ms-transform: rotate(-5deg);
  }
}
@-o-keyframes oscillaFilo {
  from {
    -o-transform: rotate(5deg);
  }
  to {
    -o-transform: rotate(-5deg);
  }
}
@keyframes oscillaFilo {
  from {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(-5deg);
  }
}

@-webkit-keyframes oscillaLampadina {
  from {
    -webkit-transform: rotate(3deg) translate(-16.4px, -1px);
  }
  to {
    -webkit-transform: rotate(-3deg) translate(16.4px, -1px);
  }
}
@-moz-keyframes oscillaLampadina {
  from {
    -moz-transform: rotate(3deg) translate(-16.4px, -1px);
  }
  to {
    -moz-transform: rotate(-3deg) translate(16.4px, -1px);
  }
}
@-ms-keyframes oscillaLampadina {
  from {
    -ms-transform: rotate(3deg) translate(-16.4px, -1px);
  }
  to {
    -ms-transform: rotate(-3deg) translate(16.4px, -1px);
  }
}
@-o-keyframes oscillaLampadina {
  from {
    -o-transform: rotate(3deg) translate(-16.4px, -1px);
  }
  to {
    -o-transform: rotate(-3deg) translate(16.4px, -1px);
  }
}
@keyframes oscillaLampadina {
  from {
    transform: rotate(3deg) translate(-16.4px, -1px);
  }
  to {
    transform: rotate(-3deg) translate(16.4px, -1px);
  }
}

@-webkit-keyframes ombraTesto {
  from {
    -webkit-transform: translate(1px, 0px) scale(1.01, 1.06) skew(0.9deg, 0deg);
  }
  to {
    -webkit-transform: translate(-1px, 0px) scale(1.01, 1.06)
      skew(-0.9deg, 0deg);
  }
}
@-moz-keyframes ombraTesto {
  from {
    -moz-transform: translate(1px, 0px) scale(1.01, 1.06) skew(0.9deg, 0deg);
  }
  to {
    -moz-transform: translate(-1px, 0px) scale(1.01, 1.06) skew(-0.9deg, 0deg);
  }
}
@-ms-keyframes ombraTesto {
  from {
    -ms-transform: translate(1px, 0px) scale(1.01, 1.06) skew(0.9deg, 0deg);
  }
  to {
    -ms-transform: translate(-1px, 0px) scale(1.01, 1.06) skew(-0.9deg, 0deg);
  }
}
@-o-keyframes ombraTesto {
  from {
    -o-transform: translate(1px, 0px) scale(1.01, 1.06) skew(0.9deg, 0deg);
  }
  to {
    -o-transform: translate(-1px, 0px) scale(1.01, 1.06) skew(-0.9deg, 0deg);
  }
}
@keyframes ombraTesto {
  from {
    transform: translate(1px, 0px) scale(1.01, 1.06) skew(0.9deg, 0deg);
  }
  to {
    transform: translate(-1px, 0px) scale(1.01, 1.06) skew(-0.9deg, 0deg);
  }
}
</style>