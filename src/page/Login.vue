<template>
  <div class="login-wrap">
    <el-form
      :model="loginForm"
      status-icon
      label-width="40px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginFn" :loading="loginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import router from "@/router";
export default defineComponent({
  setup() {
    const store = useStore();

    let loginLoading = ref(false);

    const loginForm = reactive({
      username: "",
      password: "",
    });

    async function loginFn() {
      const { username, password } = loginForm;
      if (!username || !password) {
        ElMessage.error("请输入账号密码！");
        return;
      }
      loginLoading.value = true;
      const { flag, data } = await store.dispatch("login", loginForm);
      loginLoading.value = false;
      if (flag) {
        const {
          token
        } = data
        ElMessage.success("登录成功");
        // localStorage.setItem('token', token)
        router.replace({
          name: 'home'
        })
      }
    }

    return {
      loginForm,
      loginFn,
      loginLoading,
    };
  },
});
</script>

<style lang="less" scoped>
.login-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 25px 20px 0;
  border-radius: 5px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
  // background-image: linear-gradient(-90deg, #ff9569 0%, #e92758 100%);
}
</style>
