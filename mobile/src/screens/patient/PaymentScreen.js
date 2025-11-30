import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import { userAPI } from '../../services/apiService';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { appointmentId, doctor } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (appointmentId) {
      createOrder();
    } else {
      Alert.alert('Error', 'Appointment ID not found');
      navigation.goBack();
    }
  }, []);

  const createOrder = async () => {
    try {
      const response = await userAPI.createRazorpayOrder({ appointmentId });
      if (response.success) {
        setOrder(response.order);
      } else {
        Alert.alert('Error', response.message || 'Failed to create order');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create order');
    }
  };

  const handlePayment = async () => {
    if (!order) {
      Alert.alert('Error', 'Order not created');
      return;
    }

    setLoading(true);
    try {
      const options = {
        description: 'Appointment Payment',
        image: 'https://your-logo-url.com/logo.png',
        currency: 'INR',
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key
        amount: order.amount,
        name: 'Doc+',
        order_id: order.id,
        prefill: {
          email: user?.email || '',
          contact: user?.phone || '',
          name: user?.name || '',
        },
        theme: { color: '#4A90E2' },
      };

      const data = await RazorpayCheckout.open(options);
      
      // Verify payment
      const verifyResponse = await userAPI.verifyRazorpay({
        razorpay_order_id: order.id,
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
      });

      if (verifyResponse.success) {
        Alert.alert('Success', 'Payment successful!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Appointments'),
          },
        ]);
      } else {
        Alert.alert('Error', 'Payment verification failed');
      }
    } catch (error) {
      if (error.code !== 'RazorpayCheckout.CANCELLED') {
        Alert.alert('Error', error.description || 'Payment failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        {order && (
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order ID:</Text>
              <Text style={styles.detailValue}>{order.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount:</Text>
              <Text style={styles.detailValue}>₹{order.amount / 100}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Currency:</Text>
              <Text style={styles.detailValue}>{order.currency}</Text>
            </View>
          </View>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text style={styles.methodText}>Razorpay Secure Payment</Text>
        <Text style={styles.methodSubtext}>
          Your payment is secured by Razorpay
        </Text>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Pay Now"
          onPress={handlePayment}
          loading={loading}
          disabled={!order}
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
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  methodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  methodSubtext: {
    fontSize: 12,
    color: '#666',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default PaymentScreen;

