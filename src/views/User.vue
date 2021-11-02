<template>
<ion-page>
  <ion-content :fullscreen="true">
    <div id="container">
      <div class="header-box">
        <div class="avatar-box">
          <ion-avatar>
            <ion-icon :icon="personCircleOutline"></ion-icon>
          </ion-avatar>
        </div>
        <div class="avatar-right">
          <div @click="handleJumpToLogin">
            <span>{{ user ? user.email : '登录' }}</span>
          </div>
          <div @click="handleJumpToUserDetail('21313-23424-1432423423')">
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </div>
        </div>
      </div>
      <div class="list-box">
        <ion-list>
          <ion-item v-for="(item, index) in lists" :key="index" lines="full" @click="handleJumpPublic(item.title, item.flag)">
            <ion-icon :icon="item.icon"></ion-icon>
            <ion-label>{{item.title}}</ion-label>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </ion-item>
        </ion-list>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonAvatar, IonLabel, IonIcon, IonList, IonItem } from "@ionic/vue";
import { defineComponent, reactive, toRefs, watch } from "vue";
import { chevronForwardOutline, personCircleOutline, settingsOutline, linkOutline, notificationsOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import { useStore } from '@/store';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonAvatar,
    IonLabel,
    IonIcon,
    IonList,
    IonItem,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      lists: [
        {
          title: '通知',
          icon: notificationsOutline,
          flag: 'notification'
        },
        {
          title: '版本',
          icon: linkOutline,
          flag: 'version'
        },{
          title: '设置',
          icon: settingsOutline,
          flag: 'setting'
        }
      ],
      user: {}
    });
    
    if (Object.keys(store.state.userModule.infor).length <= 0) {
      store.dispatch('userModule/setUser');
    }
    state.user = store.state.userModule.infor;

    watch(() => store.state.userModule.infor, (count) => {
      state.user = count;
    });
    

    const handleJumpToLogin = () => {
      sessionStorage.removeItem('iot_token');
      router.push({ name: "Login", params: { islogin: '1'} });
    };
    const handleJumpToUserDetail = (userId: string) => {
      router.push({ name: "UserDetail", params: { userId: userId } });
    };
    const handleJumpPublic = (title: string, flag: string) => {
      router.push({ path: '/user_item_container', query: {title: title, flag: flag}});
    }

    return {
      ...toRefs(state),
      chevronForwardOutline,
      handleJumpToLogin,
      handleJumpToUserDetail,
      handleJumpPublic,
      personCircleOutline,
      settingsOutline,
      linkOutline,
      notificationsOutline
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #577774;
}
.header-box {
  background-color: #00ebfc;
  height: 6rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #000;
}
.avatar-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-box > ion-avatar {
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: #7384f0;
}
.avatar-right {
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.avatar-right > div {
  margin-right: 0.5rem;
}
.avatar-right > ion-label {
  margin-left: 0.5rem;
}
.avatar-right > div:first-child {
  font-size: 14px !important;
  letter-spacing: 2px;
}
.avatar-right ion-icon{
  color: #777777;
}
.list-box ion-item {
  --min-height: 2rem;
  --padding-start: 0.8rem;
  --padding-end: 0.8rem;
  --background: #fff;
  --color: #577774;
  --border-color: #cecece;
}
.list-box ion-label{
  font-size: 14px;
  margin: 0.2rem 0;
  letter-spacing: 6px;
}
ion-item>ion-icon{
  font-size: 14px;
  margin-right: 0.5rem;
  color: #777777;
}
</style>