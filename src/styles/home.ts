import styled from "styled-components";

export const IndexWrapper = styled.div`
background-color: #8abcda;
height: 100vh;
width: 100vw;
position: fixed;
left: 0;
top: 55px;
text-align: center;

.message {
   position: absolute;
   top:30%;
   left:50%;
   transform: translate(-50%);
    color: #333;
    font-size: 30px;
}

.usagi {
   width: 640px;
   height: 450px;
   margin: 30px auto 0px;
   overflow: hidden;
   position: absolute; 
   bottom: 0;
   left: calc((100vw - 1090px)/2);
}

.usagi .head {
   width: 640px;
   height: 565px;
   background-color: #f8b4c1;
   border-radius: 477px / 543px;
   border: 20px #522402 solid;
   position: absolute;
   top: 45%;
   left: calc((100% - 640px)/2);
   -webkit-transition: all 0.6s;
   transition: all 0.6s;
}

.usagi:hover > .head{
   top: 80%;
}

.usagi .head .wrap {
   width: 100%;
   height: 100%;
   position: relative;
}

.usagi .head .wrap::before,
.usagi .head .wrap::after {
   content: "";
   width: 80px;
   height: 160px;
   background-color: #f8b4c1;
   border: 20px #522402 solid;
   display: inline-block;
   border-bottom: none;
   position: absolute;
   -webkit-transform-origin: bottom;
   transform-origin: bottom;
}

.usagi .head .wrap::before {
   top: -177px;
   left: 173px;
   border-radius: 61% 38% 0px 0px;
   -webkit-transform: rotate(-4deg);
   transform: rotate(-4deg); 
}

.usagi .head .wrap::after {
   top: -174px;
   right: 147px;
   border-radius: 82% 77% 0px 0px;
   -webkit-transform: rotate(5.2deg);
   transform: rotate(5.2deg);
}

.usagi .face {
   background-color: #fff;
   width: 170px;
   height: 250px;
   position: absolute;
   border-radius: 89%;
   left: calc((100% - 170px)/2);
   top: 75px;
}

.usagi .face::before,
.usagi .face::after {
   content: "";
   width: 45px;
   height: 25px;
   display: block;
   position: absolute;
   background-color: #522402;
   border-radius: 57%;
}

.usagi .face::before {
   top: 4px;
   left: -12px;
   -webkit-transform: rotate(-20deg);
   transform: rotate(-20deg);
}

.usagi .face::after {
   top: 4px;
   right: -9px;
   -webkit-transform: rotate(20deg);
   transform: rotate(20deg);
}

.usagi .mouth {
   width: 65px;
   height: 70px;
   background-color: #f8b4c1;
   border: 19px #522402 solid;
   border-top: none;
   border-radius: 0% 0% 110% 110%;
   position: absolute;
   left: calc((100% - 65px)/2);
   top: 160px;
}

.usagi .mouth::before,
.usagi .mouth::after {
   content: "";
   width: 27px;
   height: 40px;
   border: 20px #522402 solid;
   position: absolute;
   top: -40px;
}

.usagi .mouth::before {
   left: -32px;
   border-top: none;
   border-left: none;
   border-radius: 100px 10px 160px 80px;
   -webkit-transform: rotate(56deg);
   transform: rotate(56deg);
}

.usagi .mouth::after {
   right: -32px;
   border-top: none;
   border-right: none;
   border-radius: 10px 100px 80px 160px;
   -webkit-transform: rotate(-56deg);
   transform: rotate(-56deg);
}

.usagi .nose {
   width: 40px;
   height: 25px;
   background-color: #522402;
   position: absolute;
   left: calc((100% - 40px)/2);
   top: 82px;
   border-radius: 48%;
}

.usagi .nose::after {
   content: "";
   width: 20px;
   height: 65px;
   background-color: #522402;
   display: block;
   position: absolute;
   top: 10px;
   left: calc((100% - 20px)/2);
}

.usagi .flush {
   width: 100%;
   height: 100%;
   position: relative;
}

.usagi .flush::before,
.usagi .flush::after {
   content: "";
   width: 130px;
   height: 90px;
   background-color: #f6a2af;
   display: block;
   position: absolute;
   top: 100px;
   border-radius: 100%/ 90%;
}

.usagi .flush::before {
   left: 70px;
}

.usagi .flush::after {
   right: 70px;
}

.piske {
   width: 450px;
   height: 450px;
   overflow: hidden;
   position: absolute;
   bottom: 0;
   right: calc((100vw - 1090px)/2);
}

.piske .head {
   width: 100%;
   height: 575px;
   background-color: #fff;
   border-radius: 580px / 550px;
   border: 15px #40190f solid;
   position: absolute;
   top: 40%;
   left: 0;
   -webkit-transition: all 0.6s;
   transition: all 0.6s;
}

.piske:hover > .head{
   top: 80%;
}

.piske .mouth {
   position: absolute;
   left: calc((100% - 80px)/2);
   top: 100px;
}

.piske .mouth::before,
.piske .mouth::after {
   content: "";
   display: block;
   border: 15px #40190f solid;
   background-color: #fedc3a;
   margin: auto;
}

.piske .mouth::before {
   width: 50px;
   height: 30px;
   border-radius: 50px;
}

.piske .mouth::after {
   width: 40px;
   height: 40px;
   border-radius: 100%;
   margin-top: -15px;
}

.piske .eyes {
   width: 100%;
   height: 30px;
   position: absolute;
   top: 125px;
}

.piske .eyes::before,
.piske .eyes::after {
   content: "";
   display: block;
   width: 30px;
   height: 30px;
   border-radius: 100%;
   background-color: #40190f;
   position: absolute;
}

.piske .eyes::before {
   left: 130px;
}

.piske .eyes::after {
   right: 130px;
}

.piske .flush {
   width: 100%;
   position: absolute;
   height: 60px;
   top: 140px;
}

.piske .flush::before,
.piske .flush::after {
   content: "";
   width: 60px;
   height: 60px;
   background-color: #f6a2af;
   display: block;
   position: absolute;
   border-radius: 100%/ 90%;
}

.piske .flush::before {
   left: 50px;
}

.piske .flush::after {
   right: 50px;
}

`;
