<template>
  <div class="setting-container">
    <ion-list>
      <ion-item lines="full">
        <ion-label>流量统计</ion-label>
      </ion-item>
      <ion-item lines="full">
        <ion-label>新消息提醒</ion-label>
        <ion-toggle color="success"></ion-toggle>
      </ion-item>
      <ion-item lines="full" @click="presentAlertPrompt()">
        <ion-label>请求地址设置</ion-label>
        <ion-icon :icon="chevronForwardOutline"></ion-icon>
      </ion-item>
    </ion-list>
    <div class="logout-btn">
      <ion-button fill="outline" size="small" @click="handleLogout">退出登录</ion-button>
    </div>
  </div>
</template>
<script lang="ts">
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonToggle,
  IonButton,
  alertController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { chevronForwardOutline } from 'ionicons/icons';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonToggle,
    IonButton
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const presentAlertPrompt = async () => {
      const value = localStorage.getItem('server');
      const alert = await alertController.create({
        cssClass: 'my-alert-style',
        header: '服务器地址设置',
        inputs: [
          {
            name: 'server',
            type: 'url',
            value: value ? value : '',
            placeholder: 'Please set the server address. Eg: url:port'
          }
        ],
        buttons: [
          {
            text: '确定',
            handler: (event) => {
              localStorage.setItem('server', event.server);
            }
          },
          {
            text: '取消',
            role: 'cancel'
          }
        ]
      });

      return alert.present();
    }

    const handleLogout = async () => {
      store.dispatch('userModule/logout').then(value => {
        if (value) {
          sessionStorage.removeItem('iot_token');
          router.push({path: '/login', replace: true});
        }
      })
    }

    return {
      chevronForwardOutline,
      presentAlertPrompt,
      handleLogout
    };
  }
})
</script>
<style scoped>
*{
  font-size: 14px;
}
.setting-container{
  width: 100%;
  height: 32.5rem;
  background-color: #ffffff;
  color: #577774;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: space-between;
}
ion-list{
  width: 100%;
  background-color: #fff;
}
ion-item{
  --background: #fff;
  --color: #577774;
  --min-height: 1.6rem;
  --padding-start: 0;
  --padding-end: 0.8rem;
  --border-color: #cecece;
}
ion-item>ion-label{
  font-size: 16px;
  transform: scale(.9);
}
.logout-btn{
  width: 100%;
  height: 4rem;
}
ion-button{
  letter-spacing: 5px;
  --padding-start: 5rem;
  --padding-end: 5rem;
  --padding-top: 0.2rem;
  --padding-bottom: 0.2rem;
  --border-radius: 0.5rem;
  --color: #eb445a;
}
ion-toggle{
  width: 2.5rem;
  height: 1rem;
  --handle-width: 1rem;
  --background: #c9c9c9;
}
</style>