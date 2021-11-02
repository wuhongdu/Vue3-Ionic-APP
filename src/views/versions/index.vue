<template>
  <div class="version-container">
    <div class="display-icon">
      <ion-icon :icon="hardwareChipOutline"></ion-icon>
    </div>
    <div class="version-number">版本 <ion-text>{{$store.state.version}}</ion-text></div>
    <div class="update-date">更新时间: <ion-text>{{$store.state.updates}}</ion-text> </div>
    <div class="version-item">
      <ion-list>
        <ion-item lines="full">
          <ion-label>检查更行</ion-label>
        </ion-item>
        <ion-item lines="full" @click="handleOpenVersionState(true)">
          <ion-label>版本说明</ion-label>
        </ion-item>
      </ion-list>
    </div>
    <ion-modal :is-open="isOpenModal" css-class="my-custom-class">
      <version-state :openVersionState="handleOpenVersionState"></version-state>
    </ion-modal>
  </div>
</template>
<script lang="ts">
import { IonIcon, IonList, IonItem, IonLabel, IonText, IonModal } from '@ionic/vue';
import { defineComponent, reactive, ref } from 'vue';
import { hardwareChipOutline } from 'ionicons/icons';
import VersionState from '@/views/versions/versionState.vue';
export default defineComponent({
  components: {
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonModal,
    VersionState
  },
  setup() {
    const state = reactive({
      version: '0.0.1',
      update: '2020-12-03'
    });

    const isOpenModal = ref(false);

    const handleOpenVersionState = (value: boolean) => {
      // model
      isOpenModal.value = value;
    }

    return {
      ...state,
      isOpenModal,
      hardwareChipOutline,
      handleOpenVersionState
    };
  }
})
</script>
<style scoped>
  .version-container{
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    color: #577774;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .display-icon{
    width: 100%;
    height: 6rem;
    font-size: 5rem;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .version-number,
  .update-date{
    width: 100%;
    height: 1rem;
    font-size: 12px;
    margin: 0.1rem 0;
  }
  .version-item{
    width: 100%;
    height: 10rem;
    margin-top: 6rem;
  }
  .version-item ion-item{
    text-align: center;
    --background: #fff;
    --color: #577774;
    --border-width: 0;
  }
  .version-item ion-label{
    font-size: 14px;
    border: 1px solid #577774;
    padding: 0.5rem 2rem;
    border-radius: 16px;
  }
  .version-item ion-label:hover{
    cursor: pointer;
  }
</style>