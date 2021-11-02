<template>
<ion-page>
  <ion-content>
    <div class="container">
      <div class="header-img"></div>
      <div class="form-box">
        <div class="top-change">
          <span :class="{active: isComponent}" @click="handleChangeLogin">登录</span>｜<span :class="{active: !isComponent}" @click="handleChangeRegister">注册</span>
        </div>
        <div class="form-visiable">
          <keep-alive>
            <component :is="currentComponent"></component>
          </keep-alive>
        </div>
      </div>
      <div class="footer-copy">{{ copy }} &copy; ajcmd.com @ amber</div>
    </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent, reactive, toRefs } from 'vue';
import LoginForm from '@/components/Form/loginForm.vue';
import RegisterForm from '@/components/Form/RegisterForm.vue';
export default defineComponent({
  components: {
    IonPage,
    IonContent,
    LoginForm,
    RegisterForm
  },
  setup() {
    const state = reactive({
      copy: `2019-2020 &copy; ajcmd.com @ amber`,
      isComponent: true,
      currentComponent: 'LoginForm'
    });

    const copyEnd = (new Date()).getFullYear();
    state.copy = `2019-${copyEnd}`;

    const handleChangeLogin = () => {
      state.isComponent = true;
      state.currentComponent = 'LoginForm';
    };

    const handleChangeRegister = () => {
      state.isComponent = false;
      state.currentComponent = 'RegisterForm';
    };

    return {
      ...toRefs(state),
      handleChangeLogin,
      handleChangeRegister
    };

  }
})
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    color: #577774;
    box-sizing: border-box;
    position: relative;
  }
  .header-img{
    background-image: url('../assets/02.jpg');
    background-color: rgba(80, 101, 235, 0.5);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 12rem;
  }
  .footer-copy{
    position: absolute;
    bottom: 5px;
    margin-bottom: 0.2rem;
    width: 100%;
    height: 1rem;
    text-align: center;
    font-size: 12px;
  }
  .form-box {
    width: 100%;
    height: 24rem;
    position: relative;
  }
  .top-change {
    width: 8rem;
    height: 2rem;
    background-color: #ffffff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: absolute;
    top: -32px;
    left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  .top-change>span{
    letter-spacing: 2px;
    font-weight: 600;
  }

  .top-change>span.active {
    color: #7384f0; /*rgb(115, 132, 240) */
    position: relative;
  }
  .top-change>span.active::after{
    content: '';
    width: 1rem;
    height: 2px;
    background-color: #7384f0;
    position: absolute;
    bottom: -4px;
    left: 5px;
    border-radius: 1px;
  }
  .top-change>span:first-child{
    margin-right: 4px;
  }
  .top-change>span:last-child{
    margin-left: 4px;
  }
</style>