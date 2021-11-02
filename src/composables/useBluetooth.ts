import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ref } from 'vue';

export function useBluetooth() {
  /**
   * 使用蓝牙对设备进行设置
   * 确认蓝牙已经打开
   * 打开后进行扫描
   * 扫描到的设备 与 相机扫描得到的uuid对比
   * 然后绑定地址
   * 然后发送 当前无线网络的地址和密码 
   * 发送 需要连接的服务器地址
   * 最后 通知设备 主动关闭自身的蓝牙 连接网络
   */

   // 定义一个数组来储存 搜索的蓝牙设备
   const blueLists = ref<Bluetooths[]>([]);

   const isOpenBluetooth = async () => {
     let isEnabled = false;
     await BluetoothSerial.isEnabled().then(() => {
       isEnabled = true;
     }).catch(() => {
       isEnabled = false;
     }); 
     return isEnabled;
   }

   const OpenBluetooth = async () => {
     let open = false;
     await BluetoothSerial.enable().then(() => {
       open = true;
     }).catch(() => {
       open = false;
     }); 
     return open;
   }

   const getBluetoothList = async () => {
     blueLists.value = [];
     await BluetoothSerial.list().then((value) => {
      value.map((item: any) => {
        blueLists.value = [item, ...blueLists.value];
      })
     });
   }

   const selectDevice = async (id: string) => {
    //  let isConnected = false;
    console.log('conneced address : '+ id);
      BluetoothSerial.connect(id).subscribe(() => {
        console.log('connected success.');
      }, () => {
        console.log('connected failed.');
      });
      // await BluetoothSerial.isConnected().then(() => {
      //   isConnected = true;
      // }, () => {
      //   isConnected = false;
      // });

      // return isConnected;
   }

   const writeData = async (data: string) => {
    await BluetoothSerial.write(data).then(() => {
       // 写入成功  提示用户关闭提示窗口
     }).catch(() => {
       // 写入失败 需要提示用户重新写入
     });
   }

   const readDeviceInfo = async () => {
     await BluetoothSerial.read().then((data) => {
       console.log(data);
     }).catch((error) => {
       console.log(error);
     })
   }


   return {
     isOpenBluetooth,
     OpenBluetooth,
     getBluetoothList,
     selectDevice,
     writeData,
     readDeviceInfo,
     blueLists
   };

}

export interface Bluetooths {
  class: number;
  id: string;
  address: string;
  name: string;
}