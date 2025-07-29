import {Platform, PermissionsAndroid, Alert, Linking} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// Android için konum izni isteme
export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    try {
      const granted = await Geolocation.requestAuthorization('whenInUse');
      return granted === 'granted';
    } catch (error) {
      console.error('iOS konum izni alınamadı:', error);
      return false;
    }
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Konum İzni',
          message:
            'Bu uygulama, yakınınızdaki yardım taleplerini göstermek için konumunuzu kullanmak istiyor.',
          buttonNeutral: 'Daha Sonra Sor',
          buttonNegative: 'İptal',
          buttonPositive: 'Tamam',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Android konum izni alınamadı:', error);
      return false;
    }
  }
};

// Konum servislerinin açık olup olmadığını kontrol etme
export const checkLocationServices = async () => {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      () => {
        resolve(true);
      },
      error => {
        // Konum kapalıysa error.code 2 olur
        if (error.code === 2) {
          resolve(false);
        } else {
          // Başka bir hata varsa, iznin olmadığını kabul ediyoruz
          resolve(false);
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000,
      },
    );
  });
};

// Konum ayarları sayfasını aç
export const openLocationSettings = async () => {
  if (Platform.OS === 'ios') {
    try {
      await Linking.openURL('App-Prefs:Privacy&path=LOCATION');
      return true;
    } catch (error) {
      console.error('iOS konum ayarları açılamadı:', error);
      Alert.alert(
        'Konum Ayarları',
        'Konum ayarlarını açmak için "Ayarlar > Gizlilik > Konum Servisleri" yolunu izleyin.',
      );
      return false;
    }
  } else {
    try {
      await Linking.openSettings();
      return true;
    } catch (error) {
      console.error('Android konum ayarları açılamadı:', error);
      Alert.alert(
        'Konum Ayarları',
        'Konum ayarlarını açmak için cihazınızın ayarlarına gidin ve konum servislerini etkinleştirin.',
      );
      return false;
    }
  }
};

// İzinlerin durumunu kontrol eden bir yardımcı fonksiyon
export const checkPermissionStatus = async () => {
  const locationPermission = await requestLocationPermission();
  const locationServices = await checkLocationServices();

  return {
    locationPermission,
    locationServices,
  };
};
