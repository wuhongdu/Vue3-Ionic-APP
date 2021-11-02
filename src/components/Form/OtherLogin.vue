<template>
  <div class="other-login">
    <div class="login-way">更多登录方式</div>
    <div class="login-way-icon">
      <ion-icon :icon="logoGithub" @click="handleGithubLogin"></ion-icon>
      <ion-icon :icon="logoWechat" @click="handleWeChatLogin"></ion-icon>
    </div>
  </div>
</template>
<script lang="ts">
import { IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { logoWechat, logoGithub } from 'ionicons/icons'; 
import { useNotification } from '@/composables/useNotification';
export default defineComponent({
  components: {
    IonIcon
  },
  setup() {
    const { notifiToast } = useNotification();
    const handleWeChatLogin = () => {
      notifiToast({color: 4, message: '暂时未开通此登录方式'});
    }
    const handleGithubLogin = () => {
      notifiToast({color: 4, message: '暂时未开通此登录方式'});
    }

    return {
      logoWechat,
      logoGithub,
      handleWeChatLogin,
      handleGithubLogin
    };
  }
})
</script>
<style scoped>
.other-login{
  width: 96%;
  height: 4rem;
}
.login-way{
  font-size: 12px;
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;  
  position: relative;
  margin-bottom: 0.5rem;
}
.login-way::before,
.login-way::after{
  content: '';
  width: 36%;
  height: 2px;
  background-color: #cccccc;
  position: absolute;
  border-radius: 1px;
}
.login-way::before{
  top: 0.5rem;
  left: 0;
}
.login-way::after{
  top: 0.5rem;
  right: 0;
}
.login-way-icon{
  width: 100%;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.login-way-icon>ion-icon{
  margin: 0 1rem;
}
/* .login-way-icon>ion-icon:first-child{
  color: #000000;
}
.login-way-icon>ion-icon:last-child{
  color: rgb(8, 171, 23);
} */
</style>