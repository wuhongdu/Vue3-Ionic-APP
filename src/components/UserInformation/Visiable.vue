<template>
  <div class="user-edit">
    <ion-list>
      <ion-item lines="full">
        <ion-label>头像</ion-label>
        <ion-avatar>
          <img :src="userInfor.avatar ? userInfor.avatar : 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'">
        </ion-avatar>
      </ion-item>
      <ion-item lines="full">
        <ion-label>昵称</ion-label>
        <ion-text>{{userInfor.userName}}</ion-text>
      </ion-item>
      <ion-item lines="full">
        <ion-label>账号</ion-label>
        <ion-text>{{userInfor.userId}}</ion-text>
      </ion-item>
      <ion-item lines="full">
        <ion-label>邮箱</ion-label>
        <ion-text>{{userInfor.email}}</ion-text>
      </ion-item>
      <ion-item lines="full">
        <ion-label>电话</ion-label>
        <ion-text>{{userInfor.tell}}</ion-text>
      </ion-item>
      <ion-item lines="full">
        <ion-label>GitHub</ion-label>
        <ion-text @click="persentAlert(userInfor.github)">{{userInfor.github}}</ion-text>
      </ion-item>
      <ion-item lines="full">
        <ion-label>省份</ion-label>
        <ion-text>{{userInfor.province}}</ion-text>
      </ion-item>
    </ion-list>
  </div>
</template>
<script lang="ts">
import { IonList, IonItem, IonLabel, IonAvatar, IonText, alertController } from '@ionic/vue';
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  name: 'Edit',
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonText
  },
  props: {
    information: Object
  },
  setup(props) {
    const state = reactive({
      userInfor: props.information
    });
    const persentAlert = async (message: string) => {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: '详情',
          message: message,
          buttons: ['OK'],
        });
      return alert.present();
    }

    return {
      ...toRefs(state),
      persentAlert
    };
  }
})
</script>
<style scoped>
  .user-edit{
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  ion-list{
    width: 100%;
  }
  ion-item{
    --background: #fff;
    --color: #577774;
    --border-color: #e0e0e0;
    --mini-height: 1rem;
    --padding-start: 0.8rem;
  }
  ion-label{
    font-size: 14px !important;
    margin: 0;
    margin-right: 0.5rem;
  }
  ion-text{
    font-size: 14px;
    overflow: hidden;
    max-width: 15rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>