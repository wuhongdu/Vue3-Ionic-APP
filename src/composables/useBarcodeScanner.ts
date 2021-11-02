import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export function useBarcodeScanner () {
  const barScanner = async () => {
    return new Promise((resolve, reject) => {
      BarcodeScanner.scan().then(data=> {
        resolve(data);
      }).catch(error=> {
        reject(error);
      });
    });
  }

  return {
    barScanner
  };
}