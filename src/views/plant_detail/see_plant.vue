<template>
<IonPage>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button :icon="returnDownBackOutline" default-href="/index/plant" text=""></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <IonContent :fullscreen="true">
    <div class="see_plant_container">

    </div>
  </IonContent>
</IonPage>
</template>
<script lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/vue';
import { returnDownBackOutline } from 'ionicons/icons';
export default {
  name: 'SeePlant',
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton
  },
  setup() {
    return {
      returnDownBackOutline
    };
  }
}
</script>
<style scoped>
  .see_plant_container{
    width: 100%;
    height: 100%;
    background-color: #f9fff2;
  }
  ion-back-button {
    --margin-start: 0.4em;
  }
  ion-toolbar {
    --background: #f9fff2;
  }
</style>