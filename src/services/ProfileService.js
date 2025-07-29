import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

class ProfileService {
  // Kullanıcı profil bilgilerini getir
  async getUserProfile(userId) {
    try {
      if (!userId) {
        throw new Error('UserId is required');
      }

      const userDoc = await firestore().collection('users').doc(userId).get();

      if (!userDoc.exists) {
        console.log('No user found with id:', userId);
        return null;
      }

      const userData = userDoc.data();
      console.log('User data fetched:', userData);
      return userData;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  // Kullanıcı profil bilgilerini güncelle
  async updateUserProfile(userId, profileData) {
    try {
      if (!userId) {
        throw new Error('UserId is required');
      }

      const userRef = firestore().collection('users').doc(userId);

      // Mevcut veriyi al
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        // Yeni kullanıcı oluştur
        await userRef.set({
          ...profileData,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        // Mevcut kullanıcıyı güncelle
        const updatedData = {
          ...profileData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        };

        // Email ve role değişikliklerini kontrol et
        delete updatedData.email; // Email değişikliğini engelle
        if (userDoc.data().role) {
          delete updatedData.role; // Rol değişikliğini engelle
        }

        await userRef.update(updatedData);
      }

      console.log('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Profil fotoğrafı yükle
  async uploadProfilePhoto(userId, uri) {
    try {
      const reference = storage().ref(`profile_photos/${userId}`);
      await reference.putFile(uri);

      // Get download URL
      const url = await reference.getDownloadURL();

      // Update user profile with photo URL
      await firestore().collection('users').doc(userId).update({
        photoURL: url,
      });

      return url;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
    }
  }

  // Rol bazlı kullanıcıları getir
  async getUsersByRole(role) {
    try {
      const snapshot = await firestore()
        .collection('users')
        .where('role', '==', role)
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error getting users by role:', error);
      throw error;
    }
  }
}

export default new ProfileService();
