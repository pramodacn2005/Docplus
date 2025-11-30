import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/apiService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { user, updateUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [dob, setDob] = useState(user?.dob || '');
  const [gender, setGender] = useState(user?.gender || 'Not Selected');
  const [addressLine1, setAddressLine1] = useState(user?.address?.line1 || '');
  const [addressLine2, setAddressLine2] = useState(user?.address?.line2 || '');
  const [image, setImage] = useState(user?.image || null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    if (!name || !phone || !dob || !gender) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('dob', dob);
      formData.append('gender', gender);
      formData.append('address', JSON.stringify({
        line1: addressLine1,
        line2: addressLine2,
      }));

      if (image && image.startsWith('file://')) {
        formData.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }

      const response = await userAPI.updateProfile(formData);
      if (response.success) {
        Alert.alert('Success', 'Profile updated successfully');
        // Refresh user data
        const profileResponse = await userAPI.getProfile();
        if (profileResponse.success) {
          updateUser(profileResponse.userData);
        }
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

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: image || 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
            <View style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <Input
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone"
          keyboardType="phone-pad"
        />
        <Input
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          placeholder="DD/MM/YYYY"
        />
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderOptions}>
            {['Male', 'Female', 'Other'].map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderButton,
                  gender === g && styles.genderButtonActive,
                ]}
                onPress={() => setGender(g)}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === g && styles.genderTextActive,
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Address</Text>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 12,
    right: '35%',
    backgroundColor: '#4A90E2',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  genderContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  genderButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  genderText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  genderTextActive: {
    color: '#fff',
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

export default ProfileScreen;

