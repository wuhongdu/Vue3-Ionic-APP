import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import RootStateTypes, { AllStateTypes } from '@/store/interface';
// import { AllStateTypes } from '@/store/types';
/**引入子模块 */
import userModule from '@/store/modules/user';
import deviceModule from '@/store/modules/device';

export default createStore<RootStateTypes>({
  state: {
    version: '0.0.2',
    updates: '2020-12-11'
  },
  getters: {},
  mutations: {
    SET_VERSION(state, version) {
      state.version = version;
    },
    SET_UPDATES(state, updates) {
      state.updates = updates;
    }
  },
  actions: {
  },
  modules: {
    userModule,
    deviceModule
  }
});

export const key: InjectionKey<Store<RootStateTypes>> = Symbol ('vue-store');
export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key);
}