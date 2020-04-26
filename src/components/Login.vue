<template>
  <div id="Login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" :lable-width="80">
      <FormItem>
        <div class="logintitle">欢迎加入codelei的小家庭!</div>
      </FormItem>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem v-if="isshow" prop="email">
        <Input placeholder="Email" v-model="formInline.email">
          <span slot="append">@qq.com</span>
        </Input>
        <Button
          v-text="btntext"
          :disabled="showBtn"
          @click.native="sendMail"
          class="btns"
          style="margin:0.5rem 0;"
          type="primary"
        >发送验证码</Button>
      </FormItem>
      <FormItem v-if="isshow" prop="value">
        <Input class="put_code" v-model="formInline.value" placeholder="输入验证码"></Input>
      </FormItem>
      <FormItem>
        <Button class="btns" @click="handleSubmit('formInline')">登陆</Button>
        <Button class="btns" style="margin-left:1rem;" type="default" @click="register">我是新人</Button>
      </FormItem>
      <FormItem>
        <p style="color:#fff;font-size:1rem;">提示: 没有账号可以点击我是新人进行注册,只需要验证邮箱就可以了,欢迎你的加入！</p>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { PostMessage } from "./NetWork/request";
export default {
  data() {
    return {
      isshow: false,
      showBtn: false,
      timer: null,
      count: 60,
      btntext: "发送验证码",
      formInline: {
        user: "",
        password: "",
        email: "",
        value: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "快快输入用户名,时间不等人呐!",
            trigger: "blur"
          },
          {
            type: "string",
            max: 11,
            min: 5,
            message: "用户长度最少为5位,最多11位哦,（＞人＜；）",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "还有密码密码密码!", trigger: "blur" },
          {
            type: "string",
            min: 8,
            max: 16,
            message: "密码长度最少为8位,最多16位哦,（＞人＜；）",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "这里填你的qq号鸭,我会给你发邮箱验证的",
            trigger: "blur"
          }
        ],
        value: [
          {
            required: true,
            message: "你还没有输入验证码,不要着急！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    if (localStorage.getItem("show")) {
      this.showBtn = true;
      this.count = parseInt(localStorage.getItem("show"));
      this.timer = setInterval(() => {
        this.count -= 1;
        if (this.count == 0) {
          clearInterval(this.timer);
          localStorage.removeItem("show");
          this.btntext = "发送验证码";
          this.showBtn = false;
        } else {
          this.btntext = `${this.count}秒后重新发送`;
          localStorage.setItem("show", this.count);
        }
      }, 1000);
    }
    /* 键盘事件 */
      document.onkeydown = (e) => {
      var key = e['keyCode'];
      if(key == 13){
        this.handleSubmit('formInline');
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          /* 登陆失败走注册模式 */
          if (this.isshow) {
            const code = localStorage.getItem("code");
            if (this.formInline.value == code) {
              PostMessage("/user/login", this.formInline).then(res => {
                if (res.data.err == 0) {
                  this.$Message.success(
                    "注册成功啦小主,3秒后为您跳转到首页(❤ ω ❤)!"
                  );
                  /* 保存一下token */
                  localStorage.setItem("username", res.data.token);
                  /* 再清除一下本地验证码缓存 */
                  localStorage.removeItem("code");
                  setTimeout(() => {
                    this.$router.replace("/home");
                  }, 1000);
                } else {
                  this.$Message.error(res.data.message);
                }
              });
            } else {
              this.$Message.error("错误的验证码, ⊙﹏⊙∥！");
            }
          } else {
            /* 默认走登陆模式 */
            PostMessage("/user/login", this.formInline).then(res => {
              if (res.data.err == 0) {
                this.$Message.success(
                  "登陆成功啦小主,3秒后为您跳转到首页(❤ ω ❤)!"
                );
                /* 保存一下刚刚登陆的账号 */
                localStorage.setItem("username", res.data.token);
                setTimeout(() => {
                  this.$router.replace("/home");
                }, 1000);
              }
              if (res.data.err == -1) {
                /* 报错查不到用户 那么我们就要进行一个注册 */
                this.$Message.error(
                  "没有查询到小主的信息哦需要进行注册, ⊙﹏⊙∥！"
                );
              }
            });
          }
        } else {
          this.$Message.error("请输入完整信息,o(*￣▽￣*)o!");
        }
      });
    },
    register() {
      this.isshow = true;
    },
    sendMail() {
      /* 发送邮箱验证码 */
      if (this.formInline.email != "") {
        /* 验证邮箱是正确 */
        var reg = /^\d{5,10}$/;
        if (reg.test(this.formInline.email) == true) {
          /* 发起验证码请求 */
          PostMessage("/user/emailInfo", {
            email: this.formInline.email + "@qq.com"
          }).then(res => {
            if (res.data.err == 0) {
              /* 发送成功 */
              this.$Message.success("验证码已经发送到小主的邮箱了,(●ˇ∀ˇ●)");
              localStorage.setItem("code", res.data.data);
              /* 进行倒计时 设置定时一分钟后可访问 */
              localStorage.setItem("show", 60);
              this.showBtn = true;
              this.count = 60;
              this.timer = setInterval(() => {
                this.count -= 1;
                if (this.count == 0) {
                  clearInterval(this.timer);
                  localStorage.removeItem("show");
                  this.btntext = "发送验证码";
                  this.showBtn = false;
                } else {
                  this.btntext = `${this.count}秒后重新发送`;
                  localStorage.setItem("show", this.count);
                }
              }, 1000);
            } else {
              this.$Message.error("网络不行稍后再试试噢");
            }
          });
        } else {
          this.$Message.error("输入正确的邮箱噢，太马虎啦！");
        }
      } else {
        this.$Message.error("邮箱不能空着呢！");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#Login {
  width: 90%;
  height: 80vh;
  margin: 0 auto;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .btns,
  .put_code {
    position: relative;
    z-index: 5;
  }
  .btns:nth-child(1) {
    background: rgb(53, 138, 235);
    color: white;
    border: 0;
  }
  .logintitle {
    color: #f2f2f2 !important;
    font-size: 2rem;
  }
}
</style>