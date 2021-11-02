<template> 
<ion-page>
  <ion-content :fullscreen="true">
    <div id="container">
      <ion-fab vertical="top" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="add" @click="handleDeviceAdd"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <div class="bg-color"></div>
      <weather-page></weather-page>
      <div class="device-type">
        <ion-button size="small" fill="clear" :class="{active: menuStatus}" @click="handleChangeMenu">家庭</ion-button>
        <ion-button size="small" fill="clear" :class="{active: !menuStatus}" @click="handleChangeMenu">智能</ion-button>
      </div>
      <div v-show="menuStatus" class="famliy-container">
        <device-list v-for="(item, index) in famliy" :key="index" :name="item.name" :Switch="item.switch" :online="item.online" :open="item.open" @click="presentActionSheet(item.name, item.deviceId, item.switch, item.online)"></device-list>
      </div>
      <div v-show="!menuStatus" class="intelligent-container">
        <device-list v-for="(item, index) in intelligent" :key="index" :name="item.name" :Switch="item.switch" :online="item.online" @click="handleToControl"></device-list>
      </div>
      {{ blueLists }} --- {{ deviceInfor }}
    </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { 
  IonPage,
  IonContent,
  actionSheetController,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  alertController
} from '@ionic/vue';
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { add } from 'ionicons/icons';
import DeviceList from '@/components/DeviceList/index.vue';
import WeatherPage from '@/views/weather/index.vue';
import { useRouter } from 'vue-router';
import { useBarcodeScanner } from '@/composables/useBarcodeScanner';
import { useNotification } from '@/composables/useNotification';
import { useStore } from '@/store';
import { DeviceListTypes } from '@/store/modules/device/interface';
import { useBluetooth } from '@/composables/useBluetooth';
import { useNetwork } from '@/composables/useNetwork';

export default defineComponent({
  components: {
    DeviceList,
    IonPage,
    IonContent,
    IonButton,
    WeatherPage,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    const { barScanner } = useBarcodeScanner();
    const { notifiToast } = useNotification();
    const { getNetStatus } = useNetwork();
    const router = useRouter();
    const store = useStore();
    const {
      isOpenBluetooth,
      OpenBluetooth,
      getBluetoothList,
      selectDevice,
      blueLists,
      writeData
    } = useBluetooth();
    const state = reactive({
      menuStatus: true,
      deviceInfor: {},
      famliy: [] as DeviceListTypes[],
      intelligent: [] as DeviceListTypes[],
      bluetoothEnabled: {},
      blues: [{
        class: 276,
        id: '10:24:36:01:34:00',
        address: '10:24:36:01:34:00',
        name: 'ade34ws4'
      },{
        class: 2760,
        id: '10:24:36:01:34:01',
        address: '10:24:36:01:34:01',
        name: 'ade34ws6'
      }],
    });

    /**
     * type 分别是 家庭设备还是 智能设备 famliy intelligent
     * switch 分别 设备是什么 例如 led video air
     * online 确定 设备是否在线 
     * open 确定是 开 关
     */
    // let ws: any = null;
    // const url = ref("ws://192.168.0.113:8089/");

    // // 开始打开 websocket
    // const ws = new WebSocket(url.value);

    // ws.onopen = async () => {
    //   console.log('connection open success ...');
    //   ws.send(JSON.stringify({ type: 'LOGIN', deviceTYPE: 'USER', userID: '1b2j3n2g3hk1' }));
    // }

    // ws.onmessage = async (event: any) => {
    //   const message = JSON.parse(event.data);
    //   console.log(message);
    //   switch (message.type) {
    //     case 'DEVICE':
    //       deviceList.value = message.data;
    //       break;
    //   }
    // }
    store.dispatch('deviceModule/getDevice', {userId: sessionStorage.getItem('userId')});

    watch(() => store.state.deviceModule.intelligent, (intelligentCount) => {
      state.intelligent = intelligentCount;
    });

    watch(() => store.state.deviceModule.famliy, (famliyCount) => {
      famliyCount[0].online = true;
      state.famliy = famliyCount;
    });

    /**
     * @toViewVideo
     * 导航到播放摄像头视频的页面
     */
    const toViewVideo = () => {
      router.push({ path: '/video_play'});
    }

    /**
     * @TurnOff 
     * 在设备列表找到 对应的设备信息 并添加属性来显示是否打开
     */
    const TurnOff = async (id: string, status: boolean) => {
      state.famliy.map((item: any, index: any) => {
        if (id === item.deviceId) {
          state.famliy[index].open = status;
        }
      });
    }

    /**
     * @presentActionSheet
     * 点击家庭设备的开关 事件
     */
    const presentActionSheet = async (deviceName: any, id: any, Switch: number, online: boolean) => {
      if ( Switch === 1) {
        if (online) {
          const actionSheet = await actionSheetController.create({
            header: deviceName,
            cssClass: 'action-sheet-custom-class',
            buttons: [
              {
                text: '开',
                handler: () => {
                  // ws.send(JSON.stringify({ type: 'CTRL', toID: id, value: 2 }));
                  TurnOff(id, true);
                }
              },
              {
                text: '关',
                handler: () => {
                  // ws.send(JSON.stringify({ type: 'CTRL', toID: id, value: 1 })); 
                  TurnOff(id, false);
                }
              }
            ]
          });
          return actionSheet.present();
        } else {
          notifiToast({color: 4, message: '设备不在线，无法操作此设备'});
        }
      } else {
        toViewVideo();
      }
    }

    /**
     * @showNetInformation
     * 添加并确认需要写入到设备的信息
     * 写入信息成功后 通知设备关闭蓝牙 
     * 并向数据库中用户的设备列表添加 此设备
     */
   const showNetInformation = async (id: string) => {
      const writeInfo = await alertController.create({
        header: '发送给设备的信息',
        inputs: [
          {
            type: 'url',
            value: '',
            name: 'server',
            placeholder: '请输入设备需要连接的服务器'
          },
          {
            type: 'text',
            value: '',
            name: 'account',
            placeholder: '请输入设备需要连接的无线网络名'
          },
          {
            type: 'password',
            value: '',
            name: 'pass',
            placeholder: '请输入需连接无线网络的密码'
          }
        ],
        buttons: [
          {
            text: '取消',
            role: 'cancel'
          },
          {
            text: '写入',
            handler: (event) => {
              // 调用写入设备函数
              console.log('需要输入的信息');
              //{"server":"shdhhhdhdh","account":"hshhdhhdhdh","pass":"hdhdhhdhd"}
              console.log(JSON.stringify(event), id);
            }
          }
        ]
      });
      return writeInfo.present();
    } 

    /**
     * @notifiBlue
     * 确定是否连接 设备的蓝牙
     */
    const notifiBlue = async (id: string, name: string) => {
      const alertBox = await alertController.create({
        header: '提示',
        message: `你确定是要连接${name}此设备吗？`,
        buttons: [
          {
            text: '取消',
            role: 'cancel'
          },
          {
            text: '确定',
            handler: async () => {
              console.log(id);
              // 此处调用 连接函数
              // 连接成功后 显示 wifi名 wifi密码 服务器地址
              // showNetInformation(id);  // 此处为测试,正式时需要连接成功后才能调用此函数
              await selectDevice(id).then(() => {
                notifiToast({color: 0, message: `设备连接成功，可以与设备进行通信`});
                // showNetInformation(id);
              }).catch((error: Error) => {
                console.log(error);
                notifiToast({color: 3, message: `设备连接失败，${error}`});
              });
            }
          }
        ]
      });
      return alertBox.present();
    }

    /**
     * @showBluetoothList
     * 显示扫描到的蓝牙设备列表
     */
    // const showBluetoothList = async () => {
    //   const temp: any = [];
    //   const lists = blueLists.value;
    //   for(const index in lists) {
    //     temp.push({
    //       type: 'radio',
    //       label: lists[index].name,
    //       value: lists[index].id
    //     });
    //   }

    //   const alertBlue = await alertController.create({
    //     header: '蓝牙列表',
    //     inputs: temp,
    //     buttons: [
    //       {
    //         text: '取消',
    //         role: 'cancel'
    //       },
    //       {
    //         text: '连接',
    //         handler: (event) => {
    //           //  确认连接
    //           notifiBlue(event);
    //         }
    //       }
    //     ]
    //   });

    //   return alertBlue.present();

    // }

    /**
     * @alertHardWareConnection
     * 读取 本机设备的 蓝牙打开状态
     */
    const alertHardWareConnection = async () => {

      await isOpenBluetooth().then(async (val: any) => {
        state.bluetoothEnabled = val;
        if (!val) {// 首先确定是否打开蓝牙
          const hardware = await alertController.create({
            header: '提示',
            message: '是否打开蓝牙连接设备，并设置设备。',
            buttons: [
              {
                text: '否',
                role: 'cancel'
              },
              {
                text: '是',
                handler: async () => {
                  // 调用 蓝牙 并获取设备列表
                 await OpenBluetooth().then(async (open: any) => {
                   if (open) {
                    await getBluetoothList();
                    // await showBluetoothList();
                   } else {
                    notifiToast({color: 3, message: '打开蓝牙失败'});
                   }
                 });
                }
              }
            ]
          });

          hardware.present();
        } else {
          await getBluetoothList();
          // await showBluetoothList();
        }
      });
    }

    /**
     * @showDeviceInfo
     * 通过扫描设备序列号 得到设备的基本信息
     */
    const showDeviceInfo = async (params: any) => {
      /**
        * 弹出Model 并将设备信息显示出来
        *  @state.deviceInfor = params.text
        * 看结果处理 扫面出来的信息
        * 对设备信息进行补充全部化
        */
      const fullDeviceInfo = {
        deviceType: '',
        deviceName: '',
        hardwareId: '',
        deviceSwitch: 0,
        userId: ''
      };
      const data = params.split('-');
      state.deviceInfor = data;

      if (data[3] === "fa") {
        fullDeviceInfo.deviceType = 'famliy';
      } else if (data[3] === "in") {
        fullDeviceInfo.deviceType = 'intelligent';
      }

      fullDeviceInfo.deviceName = '小' + data[1];
      fullDeviceInfo.hardwareId = data[0];
      fullDeviceInfo.deviceSwitch = Number(data[2]);
      fullDeviceInfo.userId = sessionStorage.getItem('userId') || '';

      state.deviceInfor = fullDeviceInfo;

      if (!fullDeviceInfo.userId) {
        notifiToast({color: 3, message: '未获取到用户账户，无法添加设备。请退出登录重新登录'});
        return;
      }

      const lists = blueLists.value;
      let isExist = 0;
      for(let index=0;index<lists.length;index++) {
        if (lists[index].name === fullDeviceInfo.hardwareId ) {
          isExist = Number(index);
          break;
        }
      }

      if (isExist > 0) {
        notifiBlue(lists[isExist].id, lists[isExist].name);
      } else {
        notifiToast({color: 3, message: `在已配对列表中未找到此设备的信息，请再次确认已经与此${fullDeviceInfo.hardwareId}设备配对了`});
      }

      // await alertHardWareConnection();

      // store.dispatch('deviceModule/addDevice', fullDeviceInfo).then(value => {
      //   if (value) {
      //     notifiToast({color: 0, message: '添加设备成功'});
      //   } else {
      //     notifiToast({color: 2, message: '添加设备失败'});
      //   }
      // });

    }

    /**
     * @handleDeviceAdd
     * 出发添加设备事件
     * 并打开扫描
     */
    const handleDeviceAdd = async () => { 
      // 确认网络是在无线网络下
      getNetStatus().then((value) => {
        if (value.connectionType !== 'wifi') {
          notifiToast({color: 3, message: '请将设备网络切换到无线网络下，添加的设备必需和本机在同一无线网络下'});
          return;
        }
      }).catch(() => {
        notifiToast({color: 3, message: '网络错误'});
        return;
      });
      await alertHardWareConnection();
      // 扫描二维码 并添加设备
      barScanner().then((value: any) => {
        if (value.cancelled) {
          notifiToast({color: 4, message: '用户已经取消扫面并放弃添加设备'});
        } else if (value.text && !value.cancelled) {
          state.deviceInfor = value.text;
          showDeviceInfo(value.text);
        }
      }).catch((error) => {
        notifiToast({color: 3, message: error});
      });
    }

    /**
     * @handleToControl
     * 导航到智能设备的控制页面
     */
    const handleToControl = async () => {
      router.push({path: '/control'});
    }

    /**
     * @handleChangeMenu
     * 切换 家庭 和 智能 的显示列表
     */
    const handleChangeMenu = async () => {
      state.menuStatus = !state.menuStatus;
    }

    return {
      ...toRefs(state),
      blueLists,
      presentActionSheet,
      handleToControl,
      add,
      handleChangeMenu,
      toViewVideo,
      handleDeviceAdd,
      alertHardWareConnection
    };
  }
});
</script>
<style>
.action-sheet-custom-class{
  --background: #000;
  --color: #577774;
  --button-color: #3880ff;
}
.action-sheet-custom-class div.action-sheet-title,
.action-sheet-custom-class button>span{
  text-align: center;
  justify-content: center !important;
}
</style>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #577774;
  box-sizing: border-box;
  /* border: 1px solid #ffffff; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  position: relative;
}
.bg-color{
  position: absolute;
  width: 100%;
  height: 7.5rem;
  /* background-image: linear-gradient(); */
}
.device-type{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.device-type ion-button{
  --color: #577774;
  letter-spacing: 2px;
}
.device-type ion-button.active{
  --color: #3880ff;
}
ion-fab-button{
  width: 2rem;
  height: 2rem;
}
ion-fab-button > ion-icon {
  font-size: 1.4rem;
}
.famliy-container,
.intelligent-container{
  width: 86%;
  min-height: 22rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>