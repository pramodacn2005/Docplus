import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const DoctorProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor } = route.params;

  const handleBookAppointment = () => {
    navigation.navigate('Booking', { doctor });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: doctor.image }} style={styles.profileImage} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.speciality}>{doctor.speciality}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, doctor.available && styles.statusDotActive]} />
            <Text style={styles.statusText}>
              {doctor.available ? 'Available' : 'Unavailable'}
            </Text>
          </View>
        </View>
      </View>

      <Card style={styles.card}>
        <View style={styles.infoRow}>
          <Ionicons name="school-outline" size={20} color="#4A90E2" />
          <Text style={styles.infoText}>{doctor.degree}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#4A90E2" />
          <Text style={styles.infoText}>{doctor.experience} years experience</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={20} color="#4A90E2" />
          <Text style={styles.infoText}>₹{doctor.fees} consultation fee</Text>
        </View>
        {doctor.address && (
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#4A90E2" />
            <Text style={styles.infoText}>
              {doctor.address.line1}, {doctor.address.line2}
            </Text>
          </View>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>{doctor.about}</Text>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Book Appointment"
          onPress={handleBookAppointment}
          disabled={!doctor.available}
          style={styles.bookButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  headerInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  speciality: {
    fontSize: 16,
    color: '#4A90E2',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e74c3c',
    marginRight: 6,
  },
  statusDotActive: {
    backgroundColor: '#27ae60',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    margin: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  bookButton: {
    marginTop: 8,
  },
});

export default DoctorProfileScreen;

