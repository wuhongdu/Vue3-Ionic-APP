<template>
  <ion-page>
    <ion-content :fullscreen="true">    
      <div id="container">
        <video v-show="eyeOpenStatus" class="video-box" muted loop autoplay></video>
        <div class="map-box" id="map-box">
          显 示 地 图
        </div>
        <div class="control-over">
          <div class="back-btn">
            <ion-buttons>
              <ion-back-button default-href="/index/home" :icon="chevronBackOutline"></ion-back-button>
            </ion-buttons>
          </div>
          <div class="control-box">
            <div class="control-btn"
              @touchmove="handleTouchmove"
              @touchend="handleTouchend"
              :style="{top: top+'px', left: left+'px'}"/>
          </div>
          <div class="switch-visible">
            <div class="icon-box">
              <ion-icon :icon="eyeOpenStatus ? eyeOutline : eyeOffOutline" @click="handleOpenEye"></ion-icon>
            </div>
            <div class="icon-box">
              <ion-icon :icon="navigateOutline" @click="handleOpenMap"></ion-icon>
            </div>
          </div>
          <div class="speed-display">
            速度:<span>{{ speed }}</span>m/min
          </div>
          <div class="power-display" v-show="charging">
            <ion-icon :icon="batteryChargingOutline"></ion-icon>
            <span>{{ power }} %</span>
          </div>
          <div class="power-display" v-show="!charging">
            <ion-icon v-if="power == 100" :icon="batteryFullOutline"></ion-icon>
            <ion-icon v-else-if="power > 10 && power < 100" :icon="batteryHalfOutline"></ion-icon>
            <ion-icon v-else-if="power >= 10" class="danger" :icon="batteryDeadOutline"></ion-icon>
            <span>{{ power }} %</span>
          </div>

          <div class="speed-control">
            <ion-range min="0" max="100" step="0" @ionChange="handleSpeedChange"></ion-range>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonRange
} from '@ionic/vue';
import { defineComponent, reactive, toRefs } from 'vue';
import { 
  chevronBackOutline, 
  eyeOffOutline, 
  eyeOutline, 
  navigateOutline, 
  batteryChargingOutline, 
  batteryDeadOutline, 
  batteryFullOutline, 
  batteryHalfOutline 
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent ({
  components: {
    IonContent,
    IonPage,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonRange
  },
  setup() {
    const position = reactive({
      top: 43,
      left: 43
    });

    const status = reactive({
      eyeOpenStatus: true,
      mapOpenStatus: true,
      speed: 10,
      power: 40,
      charging: false
    });

    const handleOpenEye = () => {
      status.eyeOpenStatus = !status.eyeOpenStatus;
    }

    const handleOpenMap = () => {
      status.mapOpenStatus = !status.mapOpenStatus;
    }

    const getAngle = (point1: any, point2: any) => {
			const dot = point1.x * point2.x + point1.y * point2.y;
			const det = point1.x * point2.y - point1.y * point2.x;
			const angle = Math.atan2(det, dot) / Math.PI * 180;
			return Math.round(angle + 360) % 360;
    }
    
    const newPosition = (point: any) => {
      const R = 43, Rpow = Math.pow(R,2);
      let tempx = null, tempy = null;

      tempx = point.x - 43;
      tempy = point.y - 43;

      const tempRpow = Math.pow(tempx,2) + Math.pow(tempy,2);
      if (tempRpow > Rpow) {
        let angle = null, anglePi = null, angleVal = null,
        tempT = null, tempL = null;
        angle = getAngle({x: tempx,y: tempy},{x: 43, y: 0});
        anglePi = angle/360* 2 * Math.PI;
        angleVal = Math.abs(Math.cos(anglePi));
        tempL = 43 * angleVal;
        tempT = Math.sqrt(Rpow-Math.pow(tempL,2));

        if ( angle > 0 && angle < 90 ) {
          tempT = 43 - tempT ;
          tempL = tempL + 43 ;
        } else if ( angle > 90 && angle < 180) {
          tempT = 43 - tempT ;
          tempL = 43 - tempL ;
        } else if ( angle > 180 && angle < 270) {
          tempT = 43 + tempT ;
          tempL = 43 - tempL ;
        } else if ( angle > 270 && angle < 360 ) {
          tempT = 43 + tempT ;
          tempL = 43 + tempL ;
        }

        return {
          x: Math.ceil(tempL),
          y: Math.ceil(tempT)
        };
      } else {
        return point;
      }

    }

    const handleTouchmove = (event: any) => {
      let left = event.touches[0].clientX - 32 - 16 - 5;
      let top = event.touches[0].clientY - 160 - 16 - 5;

      if (top < 0 ) {
        top = 0;
      }else if(top > 86) {
        top = 86;
      }

      if (left < 0 ) {
        left = 0;
      }else if( left > 86 ) {
        left = 86;
      }

      const newposition = newPosition({x: left, y: top});

      position.top = parseInt(newposition.y);
      position.left = parseInt(newposition.x);
    }

    const handleTouchend = () => {
      position.top = 43;
      position.left = 43;
    }

    const handleSpeedChange = async (event: any) => {
      status.speed = Math.ceil(event.detail.value);
    }

    return {
      chevronBackOutline,
      handleTouchmove,
      handleTouchend,
      handleSpeedChange,
      ...toRefs(position),
      ...toRefs(status),
      eyeOffOutline,
      eyeOutline,
      handleOpenEye,
      handleOpenMap,
      navigateOutline,
      batteryChargingOutline, 
      batteryDeadOutline, 
      batteryFullOutline, 
      batteryHalfOutline
    };
  }
});
</script>
<style scoped>
#container {
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #577774;
  box-sizing: border-box;
  position: relative;
}
.video-box{
  width: 100%;
  height: 100%;
  z-index: -1;
  /* display: none; */
}
.map-box{
  width: 100%;
  height: 100%;
  z-index: -1;
  display: none;
}
.control-over{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 0;
}
.control-box{
  position: absolute;
  width: 8rem;
  height: 8rem;
  top: 10rem;
  left: 2rem;
  border-radius: 50%;
  border: 5px solid #dbdbdb7c;
  background-color: #dbdbdb00;
}
.control-btn{
  width: 2rem;
  height: 2rem;
  background-color: #dbdbdbc2;
  border-radius: 50%;
  position: absolute;
  top: 43px;
  left: 43px;
}
.switch-visible{
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  width: 2rem;
  height: 6rem;
  font-size: 1.2rem;
}
.icon-box {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #dbdbdb;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 5px;
  color: #386863;
  margin: 5px 0;
}
.back-btn{
  width: 3rem;
  height: 1.4rem;
  background-color: #dbdbdbc5;
  font-size: 1rem;
  color: #577774;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 6px;
}
.back-btn ion-back-button{
  font-size: 12px;
}
.speed-display{
  width: 7rem;
  height: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 3rem;
  background-color: #dbdbdbbe;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 12px;
  text-align: start;
  padding: 2px;
  display: flex;
  align-content: center;
  align-items: center;
}
.speed-display span {
  width: 35%;
  text-align: center;
}
.power-display{
  width: 3.8rem;
  height: 1rem;
  position: absolute;
  top: 4px;
  right: 3rem;
  background-color: #dbdbdbbe;
  border-radius: 3px;
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}
.power-display span{
  font-size: 12px;
  transform: scale(.8);
}
.power-display ion-icon{
  color: #00ff00;
}
.power-display ion-icon.danger{
  color: #eb445a;
}
.speed-control {
  width: 22rem;
  height: 1.6rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: #dbdbdbbe;
  position: absolute;
  top: 4px;
  left: 4rem;
  font-size: 12px;
  border-radius: 5px;
}
.speed-control ion-range{
  --height: 0.8rem;
}
</style>