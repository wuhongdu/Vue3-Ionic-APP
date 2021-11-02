<template>
<ion-page>
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/index/home" :icon="chevronBackOutline"></ion-back-button>
        </ion-buttons>
        <ion-title>视频详情</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="video-play-container">
      <video controls="controls"></video>
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
  IonButtons,
  IonBackButton,
  IonTitle
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { chevronBackOutline } from 'ionicons/icons';
export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle
  },
  setup() {
    return {
      chevronBackOutline
    };
  }
})
</script>
<style scoped>
  ion-toolbar {
    --background: #ffffff;
    --border-color: #dadada;
    --color: #a3a3a3;
  }
  ion-title,
  ion-back-button,
  ion-button {
    color: #758ab6;
    font-size: 14px;
    font-weight: normal;
  }
  .video-play-container{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    color: #577774;
    box-sizing: border-box;
  }
  .video-play-container video {
    width: 100%;
  }
</style>