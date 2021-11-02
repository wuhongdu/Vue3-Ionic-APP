<template>
  <div class="list-item">
    <ion-icon v-if="Switch === 1" :icon="bulbOutline" :class="{'change': open}" ></ion-icon>
    <ion-icon v-else-if="Switch === 2" :icon="carSportOutline"></ion-icon>
    <ion-icon v-else-if="Switch === 3" :icon="videocamOutline"></ion-icon>
    <ion-text>{{ name }}</ion-text>
    <ion-icon :icon="online ? linkOutline : unlinkOutline" :class="{'online': online}"></ion-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonIcon, IonText } from '@ionic/vue';
import { bulbOutline, videocamOutline, carSportOutline, linkOutline, unlinkOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'DeviceList',
  components: {
    IonIcon,
    IonText
  },
  props: {
    Switch: Number,
    name: String,
    online: Boolean,
    open: Boolean
  },
  setup() {
    return {
      bulbOutline,
      videocamOutline,
      carSportOutline,
      linkOutline,
      unlinkOutline
    }
  }
});
</script>

<style scoped>
.list-item{
  width: 6rem;
  height: 2rem;
  border: 1px solid #5da5bb;
  border-radius: 0.5rem;
  margin: 1rem;
  background-color: #fdfdfd;
  box-shadow: 0 0 5px #aeecff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}
ion-icon{
  width: 1.5rem;
  height: 1.5rem;
  visibility: visible;
}
ion-icon.change{
  color: #ffe3af;
}
ion-text{
  font-size: 12px;
  letter-spacing: 2px;
  width: 80%;
  text-align: center;
}
ion-icon.online{
  color: #2dd36f;
}
</style>