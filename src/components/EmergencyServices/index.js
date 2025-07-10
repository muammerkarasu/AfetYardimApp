import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

const EmergencyServices = ({onServicePress}) => {
  const emergencyServices = [
    {
      id: '1',
      title: 'Acil Yardım Çağrısı',
      icon: 'https://cdn-icons-png.flaticon.com/512/2518/2518048.png',
      color: '#e74c3c',
      screen: 'EmergencyCall',
      phoneNumber: '112',
    },
    {
      id: '2',
      title: 'Deprem Bildirimi',
      icon: 'https://cdn-icons-png.flaticon.com/512/2200/2200326.png',
      color: '#e67e22',
      screen: 'CreateHelpRequest',
      description: 'Deprem bölgesinde yardım talebinde bulunun',
    },
    {
      id: '3',
      title: 'Sel Bildirimi',
      icon: 'https://cdn-icons-png.flaticon.com/512/4005/4005837.png',
      color: '#3498db',
      screen: 'CreateHelpRequest',
      description: 'Sel bölgesinde yardım talebinde bulunun',
    },
    {
      id: '4',
      title: 'Yangın Bildirimi',
      icon: 'https://cdn-icons-png.flaticon.com/512/785/785116.png',
      color: '#d35400',
      screen: 'FireReport',
      phoneNumber: '110',
    },
  ];

  return (
    <View style={styles.emergencyContainer}>
      <Text style={styles.sectionTitle}>Acil Durum Hizmetleri</Text>
      <View style={styles.emergencyButtonsContainer}>
        {emergencyServices.map(service => (
          <TouchableOpacity
            key={service.id}
            style={[styles.emergencyButton, {backgroundColor: service.color}]}
            onPress={() => onServicePress(service)}>
            <Image source={{uri: service.icon}} style={styles.emergencyIcon} />
            <Text style={styles.emergencyButtonText}>{service.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default EmergencyServices;
