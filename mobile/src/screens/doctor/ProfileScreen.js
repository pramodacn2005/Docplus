import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { doctorAPI } from '../../services/apiService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { Ionicons } from '@expo/vector-icons';

const DoctorProfileScreen = () => {
  const { user, updateUser, logout } = useAuth();
  const [fees, setFees] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await doctorAPI.getProfile();
      if (response.success) {
        setProfileData(response.profileData);
        setFees(response.profileData.fees?.toString() || '');
        setAddressLine1(response.profileData.address?.line1 || '');
        setAddressLine2(response.profileData.address?.line2 || '');
        setAvailable(response.profileData.available ?? true);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdate = async () => {
    if (!fees) {
      Alert.alert('Error', 'Please enter consultation fees');
      return;
    }

    setLoading(true);
    try {
      const response = await doctorAPI.updateProfile({
        fees: parseFloat(fees),
        address: {
          line1: addressLine1,
          line2: addressLine2,
        },
        available,
      });

      if (response.success) {
        Alert.alert('Success', 'Profile updated successfully');
        fetchProfile();
      } else {
        Alert.alert('Error', response.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.speciality}>{profileData.speciality}</Text>
            <Text style={styles.degree}>{profileData.degree}</Text>
            <Text style={styles.experience}>
              {profileData.experience} years of experience
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Professional Details</Text>
        <Input
          label="Consultation Fees (₹)"
          value={fees}
          onChangeText={setFees}
          placeholder="Enter consultation fees"
          keyboardType="numeric"
        />
        <Input
          label="Address Line 1"
          value={addressLine1}
          onChangeText={setAddressLine1}
          placeholder="Enter address line 1"
        />
        <Input
          label="Address Line 2"
          value={addressLine2}
          onChangeText={setAddressLine2}
          placeholder="Enter address line 2"
        />
        <View style={styles.availabilityContainer}>
          <Text style={styles.label}>Availability</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {available ? 'Available' : 'Unavailable'}
            </Text>
            <TouchableOpacity
              style={[styles.switch, available && styles.switchActive]}
              onPress={() => setAvailable(!available)}
            >
              <View
                style={[
                  styles.switchThumb,
                  available && styles.switchThumbActive,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>{profileData.about}</Text>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Update Profile"
          onPress={handleUpdate}
          loading={loading}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileInfo: {
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
    marginBottom: 4,
  },
  degree: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  experience: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  availabilityContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    color: '#666',
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchActive: {
    backgroundColor: '#4A90E2',
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
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
  logoutButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e74c3c',
    alignItems: 'center',
  },
  logoutText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DoctorProfileScreen;

