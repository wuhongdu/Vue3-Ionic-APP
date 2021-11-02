<template>
  <IonPage>
    <IonContent fullscreen>
      <div id="container-plant">
        <div class="plant-item-container" v-for="(item, index) in itemList" :key="index" :class="{Reverse: item.isrever}" @click="isReverse(index)">

          <div class="plant-item-front">

            <div class="recent-image">
              <img src="./../assets/strawberry.jpeg">
              <div class="present-video" @click.stop="toSeePlant">
                <IonIcon :icon="videocamOutline"></IonIcon>
              </div>
            </div>

            <div class="temperature-and-evaporate">
              <div class="present-temperature">
                <div>植物周围温度</div>
                <div class="show-temperature">
                  <span>{{ item.temperature }}</span>&#8451;
                </div>
              </div>
              <div class="water-evaporate">
                水分蒸发比 <span>{{ item.evaporateProportion }}</span>%
              </div>
            </div>

            <div class="present-illumination">
              <div class="title">光照强度</div>
              <div class="illumination-infor">
                <div class="sunny-icon">
                  <IonIcon v-if="item.lightIntensity === 1" :icon="sunny" style="color: #75613c;"></IonIcon>
                  <IonIcon v-if="item.lightIntensity === 2" :icon="sunny" style="color: #c79435;"></IonIcon>
                  <IonIcon v-if="item.lightIntensity === 3" :icon="sunny" style="color: orange;"></IonIcon>
                </div>
                <div class="sunny-status">
                  {{ item.lightIntensity === 1 ? '较弱' : ( item.lightIntensity === 2 ? '中度' : '较强')}}
                </div>
              </div>
            </div>

            <div class="present-humidity">
              <div class="title">土壤湿度</div>
              <div class="humidity-infor">
                土壤湿度详情
              </div>
            </div>

            <div class="present-water-level">
              <div class="title">浇灌存水液位</div>
              <div class="waterLevel-infor">
                水位线详情
              </div>
            </div>

          </div>

          <div class="plant-item-back">
            <div class="title">名称： <span>{{ item.plant }}</span></div>
            <div class="price">价格： <span>{{ item.price }}</span> RMB/KG</div>
            <div class="detail-arrow" @click.stop="toPlantDetail">
              <ion-icon :icon="barcode"></ion-icon>
            </div>
            <div class="stock">
              <div class="stock-number">当前存量： {{ item.stock === 0 ? '未知,请点击称重' : item.stock }} </div>
            </div>
            <div class="notifi">
              <div class="nitifi-title">通知</div>
            </div>
          </div>

        </div>
      </div>
    </IonContent>
  </IonPage>
</template>
<script lang="ts">
import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';
import { videocamOutline, sunny, barcode } from 'ionicons/icons';
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'Plant',
  components: {
    IonPage,
    IonContent,
    IonIcon
  },
  setup() {
    const state = reactive({
      itemList: [
        {
          temperature: 21,
          evaporateProportion: 34,
          humidity: 700,
          lightIntensity: 1,
          waterLevel: 2,
          isrever: false,
          price: 54,
          stock: 0,
          plant: '草莓',
        },
        {
          temperature: 21,
          evaporateProportion: 34,
          humidity: 700,
          lightIntensity: 3,
          waterLevel: 2,
          isrever: false,
          price: 1.2,
          stock: 0,
          plant: '小白菜',
        }
      ],
      currentItem: 0,
    });
    const router = useRouter();
    const isReverse = (index: number) => {
      state.itemList[index].isrever = !state.itemList[index].isrever;
    }
    const toSeePlant = () => {
      router.push({ path: '/see_plant'});
    }
    const toPlantDetail = () => {
      router.push({ path: '/plant_detail'});
    }
    return {
      videocamOutline,
      sunny,
      barcode,
      ...toRefs(state),
      isReverse,
      toSeePlant,
      toPlantDetail
    };
  }
}
</script>
<style scoped>
  #container-plant {
    width: 100%;
    height: 100%;
    background-color: #f9fff2;
    color: #577774;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
  }
  #container-plant .plant-item-container {
    position: relative;
    transition: all 3s;
    transform-style: preserve-3d;
    width: 19.5em;
    height: 11em;
    margin-top: 0.8em;
  }
  #container-plant .plant-item-container.Reverse{
    transform: rotateY(180deg);
  }
  #container-plant .plant-item-container .plant-item-front,
  #container-plant .plant-item-container .plant-item-back{
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  #container-plant .plant-item-front {
    width: 100%;
    height: 100%;
    background-color: rgb(92, 194, 194);
    border: 1px solid rgba(92, 194, 194, 0.5);
    border-radius: 0.5em;
    padding: 0.2em;
    font-size: 0.5em;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-content: space-around;
  }
  #container-plant .plant-item-front>div:not(:nth-child(2)) {
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
  }
  #container-plant .plant-item-front>div:not(:first-child) {
    padding: 0.2em;
  }
  #container-plant .plant-item-front .recent-image{
    width: 16em;
    height: 11em;
    position: relative;
  }
  #container-plant .plant-item-front .recent-image img{
    width: 100%;
    height: 100%;
    border-radius: 0.5em;
  }
  #container-plant .plant-item-front .recent-image .present-video {
    position: absolute;
    right: 0.1em;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    color: orange;
  }
  #container-plant .plant-item-front .temperature-and-evaporate {
    width: 16em;
    height: 11em;
  }
  #container-plant .present-temperature{
    width: 16em;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
  }
  #container-plant .water-evaporate {
    width: 16em;
    height: 3em;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 5px;
    margin-top: 1.3em;
    display: flex;
    align-items: center;
    padding: 0.4em;
  }
  #container-plant .water-evaporate>span{
    margin: 0 0.8em;
    color: orange;
  }
  #container-plant .present-temperature>div{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #container-plant .present-temperature>.show-temperature {
    height: 4em;
    align-items: center;
  }
  #container-plant .present-temperature>.show-temperature>span{
    font-size: 2em;
    color: orange;
    margin-right: 0.5em;
  }
  #container-plant .present-illumination,
  #container-plant .present-humidity,
  #container-plant .present-water-level{
    width: 10.5em;
    height: 7em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  #container-plant .present-illumination>.title,
  #container-plant .present-humidity>.title,
  #container-plant .present-water-level>.title{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #container-plant .present-illumination .illumination-infor{
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  #container-plant .present-illumination .sunny-icon{
    font-size: 3em;
    margin-right: 0.5em;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  #container-plant .plant-item-container .plant-item-back{
    width: 100%;
    height: 100%;
    background-color: rgb(73, 143, 175);
    border: 1px solid rgba(73, 143, 175, 0.5);
    border-radius: 0.5em;
    padding: 0.2em;
    font-size: 0.5em;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-content: space-around;
    transform: rotateY(180deg);
    color: #9afff5;
  }
  #container-plant .plant-item-container .plant-item-back>div{
    border: 1px solid #ececec;
    border-radius: 5px;
    padding: 2px;
  }
  #container-plant .plant-item-back .title{
    width: 12em;
    height: 3em;
    border: 1px solid #ececec;
    border-radius: 5px;
    padding: 2px;
    display: flex;
    align-items: center;
  }
  #container-plant .plant-item-back .price{
    width: 16em;
    height: 3em;
    border: 1px solid #ececec;
    border-radius: 5px;
    padding: 2px;
    display: flex;
    align-items: center;
  }
  #container-plant .plant-item-back .price span{
    color: orange;
  }
  #container-plant .plant-item-back .detail-arrow{
    width: 4em;
    height: 3em;
    border: 1px solid #ececec;
    border-radius: 5px;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  #container-plant .plant-item-back .stock{
    width: 24.5em;
    height: 15em;
  }
  #container-plant .plant-item-back .notifi{
    width: 8em;
  }
</style>