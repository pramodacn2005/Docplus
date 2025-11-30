import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { adminAPI } from '../../services/apiService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useNavigation } from '@react-navigation/native';

const AddDoctorScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [degree, setDegree] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');
  const [fees, setFees] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const specialities = [
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Gynecologist',
    'General Physician',
  ];

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

  const handleAddDoctor = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !addressLine1 ||
      !image
    ) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('experience', experience);
      formData.append('about', about);
      formData.append('fees', fees);
      formData.append('address', JSON.stringify({
        line1: addressLine1,
        line2: addressLine2,
      }));

      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'doctor.jpg',
      });

      const response = await adminAPI.addDoctor(formData);
      if (response.success) {
        Alert.alert('Success', 'Doctor added successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', response.message || 'Failed to add doctor');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Tap to add photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter doctor name"
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password (min 8 characters)"
          secureTextEntry
        />
        <View style={styles.specialityContainer}>
          <Text style={styles.label}>Speciality</Text>
          <View style={styles.specialityOptions}>
            {specialities.map((spec) => (
              <TouchableOpacity
                key={spec}
                style={[
                  styles.specialityButton,
                  speciality === spec && styles.specialityButtonActive,
                ]}
                onPress={() => setSpeciality(spec)}
              >
                <Text
                  style={[
                    styles.specialityText,
                    speciality === spec && styles.specialityTextActive,
                  ]}
                >
                  {spec}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Professional Details</Text>
        <Input
          label="Degree"
          value={degree}
          onChangeText={setDegree}
          placeholder="Enter degree"
        />
        <Input
          label="Experience (years)"
          value={experience}
          onChangeText={setExperience}
          placeholder="Enter years of experience"
          keyboardType="numeric"
        />
        <Input
          label="Consultation Fees (₹)"
          value={fees}
          onChangeText={setFees}
          placeholder="Enter consultation fees"
          keyboardType="numeric"
        />
        <Input
          label="About"
          value={about}
          onChangeText={setAbout}
          placeholder="Enter about doctor"
          multiline
        />
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
          title="Add Doctor"
          onPress={handleAddDoctor}
          loading={loading}
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
  card: {
    margin: 16,
    marginBottom: 8,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    color: '#666',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  specialityContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  specialityOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialityButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  specialityButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  specialityText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  specialityTextActive: {
    color: '#fff',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default AddDoctorScreen;

