<template>
  <div id="center">
   <div class="container_img">
       <img src="../../assets/images/codelei.svg" alt="">
    </div>
   <h3>codelei</h3>
   <h2 data-text="Welcome to My Blog !"><span>{{text}}</span></h2>
  </div>
</template>
<script>
  export default {
    name:'center',
    data () {
      return {
        text:'Welcome to My Blog',
      };
    }
  }
</script>
<style lang="scss" scoped>
#center {
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   .container_img {
       margin-bottom: 2rem;
   }
   @font-face {
       font-family: '../../assets/font/font_title.ttf';
       src: url('../../assets/font/font_title.ttf');
   }
   h3 {
       font-family: '../../assets/font/font_title.ttf';
       margin-bottom: 4rem;
       color: #f2f2f2;
       font-size: 2rem;
   }
   @media screen and(max-width:568px) {
       .container_img {
           border-radius: 50%;
           width: 100px;
           height: 100px;
           overflow: hidden;
       }
       img {
           margin-left: -2rem;
       }
   }
}
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
    overflow: hidden;
}
 
h2 {
    position: relative;
    font-family: 'Montserrat', Arial, sans-serif;
    font-size: calc(20px + 2vw);
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    text-shadow: 0 0 0.15em #1da9cc;
    user-select: none;
    white-space: nowrap;
    filter: blur(0.007em);
    animation: shake 2.5s linear forwards alternate infinite;
}
 
h2 span {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    -webkit-clip-path: polygon(10% 0%, 44% 0%, 70% 100%, 55% 100%);
            clip-path: polygon(10% 0%, 44% 0%, 70% 100%, 55% 100%);
}
 
h2::before,
h2::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
}
 
h2::before {
    animation: crack1 2.5s linear forwards alternate infinite;
    -webkit-clip-path: polygon(0% 0%, 10% 0%, 55% 100%, 0% 100%);
            clip-path: polygon(0% 0%, 10% 0%, 55% 100%, 0% 100%);
}
 
h2::after {
    animation: crack2 2.5s linear forwards alternate infinite;
    -webkit-clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 70% 100%);
            clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 70% 100%);
}
 
@keyframes shake {
    5%, 15%, 25%, 35%, 55%, 65%, 75%, 95% {
        filter: blur(0.018em);
        transform: translateY(0.018em) rotate(0deg);
    }
 
    10%, 30%, 40%, 50%, 70%, 80%, 90% {
        filter: blur(0.01em);
        transform: translateY(-0.018em) rotate(0deg);
    }
 
    20%, 60% {
        filter: blur(0.03em);
        transform: translate(-0.018em, 0.018em) rotate(0deg);
    }
 
    45%, 85% {
        filter: blur(0.03em);
        transform: translate(0.018em, -0.018em) rotate(0deg);
    }
 
    100% {
        filter: blur(0.007em);
        transform: translate(0) rotate(-0.5deg);
    }
}
 
@keyframes crack1 {
    0%, 95% {
        transform: translate(-50%, -50%);
    }
 
    100% {
        transform: translate(-51%, -48%);
    }
}
 
@keyframes crack2 {
    0%, 95% {
        transform: translate(-50%, -50%);
    }
 
    100% {
        transform: translate(-49%, -53%);
    }
}
</style>