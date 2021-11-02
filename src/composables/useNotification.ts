import { toastController } from '@ionic/vue';

export function useNotification() {

  const notifiToast = async (value: any) => {
    const colorList: Array<string> = ['success', 'primary', 'danger', 'warning', 'light', 'dark', 'secondary', 'tertiary', 'medium'];
    
    const toast = await toastController.create({
      color: colorList[value.color],
      position: 'top',
      duration: 2000,
      message: value.message
    });

    return await toast.present();
  }

  return {
    notifiToast
  };
}
