import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { userAPI } from '../../services/apiService';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';

const BookingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor } = route.params;
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];

  const dates = generateDates();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const formatDateForAPI = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isSlotBooked = (date, time) => {
    if (!doctor.slots_booked) return false;
    const dateStr = formatDateForAPI(date);
    return doctor.slots_booked[dateStr]?.includes(time) || false;
  };

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select date and time');
      return;
    }

    setLoading(true);
    try {
      const response = await userAPI.bookAppointment({
        docId: doctor._id,
        slotDate: formatDateForAPI(selectedDate),
        slotTime: selectedTime,
      });

      if (response.success) {
        // Fetch the latest appointment to get the ID
        const appointmentsResponse = await userAPI.getAppointments();
        if (appointmentsResponse.success && appointmentsResponse.appointments.length > 0) {
          const latestAppointment = appointmentsResponse.appointments[0];
          Alert.alert('Success', 'Appointment booked successfully!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Payment', { 
                appointmentId: latestAppointment._id,
                doctor: doctor,
              }),
            },
          ]);
        } else {
          Alert.alert('Success', 'Appointment booked successfully!');
          navigation.goBack();
        }
      } else {
        Alert.alert('Error', response.message || 'Failed to book appointment');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.dateContainer}>
            {dates.map((date, index) => {
              const dateStr = formatDateForAPI(date);
              const isSelected = selectedDate && formatDateForAPI(selectedDate) === dateStr;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateButton, isSelected && styles.dateButtonSelected]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dateText, isSelected && styles.dateTextSelected]}>
                    {formatDate(date)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Card>

      {selectedDate && (
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeContainer}>
            {timeSlots.map((time, index) => {
              const isBooked = isSlotBooked(selectedDate, time);
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeButton,
                    isSelected && styles.timeButtonSelected,
                    isBooked && styles.timeButtonBooked,
                  ]}
                  onPress={() => !isBooked && setSelectedTime(time)}
                  disabled={isBooked}
                >
                  <Text
                    style={[
                      styles.timeText,
                      isSelected && styles.timeTextSelected,
                      isBooked && styles.timeTextBooked,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>
      )}

      <Card style={styles.card}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Consultation Fee:</Text>
          <Text style={styles.summaryValue}>₹{doctor.fees}</Text>
        </View>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Book Appointment"
          onPress={handleBook}
          loading={loading}
          disabled={!selectedDate || !selectedTime}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateButtonSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  dateTextSelected: {
    color: '#fff',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: '30%',
  },
  timeButtonSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  timeButtonBooked: {
    backgroundColor: '#ffebee',
    borderColor: '#e74c3c',
    opacity: 0.6,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  timeTextSelected: {
    color: '#fff',
  },
  timeTextBooked: {
    color: '#e74c3c',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default BookingScreen;

