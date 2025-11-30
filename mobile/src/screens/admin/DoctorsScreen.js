import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { adminAPI } from '../../services/apiService';
import Card from '../../components/common/Card';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AdminDoctorsScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await adminAPI.getAllDoctors();
      if (response.success) {
        setDoctors(response.doctors);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDoctors();
  };

  const handleToggleAvailability = async (docId) => {
    try {
      const response = await adminAPI.changeAvailability({ docId });
      if (response.success) {
        Alert.alert('Success', 'Availability updated');
        fetchDoctors();
      } else {
        Alert.alert('Error', response.message || 'Failed to update');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddDoctor')}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Doctor</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Card key={doctor._id} style={styles.card}>
              <View style={styles.header}>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.speciality}>{doctor.speciality}</Text>
                  <Text style={styles.email}>{doctor.email}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.availabilityButton,
                    doctor.available && styles.availabilityButtonActive,
                  ]}
                  onPress={() => handleToggleAvailability(doctor._id)}
                >
                  <Text
                    style={[
                      styles.availabilityText,
                      doctor.available && styles.availabilityTextActive,
                    ]}
                  >
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.details}>
                <View style={styles.detailRow}>
                  <Ionicons name="school-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{doctor.degree}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>
                    {doctor.experience} years
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="cash-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>₹{doctor.fees}</Text>
                </View>
              </View>
            </Card>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No doctors found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  speciality: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 4,
  },
  email: {
    fontSize: 12,
    color: '#666',
  },
  availabilityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#ffebee',
  },
  availabilityButtonActive: {
    backgroundColor: '#e8f5e9',
  },
  availabilityText: {
    fontSize: 12,
    color: '#e74c3c',
    fontWeight: '600',
  },
  availabilityTextActive: {
    color: '#27ae60',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default AdminDoctorsScreen;

