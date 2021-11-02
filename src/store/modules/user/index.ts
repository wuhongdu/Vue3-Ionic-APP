import { Module } from 'vuex';
import RootStateTypes from '@/store/interface';
import UserModuleTypes from '@/store/modules/user/interface';
import { login, register, changeInfo } from '@/services/user';
import { useStorage } from '@/composables/useStorage';

const userModule: Module<UserModuleTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    infor: {}
  },
  mutations: {
    SET_USERINFO(state, userinfo): void {
      state.infor = userinfo;
    }
  },
  actions: {
    login({ commit }, userinfor) {
      const { setObject } = useStorage();
      return new Promise((resolve, reject) => {
        login(userinfor).then((res) => {
          const { data } = res;
          commit('SET_USERINFO', data.data);
          setObject('infor', data.data);
          sessionStorage.setItem('iot_token', data.token);
          sessionStorage.setItem('userId', data.data.userId);
          resolve(true);
        }).catch((error) => {
          reject(error);
        });
      })
    },
    register({ commit }, userinfor) {
      return new Promise((resolve, reject) => {
        register(userinfor).then(() => {
          resolve(true);
        }).catch(() => {
          reject(false);
        });
      });
    },
    changeInfor({ commit }, userinfor) {
      console.log(userinfor);
      return new Promise((resolve, reject) => {
        changeInfo(userinfor).then(res => {
          const { data } = res;
          commit('SET_USERINFO', data.data);
          resolve(true);
        }).catch(() => {
          reject(false);
        });
      });
    },
    logout() {
      // 删除 token 页面切换到登录页面
      const { removeItem } = useStorage();
      localStorage.removeItem('iot_token');
      localStorage.removeItem('userId');
      removeItem('infor');
      return Promise.resolve(true);
    },
    setUser({commit}) {
      const { getObject } = useStorage();
      getObject('infor').then(value => {
        commit('SET_USERINFO', value);
      }).catch(error => {
        return Promise.reject(error);
      });
    }
  }
};

export default userModule;
