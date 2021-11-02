<template>
  <div class="user-edit">
    <ion-list>
      <ion-item lines="full">
        <ion-label>头像</ion-label>
        <ion-avatar @click="handleChangeAvatar">
          <img :src="userInfor.avatar ? userInfor.avatar : 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'">
        </ion-avatar>
      </ion-item>
      <ion-item lines="full">
        <ion-label>昵称</ion-label>
        <ion-input v-model="userInfor.userName" type="text"></ion-input>
      </ion-item>
      <ion-item lines="full">
        <ion-label>账号</ion-label>
        <ion-input v-model="userInfor.userId" type="text" disabled></ion-input>
      </ion-item>
      <ion-item lines="full">
        <ion-label>邮箱</ion-label>
        <ion-input v-model="userInfor.email" type="email" disabled></ion-input>
      </ion-item>
      <ion-item lines="full">
        <ion-label>电话</ion-label>
        <ion-input v-model="userInfor.tell" type="tell"></ion-input>
      </ion-item>
      <ion-item lines="full">
        <ion-label>GitHub</ion-label>
        <ion-input v-model="userInfor.github" type="text"></ion-input>
      </ion-item>
      <ion-item lines="full">
        <ion-label>省份</ion-label>
        <ion-select :value="userInfor.province" cancel-text="取消" ok-text="确定" @ionChange="handleSelectChange">
          <ion-select-option value="四川">四川</ion-select-option>
          <ion-select-option value="重庆">重庆</ion-select-option>
          <ion-select-option value="北京">北京</ion-select-option>
          <ion-select-option value="上海">上海</ion-select-option>
          <ion-select-option value="天津">天津</ion-select-option>
          <ion-select-option value="吉林">吉林</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-button size="small" @click="handleChangeInfor">确认修改</ion-button>
  </div>
</template>
<script lang="ts">
import { IonList, IonItem, IonInput, IonLabel, IonSelect, IonSelectOption, IonButton, IonAvatar } from '@ionic/vue';
import { defineComponent, reactive, toRefs,  } from 'vue';
import { useStore } from '@/store';
import { useNotification } from '@/composables/useNotification';
export default defineComponent({
  name: 'Edit',
  components: {
    IonList,
    IonItem,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonAvatar
  },
  props: {
    information: Object
  },
  emits: ['changeStatus'],
  setup(props, context) {
    const store = useStore();
    const { notifiToast } = useNotification();
    const state = reactive({
      userInfor: props.information ? props.information : {}
    });
    const handleSelectChange = async (event: any) => {
      if (Object.keys(state.userInfor).length > 0) {
        state.userInfor.province = event.detail.value;
      }
    }
    const handleChangeAvatar = async () => { 
      // 打开原生文件接口 选取图片
      // alert('更换头像');
    }
    const handleChangeInfor = async () => {
      store.dispatch('userModule/changeInfor', state.userInfor).then(value => {
        if (value) {
          notifiToast({color: 0, message: '修改用户信息成功'});
        } else {
          notifiToast({color: 3, message: '修改用户信息失败'});
        }
        context.emit('changeStatus');
      }).catch(() => {
        notifiToast({color: 3, message: '修改用户信息失败'});
      });
    }

    return {
      ...toRefs(state),
      handleChangeAvatar,
      handleChangeInfor,
      handleSelectChange
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
  ion-button{
    margin-top: 4rem;
    --padding-start: 4rem;
    --padding-end: 4rem;
    --padding-top: 1rem;
    --padding-bottom: 1rem;
  }
  ion-input{
    font-size: 14px;
    text-align: end;
  }
  ion-select{
    font-size: 14px;
  }
  ion-text{
    font-size: 14px;
    max-width: 15rem;
  }
</style>