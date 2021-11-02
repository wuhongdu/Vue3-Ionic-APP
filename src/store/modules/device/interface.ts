export default interface DeviceModuleTypes {
  famliy: Array<DeviceListTypes>;
  intelligent: Array<DeviceListTypes>;
}
export interface DeviceListTypes {
  name: string;
  deviceID: string;
  type: string;
  Switch: number;
  online: boolean;
  open?: boolean;
}