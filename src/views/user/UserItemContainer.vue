<template>
<ion-page>
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/index/user" text="返回"></ion-back-button>
        </ion-buttons>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="box-container">
      <settings-page v-if="flag == 'setting'"></settings-page>
      <version-page v-else-if="flag == 'version'"></version-page>
      <notification-page v-else-if="flag == 'notification'"></notification-page>
    </div>
  </ion-content>
</ion-page>
</template>
<script lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import SettingsPage from '@/views/settings/index.vue';
import NotificationPage from '@/views/notification/index.vue';
import VersionPage from '@/views/versions/index.vue';
export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButtons,
    SettingsPage,
    NotificationPage,
    VersionPage
  },
  setup() {
    const route = useRoute();
    const { title, flag } = route.query;

    return {title,flag};
  }
})
</script>
<style scoped>
  .box-container{
    text-align: center;
    width: 100%;
    height: 92.4%;
    background-color: #ffffff;
    color: #577774;
  }
  ion-toolbar {
    --background: #ffffff;
    --border-color: #dadada;
    --color: #a3a3a3;
    text-align: center;
  }
  ion-title,
  ion-back-button,
  ion-button {
    color: #758ab6;
    font-size: 14px;
    font-weight: normal;
  }
  ion-title{
    letter-spacing: 8px;
  }
</style>