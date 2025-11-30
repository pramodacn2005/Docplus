import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { doctorAPI } from '../../services/apiService';
import DoctorCard from '../../components/common/DoctorCard';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DoctorsScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const specialities = ['All', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Gynecologist', 'General Physician'];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchQuery, selectedSpeciality, doctors]);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getList();
      if (response.success) {
        setDoctors(response.doctors);
        setFilteredDoctors(response.doctors);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterDoctors = () => {
    let filtered = [...doctors];

    // Filter by speciality
    if (selectedSpeciality !== 'All') {
      filtered = filtered.filter(
        (doctor) => doctor.speciality === selectedSpeciality
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDoctors();
  };

  const handleDoctorPress = (doctor) => {
    navigation.navigate('DoctorProfile', { doctor });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {specialities.map((speciality) => (
          <TouchableOpacity
            key={speciality}
            style={[
              styles.filterChip,
              selectedSpeciality === speciality && styles.filterChipActive,
            ]}
            onPress={() => setSelectedSpeciality(speciality)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedSpeciality === speciality && styles.filterChipTextActive,
              ]}
            >
              {speciality}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onPress={() => handleDoctorPress(doctor)}
            />
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
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#4A90E2',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
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

export default DoctorsScreen;

