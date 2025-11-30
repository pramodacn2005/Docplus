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

const AdminAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await adminAPI.getAppointments();
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
              const response = await adminAPI.cancelAppointment({ appointmentId });
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
                <View style={styles.info}>
                  <Text style={styles.patientName}>
                    Patient: {appointment.userData.name}
                  </Text>
                  <Text style={styles.doctorName}>
                    Doctor: {appointment.docData.name}
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
                <View style={styles.detailRow}>
                  <Ionicons name="card-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>
                    Payment: {appointment.payment ? 'Paid' : 'Pending'}
                  </Text>
                </View>
              </View>

              {!appointment.cancelled && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancel(appointment._id)}
                >
                  <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
                </TouchableOpacity>
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
  info: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  doctorName: {
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
  cancelButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e74c3c',
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

export default AdminAppointmentsScreen;

