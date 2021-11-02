<template>
  <div class="container">
    <div>欢迎使用</div>
    <div class="form-input">
      <div class="input-item">
        <ion-icon :icon="person"></ion-icon>
        <ion-input
          v-model="loginForm.email"
          type="text"
          placeholder="请输入您的用户邮箱"
        ></ion-input>
      </div>
      <div class="input-item">
        <ion-icon :icon="lockClosed"></ion-icon>
        <ion-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入您的登录密码"
        ></ion-input>
      </div>
      <div class="input-item">
        <ion-button expand="full" fill="clear" @click="handleSubmitLogin">立即登录</ion-button>
      </div>
    </div>
    <other-login />
  </div>
</template>
<script lang="ts">
import { IonIcon, IonInput, IonButton } from "@ionic/vue";
import { defineComponent, reactive, toRefs } from "vue";
import { person, lockClosed, logoWechat, logoGithub } from "ionicons/icons";
import OtherLogin from "@/components/Form/OtherLogin.vue";
import { useRouter } from "vue-router";
import { useStore } from '@/store';
import { useNotification } from '@/composables/useNotification';
export default defineComponent({
  components: {
    IonIcon,
    IonInput,
    IonButton,
    OtherLogin,
  },
  setup() {
    const state = reactive({
      loginForm: {
        email: "1778618683@qq.com",
        password: "amber798",
      }
    });
    const router = useRouter();
    const store = useStore();
    const { notifiToast } = useNotification();

    const handleSubmitLogin = () => {
      store.dispatch('userModule/login', {email: state.loginForm.email, password: state.loginForm.password}).then(value => {
        if (value) {
          router.push({ path: '/index/home' });
        } else {
          notifiToast({color: 3, message: '登录失败'});
        }
      }).catch((error) => {
        notifiToast({color: 3, message: error});
      });
    };

    return {
      ...toRefs(state),
      person,
      lockClosed,
      logoWechat,
      logoGithub,
      handleSubmitLogin,
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
