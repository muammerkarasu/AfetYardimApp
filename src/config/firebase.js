import {firebase} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

/**
 * Firebase konfigürasyonu
 * Not: google-services.json ve GoogleService-Info.plist dosyaları
 * ilgili platformlara eklendiğinde otomatik olarak yapılandırılır
 *
 * Ancak bazı durumlarda manuel olarak da aşağıdaki gibi belirtmek gerekebilir
 */
const firebaseConfig = {
  apiKey: "AIzaSyC7hL1sRW3atAoQqylXuFki_WSWfklHpKY",
  authDomain: "afetyardim-197dc.firebaseapp.com",
  projectId: "afetyardim-197dc",
  storageBucket: "afetyardim-197dc.firebasestorage.app",
  messagingSenderId: "7066017258",
  appId: "1:7066017258:web:f64523409138568e046693",
  measurementId: "G-PHY08T265K"
};

// Firebase'in başlatılıp başlatılmadığını kontrol et
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Realtime Database için varsayılan URL'yi ayarla
if (firebase.app().database) {
  firebase.app().database().setPersistenceEnabled(true); // Offline veritabanı desteği
}

// Hata ayıklama modu - geliştirme sırasında yararlı
if (__DEV__) {
  console.log('Firebase yapılandırıldı:', firebase.app().name);
}

export {firebase, auth, database};
