<template>
  <div class="adminLogin">
    <div :class="{rightpanelactive: isTransform}" class="container" id="container">
      <div class="form-container sign-up-container">
        <!-- 注册 -->
        <form action="javascript:;">
          <h1>用户注册</h1>
          <div class="social-container">
            <a href="#" class="social">
              <i class="iconfont icon-qq"></i>
            </a>
            <a href="#" class="social">
              <i class="iconfont icon-weixin"></i>
            </a>
            <a href="#" class="social">
              <i class="iconfont icon-weibo-copy"></i>
            </a>
          </div>
          <span>您可以选择以上几种方式注册一个您的账户!</span>
          <input type="text" placeholder="用户名" />
          <input type="password" placeholder="密码" />
          <input type="email" placeholder="邮箱" />
          <button id="send_code">发送验证码</button>
          <input type="email" placeholder="验证码" />
          <button>注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <!-- 登陆 -->
        <form action="javascript:;">
          <h1>
            <i class="iconfont icon-denglu"></i> 后台管理系统登陆:
          </h1>
          <div class="social-container">
            <a href="#" class="social">
              <i class="iconfont icon-qq"></i>
            </a>
            <a href="#" class="social">
              <i class="iconfont icon-weixin"></i>
            </a>
            <a href="#" class="social">
              <i class="iconfont icon-weibo-copy"></i>
            </a>
          </div>
          <span>您可以选择以上几种方式登陆您的账户!</span>
          <input v-model="user" type="text" placeholder="用户名" />
          <input v-model="pass" type="password" placeholder="密码" />
          <a href="#">忘记密码？</a>
          <button @click="handelLogin">登陆</button>
        </form>
      </div>
      <!-- 侧边栏内容 -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有帐号？</h1>
            <p>亲爱的快快点我去进行登陆吧。</p>
            <button @click="adminSignIn" class="ghost" id="signIn">登陆</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有帐号？</h1>
            <p>点击注册去注册一个属于你的账号吧。</p>
            <button @click="adminSignUp" class="ghost" id="signUp">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PostMessage } from "../components/NetWork/request";
export default {
  name: "adminlogin",
  data() {
    return {
      isTransform: false,
      user: "",
      pass: "",
    };
  },
  methods: {
    adminSignUp() {
      this.isTransform = true;
    },
    adminSignIn() {
      this.isTransform = false;
    },
    handelLogin() {
      if (!this.pass && this.user) {
        this.$Message.error("请填写完整的信息!");
      } else {
        PostMessage("/user/adminUserCheck", {
          username: this.user,
          password: this.pass,
        }).then((res) => {
          if (res.data.err === 0) {
            this.$router.replace("/admin/article");
            this.$Message.success(res.data.message);
          } else if (res.data.err === -998) {
            this.$Message.error(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
      }
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1 {
  margin: 0.2rem;
  font-size: 1.2rem;
}
h1 i {
  font-size: 1.2rem;
}
p {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 100;
  margin: 1.2rem 0;
  letter-spacing: 0.1rem;
}
span {
  font-size: 0.8rem;
  margin: 1.2rem 0;
}
a {
  color: #333;
  font-size: 1rem;
  text-decoration: none;
}
.container {
  position: relative;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 0.6rem;
  width: 50rem;
  height: 35rem;
  overflow: hidden;
  max-width: 100vw;
  min-height: 70vh;
  float: right;
  margin: 4rem 4rem 0;
  opacity: 0.7;
  z-index: 9;
}
.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.social-container {
  margin: 0.6rem 0;
}
.social-container a {
  border: 1px solid #eee;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 1.8rem;
  width: 1.8rem;
}
.social-container a:hover {
  opacity: 0.8;
}
.form-container input {
  width: 100%;
  height: 2.2rem;
  text-indent: 1rem;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  border-top: none;
  outline: none;
  margin: 0.6rem 0;
}
.form-container button:active {
  transform: scale(0.95, 0.95);
}
.form-container button {
  padding: 0.4rem 1rem;
  background: #417dff;
  color: white;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 100ms ease-in;
  margin: 0.6rem 0;
  font-size: 0.6rem;
  padding: 0.5rem 0;
}
button.ghost {
  background: transparent;
  border-color: #fff;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 100ms ease-in;
  margin: 0.6rem 0;
  padding: 0.5rem 0;
  color: white;
  font-size: 0.6rem;
}
button#send_code {
  width: 100%;
}
button.ghost:active {
  transform: scale(0.95, 0.95);
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.5s ease-in;
}
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
.overlay {
  background: #417dff;
  width: 200%;
  height: 100%;
  position: relative;
  left: -100%;
  transition: all 0.6s ease-in-out;
  color: white;
}
.overlay-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  z-index: 99;
}
.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0 2.2rem;
}
.overlay-right {
  right: 0;
}
.container.rightpanelactive .overlay-container {
  transform: translateX(-100%);
}
.container.rightpanelactive .sign-in-container {
  transform: translateX(100%);
}
.container.rightpanelactive .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  transition: all 0.6s ease-in-out;
}
.container.rightpanelactive .overlay {
  transform: translateX(50%);
}
.container.rightpanelactive .overlay-left {
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}
.container.rightpanelactive .overlay-right {
  transform: translateX(20%);
  transition: all 0.6s ease-in-out;
}
</style>