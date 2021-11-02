import { Plugins } from '@capacitor/core';

export function useStorage() {
  const { Storage } = Plugins;

  const setObject = async (key: string, value: any) => {
    await Storage.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  const getObject = async (key: string) => {
    const ret = await Storage.get({key: key});
    return ret.value ? JSON.parse(ret.value) : false;
  }

  const setItem = async (key: string, value: any) => {
    await Storage.set({
      key: key,
      value: value
    });
  };

  const getItem = async (key: string) => {
    const { value } = await Storage.get({key: key});
    return value;
  };

  const removeItem = async (key: string) => {
    await Storage.remove({key: key});
  };

  const clear = async () => {
    await Storage.clear();
  }

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    setObject,
    getObject
  };
}
