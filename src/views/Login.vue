<template>
  <div id="Login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" :lable-width="80">
      <FormItem>
        <div :style="{color:Color}" class="logintitle">欢迎加入codelei的小家庭!</div>
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
        <Input class="put_code" v-model="formInline.code" placeholder="输入验证码"></Input>
      </FormItem>
      <FormItem>
        <Button class="btns" @click="handleSubmit('formInline')">登陆</Button>
        <Button class="btns" style="margin-left:1rem;" type="default" @click="register">我是新人</Button>
      </FormItem>
      <FormItem>
        <p :style="{color:Color}" style="font-size:1rem;">提示: 没有账号可以点击我是新人进行注册,只需要验证邮箱就可以了,欢迎你的加入！</p>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { PostMessage } from "../components/NetWork/request";
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
        code: ""
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
        code: [
          {
            required: true,
            message: "你还没有输入验证码,不要着急！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    Color() {
      return this.$store.state.Color;
    }
  },
  mounted() {
    if (localStorage.getItem("dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk")) {
      this.showBtn = true;
      this.count = parseInt(
        localStorage.getItem("dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk")
      );
      this.timer = setInterval(() => {
        this.count -= 1;
        if (this.count == 0) {
          clearInterval(this.timer);
          localStorage.removeItem(
            "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk"
          );
          this.btntext = "发送验证码";
          this.showBtn = false;
        } else {
          this.btntext = `${this.count}秒后重新发送`;
          localStorage.setItem(
            "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk",
            this.count
          );
        }
      }, 1000);
    } else {
      clearInterval(this.timer);
    }
    /* 键盘事件 */
    document.onkeydown = e => {
      var key = e["keyCode"];
      if (key == 13) {
        this.handleSubmit("formInline");
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          /* 登陆失败走注册模式 */
          if (this.isshow) {
            this.$store.commit("LoadingTitleChange", {
              isshow: true,
              title: "正在注册您的账号请稍等..."
            });
            PostMessage("/user/login", this.formInline).then(res => {
              if (res.data.err == 0) {
                this.$Message.success(
                  "注册成功啦小主,3秒后为您跳转到首页(❤ ω ❤)!"
                );
                /* 保存一下token */
                localStorage.setItem("username", res.data.token);
                clearInterval(this.timer);
                localStorage.removeItem(
                  "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk"
                );
                setTimeout(() => {
                  this.$router.back();
                }, 1000);
              } else {
                this.$Message.error(res.data.message);
              }
              this.$store.commit("LoadingTitleChange", {
                isshow: false,
                title: ""
              });
            });
          } else {
            /* 默认走登陆模式 */
            this.$store.commit("LoadingTitleChange", {
              isshow: true,
              title: "正在登陆请稍等片刻..."
            });
            PostMessage("/user/login", this.formInline).then(res => {
              if (res.data.err == 0) {
                this.$Message.success("登陆成功啦,马上带您去游览我的小站!");
                /* 保存一下刚刚登陆的账号 */
                localStorage.setItem("username", res.data.token);
                setTimeout(() => {
                  this.$router.back();
                }, 1000);
              } else if (res.data.err == -998) {
                /* 报错查不到用户 那么我们就要进行一个注册 */
                this.$Message.error(res.data.data);
              } else {
                this.$Message.error(res.data.data);
              }
              this.$store.commit("LoadingTitleChange", {
                isshow: false,
                title: ""
              });
            }).catch(reason => {
              this.$Message.error(reason.message);
            });
          }
        } else {
          this.$Message.error("请输入完整信息,o(*￣▽￣*)o!");
        }
      });
    },
    register() {
      this.isshow = !this.isshow;
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
              /* 进行倒计时 设置定时一分钟后可访问 */
              localStorage.setItem(
                "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk",
                60
              );
              this.showBtn = true;
              this.count = 60;
              this.timer = setInterval(() => {
                this.count -= 1;
                if (this.count == 0) {
                  clearInterval(this.timer);
                  localStorage.removeItem(
                    "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk"
                  );
                  this.btntext = "发送验证码";
                  this.showBtn = false;
                } else {
                  this.btntext = `${this.count}秒后重新发送`;
                  localStorage.setItem(
                    "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk",
                    this.count
                  );
                }
              }, 1000);
            } else {
              this.$Message.error(res.data.message);
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
    font-size: 2rem;
  }
}
</style>