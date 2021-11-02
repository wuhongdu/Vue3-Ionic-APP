import { Plugins } from '@capacitor/core';

export function useNetwork () {

  const { Network } = Plugins;

  const getNetStatus =  async () => {
    return await Network.getStatus();
  }

  return {
    getNetStatus
  };
}