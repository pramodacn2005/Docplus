# Doc+ Mobile App Setup Guide

## Quick Start

1. **Install Dependencies:**
   ```bash
   cd mobile
   npm install
   ```

2. **Configure Backend URL:**
   - Open `src/config/api.js`
   - Update `API_BASE_URL` with your backend URL
   - For local development with physical device, use your computer's IP:
     ```javascript
     export const API_BASE_URL = 'http://192.168.1.XXX:4000/api';
     ```

3. **Configure Razorpay:**
   - Open `src/screens/patient/PaymentScreen.js`
   - Replace `'YOUR_RAZORPAY_KEY_ID'` with your actual Razorpay Key ID

4. **Start Development Server:**
   ```bash
   npm start
   ```

5. **Run on Device:**
   - Scan QR code with Expo Go app (Android) or Camera (iOS)
   - Or run: `npm run android` / `npm run ios`

## Backend Requirements

Ensure your backend:
- Is running and accessible
- Has CORS enabled for mobile requests
- Has proper JWT secret configured
- Has Cloudinary configured for image uploads
- Has Razorpay keys configured

## Testing Credentials

Use the same credentials as your web app:
- **Patient:** Register new account or use existing
- **Doctor:** Use doctor credentials from your database
- **Admin:** Default: admin@gmail.com / docplus123

## Common Issues

### Network Error
- Check backend is running
- Verify API_BASE_URL is correct
- For physical device, use IP address not localhost
- Check firewall settings

### Razorpay Not Working
- Verify Razorpay Key ID is correct
- Check if using test keys for development
- Ensure Razorpay SDK is installed: `npm install react-native-razorpay`

### Image Upload Fails
- Check camera roll permissions
- Verify backend Cloudinary configuration
- Ensure FormData is properly formatted

### Authentication Issues
- Check JWT secret matches backend
- Verify token is being stored in AsyncStorage
- Check network requests in debugger

## Project Structure

```
mobile/
├── src/
│   ├── components/     # Reusable UI components
│   ├── config/         # Configuration files
│   ├── context/        # React Context (Auth)
│   ├── navigation/     # Navigation setup
│   ├── screens/        # All app screens
│   └── services/       # API services
├── App.js              # Root component
└── package.json        # Dependencies
```

## Next Steps

1. Test all user flows (Patient, Doctor, Admin)
2. Customize UI/UX as needed
3. Add error handling improvements
4. Test on both iOS and Android
5. Configure for production build

## Production Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

