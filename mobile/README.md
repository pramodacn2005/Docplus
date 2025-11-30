# Doc+ Mobile App

A React Native mobile application for the Doc+ healthcare appointment booking platform.

## Features

- **Patient Features:**
  - Browse and search doctors
  - Filter by speciality
  - View doctor profiles
  - Book appointments with time slots
  - Razorpay payment integration
  - View and manage appointments
  - Profile management with image upload

- **Doctor Features:**
  - Dashboard with statistics
  - View appointments
  - Mark appointments as complete
  - Cancel appointments
  - Update profile and availability

- **Admin Features:**
  - Dashboard with overview statistics
  - Manage doctors (add, view, toggle availability)
  - View all appointments
  - Cancel appointments

## Tech Stack

- React Native (Expo)
- React Navigation (Stack + Tab)
- Axios for API calls
- AsyncStorage for local storage
- React Native Razorpay for payments
- Expo Image Picker for image uploads
- Context API for state management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)
- Backend API running (Node.js/Express)

## Installation

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint:
   - Update `src/config/api.js` with your backend URL
   - For development: `http://localhost:4000/api` (use your machine's IP for physical device)
   - For production: Update with your deployed backend URL

4. Configure Razorpay:
   - Update `src/screens/patient/PaymentScreen.js` with your Razorpay Key ID
   - Replace `'YOUR_RAZORPAY_KEY_ID'` with your actual key

## Running the App

### Development

1. Start the Expo development server:
```bash
npm start
```

2. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

## Project Structure

```
mobile/
├── src/
│   ├── components/
│   │   └── common/          # Reusable components
│   ├── config/
│   │   └── api.js           # API configuration
│   ├── context/
│   │   └── AuthContext.js   # Authentication context
│   ├── navigation/
│   │   ├── RootNavigator.js
│   │   ├── AuthNavigator.js
│   │   ├── PatientNavigator.js
│   │   ├── DoctorNavigator.js
│   │   └── AdminNavigator.js
│   ├── screens/
│   │   ├── auth/            # Login & Register
│   │   ├── patient/         # Patient screens
│   │   ├── doctor/          # Doctor screens
│   │   ├── admin/           # Admin screens
│   │   └── common/          # Common screens
│   └── services/
│       ├── apiService.js    # API service layer
│       └── cloudinaryService.js
├── App.js                   # Root component
├── package.json
└── README.md
```

## API Integration

The app connects to your existing MERN backend. Ensure your backend is running and accessible.

### Backend Endpoints Used:

**User/Patient:**
- POST `/api/user/register`
- POST `/api/user/login`
- GET `/api/user/get-profile`
- POST `/api/user/update-profile`
- POST `/api/user/book-appointment`
- GET `/api/user/appointments`
- POST `/api/user/cancel-appointment`
- POST `/api/user/payment-razorpay`
- POST `/api/user/verifyRazorpay`

**Doctor:**
- GET `/api/doctor/list`
- POST `/api/doctor/login`
- GET `/api/doctor/appointments`
- POST `/api/doctor/complete-appointment`
- POST `/api/doctor/cancel-appointment`
- GET `/api/doctor/dashboard`
- GET `/api/doctor/profile`
- POST `/api/doctor/update-profile`

**Admin:**
- POST `/api/admin/login`
- POST `/api/admin/add-doctor`
- GET `/api/admin/all-doctors`
- POST `/api/admin/change-availability`
- GET `/api/admin/appointments`
- POST `/api/admin/cancel-appointment`
- GET `/api/admin/dashboard`

## Environment Variables

Create a `.env` file in the mobile directory (optional, can also hardcode in config):

```
API_BASE_URL=http://localhost:4000/api
RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Important Notes

1. **Network Configuration:**
   - For physical device testing, replace `localhost` with your computer's IP address
   - Example: `http://192.168.1.100:4000/api`

2. **Razorpay Integration:**
   - Ensure you have Razorpay Mobile SDK properly configured
   - Update the Razorpay Key ID in PaymentScreen.js
   - Test with Razorpay test keys first

3. **Image Upload:**
   - Profile images are uploaded through the backend API
   - Backend handles Cloudinary upload
   - Ensure backend has proper CORS configuration

4. **Authentication:**
   - JWT tokens are stored in AsyncStorage
   - Tokens are automatically included in API requests
   - Logout clears all stored data

## Building for Production

### Android APK:
```bash
expo build:android
```

### iOS IPA:
```bash
expo build:ios
```

Or use EAS Build:
```bash
npm install -g eas-cli
eas build
```

## Troubleshooting

1. **Network errors:**
   - Check if backend is running
   - Verify API_BASE_URL is correct
   - For physical device, use IP address instead of localhost

2. **Razorpay not working:**
   - Verify Razorpay Key ID is correct
   - Check if Razorpay SDK is properly installed
   - Ensure test mode keys are used for development

3. **Image upload issues:**
   - Check camera roll permissions
   - Verify backend Cloudinary configuration
   - Ensure FormData is properly formatted

## License

ISC

## Support

For issues or questions, please refer to the main project documentation.

