import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { doctorAPI } from '../../services/apiService';
import Card from '../../components/common/Card';
import { Ionicons } from '@expo/vector-icons';

const DoctorDashboardScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await doctorAPI.getDashboard();
      if (response.success) {
        setDashboardData(response.dashData);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboard();
  };

  if (loading && !dashboardData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Ionicons name="calendar" size={32} color="#4A90E2" />
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>
                {dashboardData?.appointments || 0}
              </Text>
              <Text style={styles.statLabel}>Appointments</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Ionicons name="people" size={32} color="#27ae60" />
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>
                {dashboardData?.patients || 0}
              </Text>
              <Text style={styles.statLabel}>Patients</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Ionicons name="cash" size={32} color="#f39c12" />
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>
                ₹{dashboardData?.earnings || 0}
              </Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>
          </View>
        </Card>
      </View>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Recent Appointments</Text>
        {dashboardData?.latestAppointments?.length > 0 ? (
          dashboardData.latestAppointments.slice(0, 5).map((appointment) => (
            <View key={appointment._id} style={styles.appointmentItem}>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentName}>
                  {appointment.userData.name}
                </Text>
                <Text style={styles.appointmentDate}>
                  {appointment.slotDate} at {appointment.slotTime}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: appointment.isCompleted
                      ? '#27ae6020'
                      : appointment.cancelled
                      ? '#e74c3c20'
                      : '#4A90E220',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: appointment.isCompleted
                        ? '#27ae60'
                        : appointment.cancelled
                        ? '#e74c3c'
                        : '#4A90E2',
                    },
                  ]}
                >
                  {appointment.isCompleted
                    ? 'Completed'
                    : appointment.cancelled
                    ? 'Cancelled'
                    : 'Pending'}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No appointments yet</Text>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statInfo: {
    marginLeft: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  card: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 12,
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
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 16,
  },
});

export default DoctorDashboardScreen;

