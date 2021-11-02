<template>
<div class="version-state-container">
  <ion-header>
    <ion-toolbar>
      <ion-title>版本说明</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="openVersionState(false)">关闭</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div class="version-state">
      <div class="version-header">版本说明 <ion-text>{{$store.state.version}}</ion-text> </div>
      <div class="version-context">
        <p>0.0.2 版本能够使用基本的添加设备等功能。</p>
        <p>最终版权 归 &copy; ajcmd.cn 拥有者所有。</p>
      </div>
    </div>
  </ion-content>
</div>
</template>
<script lang="ts">
import {
  IonHeader, 
  IonToolbar, 
  IonContent, 
  IonTitle,
  IonButtons,
  IonButton,
  IonText
} from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    IonHeader, 
    IonToolbar, 
    IonContent, 
    IonTitle,
    IonButtons,
    IonButton,
    IonText
  },
  props: {
    openVersionState: Function
  }
})
</script>
<style scoped>
*{
  font-size: 14px;
}
.version-state-container{
  width: 100%;
  height: 100%;
}
ion-toolbar{
  --background: #ffffff;
  --color: #577774;
  --border-color: #cecece;
}
ion-title{
  font-size: 16px;
}
ion-button{
  --color: #577774;
  font-size: 14px;
}
.version-state{
  text-align: center;
  width: 100%;
  height: 91.2%;
  background-color: #ffffff;
  color: #577774;
  padding: 2px 1.5rem;
  position: relative;
}
.version-header{
  text-align: start;
  font-size: 14px;
  font-weight: 600;
}
.version-context{
  text-align: start;
}
.version-context>p:last-child {
  position: absolute;
  bottom: 0;
  text-align: center;
  font-size: 12px;
  width: 312px;
}
</style>

