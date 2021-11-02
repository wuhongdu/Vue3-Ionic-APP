<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/index/home">
          <ion-icon :icon="home"></ion-icon>
          <ion-label>首页</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="plant" href="/index/plant">
          <ion-icon :icon="leaf"></ion-icon>
          <ion-label>智能种植</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="user" href="/index/user">
          <ion-icon :icon="person"></ion-icon>
          <ion-label>我的</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/vue';
import { home, person, leaf } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Layout',
  components: {
    IonPage,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
  },
  setup() {

    return {
      home,
      person,
      leaf
    }
  }
})
</script>
<style scoped>
.container{
  width: 100%;
  height: 32.5rem;
}
ion-tab-bar{
  border: 1px solid #e4e4e4;
}
ion-tab-button {
  background-color: #fff !important;
  text-align: center;
}
ion-tab-button>ion-icon{
  font-size: 20px;
}
ion-tab-button>ion-label{
  font-size: 12px;
  transform: scale(.8);
}
</style>