<template>
  <div class="container">
    <div>欢迎注册</div>
    <div class="form-input">
      <div class="input-item">
        <ion-icon :icon="person"></ion-icon>
        <ion-input
          v-model="registerForm.email"
          type="text"
          placeholder="请输入邮箱"
          @ionBlur="handleVerifyEmail"
        ></ion-input>
      </div>
      <div class="input-item">
        <ion-icon :icon="lockClosed"></ion-icon>
        <ion-input
          v-model="registerForm.password"
          type="password"
          placeholder="请输入密码"
        ></ion-input>
      </div>
      <div class="input-item">
        <ion-icon :icon="lockClosed"></ion-icon>
        <ion-input
          v-model="verifyPassword"
          type="password"
          placeholder="请输入确认密码"
          @ionBlur="handleVerifyPassword"
        ></ion-input>
      </div>
      <div class="input-item">
        <ion-button expand="full" fill="clear" @click="handleSubmit"
          >立即注册</ion-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { IonInput, IonIcon, IonButton } from "@ionic/vue";
import { person, lockClosed } from "ionicons/icons";
import { defineComponent, reactive, toRefs } from "vue";
import { useNotification } from '@/composables/useNotification';
import { useStore } from '@/store';
export default defineComponent({
  components: {
    IonInput,
    IonIcon,
    IonButton,
  },
  setup() {
    const state = reactive({
      statusEmail: false,
      statusPass: false,
      registerForm: {
        email: "",
        password: "",
      },
      verifyPassword: "",
      inputStatus: false  // 没有错误时
    });
    const { notifiToast } = useNotification();
    const store = useStore();

    const handleVerifyEmail = () => {
      // 验证邮箱的正确性
      const reg = /^\w+@[0-9a-z]+\.[a-z]+$/;
      if (!reg.test(state.registerForm.email)) {
        notifiToast({color: 3, message: '邮箱格式错误，请重新输入'});
        state.registerForm.email = '';
        state.inputStatus = true;
        return false;
      }
      state.inputStatus = false;
      return true;
    };

    const handleVerifyPassword = () => {
      // 验证密码的正确性
      if (state.registerForm.password !== state.verifyPassword) {
        notifiToast({color: 3, message: '两次密码输入不一致，请检查后重新输入'});
        state.inputStatus = true;
        return false;
      }
      state.inputStatus = false;
      return true;
    };

    const handleSubmit = () => {
      // 提交注册表单数据
      if (state.inputStatus) {
        notifiToast({color: 3, message: '请检查输入内容是否存在空项'});
      } else {
        // 提交 登录
        store.dispatch('userModule/register', {email: state.registerForm.email, password: state.registerForm.password}).then(value => {
          if (value) {
            state.registerForm.email = '';
            state.registerForm.password = '';
            state.verifyPassword = '';
            notifiToast({color: 4, message: '点击 登录 去登录'});
          } else {
            notifiToast({color: 3, message: '用户注册失败'});
          }
        }).catch(error => {
          console.log(error);
        });
      }
    };

    return {
      ...toRefs(state),
      person,
      lockClosed,
      handleVerifyEmail,
      handleVerifyPassword,
      handleSubmit,
    };
  },
});
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #577774;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
}
.container > div:first-child {
  width: 100%;
  height: 1.5rem;
  font-size: 14px;
  padding-left: 1rem;
  letter-spacing: 2px;
  margin-top: 0.5rem;
}
.form-input {
  width: 100%;
  height: 14rem;
  margin-top: 1.6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}
.input-item {
  width: 90%;
  background-color: rgb(234, 236, 249);
  color: #7384f0;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding: 0 0.5rem 0 0.5rem;
  border-radius: 20px;
}
.input-item > ion-icon {
  font-size: 22px;
  margin-right: 0.5rem;
}
.input-item > ion-input {
  font-size: 14px;
}
.input-item:last-child {
  background-color: #7384f0;
  margin-top: 1rem;
}
.input-item > ion-button {
  width: 100%;
  height: 2rem;
  font-size: 0.8rem;
  color: #ffffff;
  letter-spacing: 2px;
}
</style>
