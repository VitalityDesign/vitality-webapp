<script setup>
import logo from "@/assets/logo.svg";
import { reactive, ref } from "vue";
import http from "@/utils/request";
import router from "@/router";

const loginFormRef = ref(null);

const login = reactive({
  loginForm: {
    username: "",
    password: "",
    remember: false,
  },
});

const rules = reactive({
  username: [
    { required: true, message: "Please input user name", trigger: "blur" },
    { min: 3, max: 32, message: "Length 3-32", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
    {
      min: 6,
      max: 15,
      message: "Password number/letter/special character",
      trigger: "blur",
    }, // TODO: add accustomed rule
    { min: 8, max: 32, message: "Password 8 <= length <= 32", trigger: "blur" },
  ],
});

const loginError = reactive({
  message: "",
});

function onResponse(res) {
  switch (res.status) {
    default:
      loginError.message = res.statusText;
      break;
    case 401:
      loginError.message = res.data.message;
      break;
  }
}

function onRequest() {
  http
    .post("/login", login.loginForm)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("refresh_token", res.data.token);
        router.push({ name: "Home" });
      }
      onResponse(res);
    })
    .catch((err) => {
      if (!err.response) {
        loginError.message = err.message;
        return;
      }
      onResponse(err.response);
    });
}

const onSubmit = async (formRef) => {
  return new Promise((resolve, reject) => {
    formRef.validate((valid, fields) => {
      if (valid) {
        console.log("submit");
        resolve();
      } else {
        loginError.message = "Please check information";
        reject();
      }
    });
  })
    .then(() => {
      onRequest();
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="login">
    <el-row class="title_wrapper">
      <div class="title">
        <el-image :src="logo" class="logo" />
        <h1>Vitality.AI</h1>
      </div>
    </el-row>
    <div class="login-card">
      <el-form
        ref="loginFormRef"
        :model="login.loginForm"
        :rules="rules"
        class="loginForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="login.loginForm.username"
            placeholder="Name/Email/Phone"
            prefix-icon="User"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="login.loginForm.password"
            placeholder="Please input password"
            prefix-icon="Lock"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item
          prop="remember"
          class="form-item-switch"
          label="Remember Password"
        >
          <el-switch
            v-model="login.loginForm.remember"
            size="small"
          ></el-switch>
        </el-form-item>
        <el-form-item class="btn-ground" :error="loginError.message">
          <el-button type="primary" @click="onSubmit(loginFormRef)"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/basics.scss";

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #41b9a6;
  height: 100vh;
  width: 100vw;
  position: relative;
  padding-bottom: 100px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #2c3e50;
  flex-grow: 1;
  height: 100px;

  .el-image {
    height: 50px;
    width: 50px;
    margin-right: 20px;
  }

  h1 {
    font-size: 50px;
  }
}

.login-card {
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  opacity: 0.9;
  box-shadow: 0 0 20px #f2f2f2;
  border-radius: 5px;
  padding: 30px 30px 10px 30px;
  width: auto;

  .loginForm {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}

.login-card .el-form-item {
  justify-content: space-around;
  align-items: center;
}

.login-card .form-item-code {
  display: flex;
  flex-direction: row;

  .el-input {
    width: 50%;
    flex-grow: 1;
  }

  .code-image {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.login-card .form-item-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
