import UserModuleTypes from '@/store/modules/user/interface';
import DeviceModuleTypes from '@/store/modules/device/interface';

export default interface RootStateTypes {
  version: string;
  updates: string;
}

export interface AllStateTypes extends RootStateTypes {
  userModule: UserModuleTypes;
  deviceModule: DeviceModuleTypes;
}