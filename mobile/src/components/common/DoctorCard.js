import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';

const DoctorCard = ({ doctor, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <Image 
            source={{ uri: doctor.image }} 
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.speciality}>{doctor.speciality}</Text>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Ionicons name="school-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{doctor.degree}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{doctor.experience} years</Text>
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={styles.fees}>₹{doctor.fees}</Text>
              <View style={[styles.status, doctor.available && styles.available]}>
                <Text style={styles.statusText}>
                  {doctor.available ? 'Available' : 'Unavailable'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  speciality: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 8,
  },
  details: {
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  fees: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#ffebee',
  },
  available: {
    backgroundColor: '#e8f5e9',
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default DoctorCard;

