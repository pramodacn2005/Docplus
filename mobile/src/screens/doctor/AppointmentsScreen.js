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
import { doctorAPI } from '../../services/apiService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Ionicons } from '@expo/vector-icons';

const DoctorAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await doctorAPI.getAppointments();
      if (response.success) {
        setAppointments(response.appointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
  };

  const handleComplete = async (appointmentId) => {
    try {
      const response = await doctorAPI.completeAppointment({ appointmentId });
      if (response.success) {
        Alert.alert('Success', 'Appointment marked as completed');
        fetchAppointments();
      } else {
        Alert.alert('Error', response.message || 'Failed to complete');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to complete');
    }
  };

  const handleCancel = async (appointmentId) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await doctorAPI.cancelAppointment({ appointmentId });
              if (response.success) {
                Alert.alert('Success', 'Appointment cancelled');
                fetchAppointments();
              } else {
                Alert.alert('Error', response.message || 'Failed to cancel');
              }
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to cancel');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (appointment) => {
    if (appointment.cancelled) return '#e74c3c';
    if (appointment.isCompleted) return '#27ae60';
    return '#4A90E2';
  };

  const getStatusText = (appointment) => {
    if (appointment.cancelled) return 'Cancelled';
    if (appointment.isCompleted) return 'Completed';
    return 'Pending';
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Card key={appointment._id} style={styles.card}>
              <View style={styles.header}>
                <View style={styles.patientInfo}>
                  <Text style={styles.patientName}>
                    {appointment.userData.name}
                  </Text>
                  <Text style={styles.patientEmail}>
                    {appointment.userData.email}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(appointment) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(appointment) },
                    ]}
                  >
                    {getStatusText(appointment)}
                  </Text>
                </View>
              </View>

              <View style={styles.details}>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{appointment.slotDate}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{appointment.slotTime}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="cash-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>₹{appointment.amount}</Text>
                </View>
              </View>

              {!appointment.cancelled && !appointment.isCompleted && (
                <View style={styles.actions}>
                  <Button
                    title="Mark Complete"
                    onPress={() => handleComplete(appointment._id)}
                    style={[styles.actionButton, styles.completeButton]}
                  />
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancel(appointment._id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Card>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No appointments yet</Text>
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
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  patientEmail: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    gap: 8,
    marginBottom: 16,
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
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
  completeButton: {
    backgroundColor: '#27ae60',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '600',
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
    marginTop: 16,
  },
});

export default DoctorAppointmentsScreen;

