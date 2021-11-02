import { Module } from 'vuex';
import RootStateTypes from '@/store/interface';
import DeviceModuleTypes from '@/store/modules/device/interface';
import { addDevice, delDevice, getDevice } from '@/services/devices';
import { useNotification } from '@/composables/useNotification';

const { notifiToast } = useNotification();

const deviceModule: Module<DeviceModuleTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    famliy: [
      {name: '小新', deviceID: 'adtu23eudatsyu283dguya', type: 'famliy', Switch: 1, online: true, open: false},
      {name: '小哎', deviceID: 'adtu23eudatsyu283dguyu', type: 'famliy', Switch: 3, online: false, open: false},
      {name: '小布', deviceID: 'adtu23eudatsyu283yunya', type: 'famliy', Switch: 1, online: true, open: false}
    ],
    intelligent: [
      {name: '小力', deviceID: 'asdakjdhjewfhuwidsjkfj', type: 'intelligent', Switch: 2, online: true}
    ]
  },
  mutations: {
    SET_DEVICELIST(state, list) {
        state.famliy = [];
        state.intelligent = [];
        for (const key in list[0]) {
          list[0][key].online = false;
          if (list[0][key].switch === 1) {
            list[0][key].open = false;
          }
          state.famliy.push(list[0][key]);
        }
        for (const key in list[1]) {
          list[1][key].online = false;
          state.intelligent.push(list[1][key]);
        }
    }
  },
  actions: {
    getDevice ({ commit }, userinfor) {
      notifiToast({ color: 3, message: '开始获取列表'});
      return new Promise((resolve, reject) => {
        getDevice(userinfor).then((res) => {
          const { data } = res;
          commit('SET_DEVICELIST', data.data);
          resolve(true);
        }).catch(() => {
          reject(false);
        });
      });
    },
    addDevice ({ commit }, infor) {
      return new Promise((resolve, reject) => {
        addDevice(infor).then((res) => {
          const { data } = res;
          commit('SET_DEVICELIST', data.data);
          resolve(true);
        }).catch(() => {
          reject(false);
        });
      });
    },
    delDevice ({ commit }, infor) {
      return new Promise((resolve, reject) => {
        delDevice(infor).then((res) => {
          const { data } = res;
          commit('SET_DEVICELIST', data.data);
          resolve(true);
        }).catch(() => {
          reject(false);
        });
      });
    }
  }
};

export default deviceModule;