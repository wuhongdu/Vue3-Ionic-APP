<template>
  <div class="weather-container">
    <div class="weather-status">
      <ion-icon :icon="cloudyOutline"></ion-icon>
      <ion-text>阴</ion-text>
    </div>
    <div class="weather-temperature">18 &#8451;</div>
    <div class="weather-city">城市</div>
  </div>
</template>
<script lang="ts">
import { IonIcon, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  cloudyOutline,
  cloudyNightOutline,
  rainyOutline,
  thunderstormOutline,
  sunnyOutline,
  partlySunnyOutline
} from 'ionicons/icons';
export default defineComponent({
  components: {
    IonIcon,
    IonText
  },
  setup() {

    return {
      cloudyOutline,
      cloudyNightOutline,
      rainyOutline,
      thunderstormOutline,
      sunnyOutline,
      partlySunnyOutline
    };
  }
});
</script>
<style scoped>
.weather-container{
  width: 86%;
  height: 6rem;
  margin-top: 1.6rem;
  border: 1px solid #4ccabe85;
  border-radius: 0.5rem;
  padding: 5px;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-content: space-between;
}
</style>