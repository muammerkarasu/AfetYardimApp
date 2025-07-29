import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

// Kullanıcı koleksiyonu referansı
const usersCollection = firestore().collection('users');

// Firebase kullanıcıyı veritabanından getir
const getUserData = async userId => {
  try {
    const userDoc = await usersCollection.doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Kullanıcı verisi alınırken hata:', error);
    return null;
  }
};

// Kullanıcı verilerini güncelle veya oluştur
const updateUserData = async (userId, userData) => {
  try {
    console.log('Firebase updateUserData çağrıldı:', userId, userData);

    if (!userId) {
      throw new Error("Kullanıcı ID'si gereklidir");
    }

    const userRef = usersCollection.doc(userId);

    // set with merge kullanarak daha güvenli güncelleme
    await userRef.set(userData, {merge: true});

    console.log('Kullanıcı verileri başarıyla güncellendi (Firebase)');
    return true;
  } catch (error) {
    console.error('Kullanıcı güncellenirken hata (Firebase):', error);
    throw error;
  }
};

// Giriş yapmış kullanıcıyı kontrol et
const getCurrentUser = () => {
  return auth().currentUser;
};

export {
  firestore,
  auth,
  storage,
  usersCollection,
  getUserData,
  updateUserData,
  getCurrentUser,
};
