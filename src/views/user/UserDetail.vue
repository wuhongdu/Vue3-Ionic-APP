<template>
<ion-page>
  <ion-content>
    <div class="container">
      <ion-header>
        <ion-toolbar color="dark">
          <ion-buttons slot="start">
            <ion-back-button default-href="/index/user" text="返回"></ion-back-button>
          </ion-buttons>
          <ion-title>用户详情</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="handleEdit">
              <ion-icon :icon="createOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <div class="user-detail">
        <edit-page v-show="isEdit" :information="infor" @changeStatus="handleEdit"></edit-page>
        <visiable-page v-show="!isEdit" :information="infor"></visiable-page>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import {
  IonContent, 
  IonPage, 
  IonButtons, 
  IonBackButton, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonIcon, 
  IonButton
} from '@ionic/vue';
import { createOutline } from 'ionicons/icons';
import { defineComponent, reactive, toRefs, watch } from 'vue';
import EditPage from '@/components/UserInformation/Edit.vue';
import VisiablePage from '@/components/UserInformation/Visiable.vue';
import { useStore } from '@/store';
export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButton,
    EditPage,
    VisiablePage
  },
  setup() {
    const store = useStore();
    const state = reactive({
      isEdit: false,
      infor: {}
    });

    state.infor = store.state.userModule.infor;

    watch(() => store.state.userModule.infor, (count) => {
      state.infor = count;
    });

    const handleEdit = () => {
      state.isEdit = !state.isEdit;
    };

    return {
      ...toRefs(state),
      createOutline,
      handleEdit
    };
  }
})
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    color: #577774;
    box-sizing: border-box;
  }
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
</style>
