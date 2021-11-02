<template>
  <ion-page>
    <ion-content :fullscreen="true">    
      <div id="container">
        <div class="title-start">
          <h2>欢迎使用</h2>
        </div>
        <ion-item class="input-box" color="#ffffff">
          <ion-label position="stacked">请输入服务的地址和端口</ion-label>
          <ion-input v-model="url" placeholder="url:port"></ion-input>
        </ion-item>
        <div class="submit-btn">
          <ion-button size="primary" expand="block" @click="handleSubmit">确 定</ion-button>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
// import { useStorage } from '@/composables/useStorage';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonInput,
    IonItem,
    IonLabel
  },
  setup() {
    const url = ref("http://192.168.0.105:8089");
    const { push } = useRouter();
    // const { clear } = useStorage();

    // clear();

    const handleSubmit = async () => {
      //提交地址  存储地址
      localStorage.setItem('server', url.value);
      push({name: 'Login', params: {url: url.value}});
    }

    return {
      url,
      handleSubmit
    };
  }
});
</script>

<style scoped>
#container {
  background-color: grey;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  border: 1px solid grey;
}
.title-start{
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
h2{
  margin: 0;
}
.input-box{
  background-color: grey;
  width: 100%;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.submit-btn{
  width: 70%;
  margin-top: 2rem;
}
</style>