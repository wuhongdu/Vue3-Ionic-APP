<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :icon="returnDownBackOutline" default-href="/index/plant" text=""></ion-back-button>
        </ion-buttons>
        <ion-title>种植详情</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">    
      <div class="container">
        <ion-list>
          <ion-item>
            植物名 {{ plantDetails.name }}
          </ion-item>
          <ion-item>
            种植时间 {{ formatTimer(plantDetails.sowDate) }}
          </ion-item>
          <ion-item>
            种植日志
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonList,
  IonItem
  } from '@ionic/vue';
import { returnDownBackOutline } from 'ionicons/icons';
import { defineComponent, reactive, toRefs } from 'vue';
import { formatDate } from '@/utils/timeUtil';

export default defineComponent({
  name: 'PlantDetail',
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonList,
    IonItem
  },
  setup() {
    const state = reactive({
      plantDetails: {
        plantId: '1292834932849fs8fy84r2-ad883e823-adhjaew-234743892',
        name: '草莓',
        sowDate: 1616305876586,
      }
    });
    const formatTimer = (time: string) => {
      return formatDate('yyyy-MM-dd hh:mm:ss', new Date(time));
    }
    return {
      ...toRefs(state),
      returnDownBackOutline,
      formatTimer
    };
  }
});
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 90em;
  background-color: rgba(100, 148, 237, 0.2);
}
ion-back-button {
  --margin-start: 0.4em;
}
ion-title {
  background-color: rgba(100, 148, 237, 0.2);
}
</style>