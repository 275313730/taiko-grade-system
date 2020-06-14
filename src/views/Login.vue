<template>
  <div class="main">
    <!--!>
    <img id="left" src="../assets/blue.png" alt />
    <img id="right" src="../assets/red.png" alt />
    <!-->
    <div class="login">
      <form class="form-body">
        <div class="login-title">用户登录</div>
        <div>
          <label>昵称:</label>
          <input
            v-model="loginData.id"
            class="form-control input-block"
            type="text"
            autofocus="autofocus"
          />
        </div>
        <div>
          <label>密码:</label>
          <input v-model="loginData.passWord" class="form-control input-block" type="password" />
        </div>
        <button @click="login()" class="btn">登录</button>
        <button @click="register()" class="btn">注册</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        id: null,
        passWord: null
      }
    };
  },
  methods: {
    login() {
      event.preventDefault();
      this.$axios({
        method: "POST",
        url: "/login",
        data: this.loginData
      })
        .then(res => {
          if (res.data) {
            this.$router.push("/home");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    register() {
      event.preventDefault();
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
/*通用样式*/
* {
  box-sizing: border-box;
  text-align: center;
  position: relative;
}

/*
img {
  position: absolute;
  width: 150px;
  top: 10%;
  z-index: 9;
}

#left {
  left: 400px;
}

#right {
  right: 410px;
  width: 140px;
}
*/

.login-title {
  color: #b53000;
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 5px;
}

/*元素类*/
.main {
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  overflow: hidden;
}

/*label样式*/
label {
  color: #b53000;
  display: inline-block;
  margin-bottom: 7px;
  text-align: left;
  margin-right: 7px;
  font-size: 1rem;
  font-weight: 600;
}

/*class类*/
/*按钮样式*/
.btn {
  width: 95%;
  font-size: 18px;
  padding: 10px;
  color: #fff;
  background-color: #ec1e06;
  border: 3px solid #ffa66b;
  border-right-color: rgb(255, 166, 107);
  border-bottom-color: rgb(255, 166, 107);
  border-right-color: #b53000;
  border-bottom-color: #b53000;
  margin-bottom: 1vh;
  outline: none;
}

/*登录表单居中和宽度*/
.login {
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
  width: 80%;
  max-width: 400px;
}

/*表单样式*/
.form-body {
  border: 5px #ffd81e solid;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 0 5px #999;
  text-align: center;
}

/*输入框盒模型*/
.input-block {
  display: inline-block;
  width: 80%;
  margin-top: 5px;
  margin-bottom: 15px;
}

/*输入框样式*/
.form-control {
  text-align: left;
  min-height: 34px;
  padding: 6px 8px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 3px;
  margin-top: 5px;
  margin-bottom: 15px;
}

/*伪类*/
/*输入框focus*/
input:focus {
  box-shadow: 0 0 0 3px #e9ae76;
  border-color: #803a00;
}
</style>