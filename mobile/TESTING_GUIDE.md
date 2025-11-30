# Testing Guide - After Scanning QR Code

## ✅ What to Do After Scanning

### 1. **First Launch**
- The app should load in Expo Go
- You'll see the **Login Screen**
- If you see errors, check the troubleshooting section below

### 2. **Test Patient Flow**

#### Register New Account
1. Tap **"Register"** on login screen
2. Fill in:
   - Full Name
   - Email
   - Password (min 8 characters)
   - Confirm Password
3. Tap **"Register"**
4. Should automatically log you in

#### Browse Doctors
1. Go to **"Doctors"** tab
2. You should see list of doctors
3. Use search bar to filter
4. Tap speciality chips to filter by type
5. Tap a doctor card to view profile

#### Book Appointment
1. From doctor profile, tap **"Book Appointment"**
2. Select a date (next 7 days available)
3. Select a time slot (available slots shown)
4. Tap **"Book Appointment"**
5. Should redirect to payment screen

#### Make Payment
1. Review payment details
2. Tap **"Pay Now"**
3. Razorpay payment screen should open
4. Use test credentials or cancel to test flow
5. After payment, appointment should be confirmed

#### View Appointments
1. Go to **"Appointments"** tab
2. See all your appointments
3. Tap **"Pay Now"** if payment pending
4. Tap **"Cancel"** to cancel appointment

#### Update Profile
1. Go to **"Profile"** tab
2. Tap profile image to change photo
3. Update personal information
4. Tap **"Update Profile"**

### 3. **Test Doctor Flow**

#### Login as Doctor
1. On login screen, tap **"Doctor"** button
2. Enter doctor email and password
3. Tap **"Login"**

#### View Dashboard
1. See statistics:
   - Total appointments
   - Number of patients
   - Total earnings

#### Manage Appointments
1. Go to **"Appointments"** tab
2. See all appointments
3. Tap **"Mark Complete"** when done
4. Tap **"Cancel"** to cancel if needed

#### Update Profile
1. Go to **"Profile"** tab
2. Update consultation fees
3. Update address
4. Toggle availability

### 4. **Test Admin Flow**

#### Login as Admin
1. On login screen, tap **"Admin"** button
2. Enter admin credentials:
   - Email: `admin@gmail.com`
   - Password: `docplus123`

#### View Dashboard
1. See overview statistics
2. View recent appointments

#### Manage Doctors
1. Go to **"Doctors"** tab
2. See all doctors
3. Tap **"Add Doctor"** to add new doctor
4. Toggle doctor availability

#### View All Appointments
1. Go to **"Appointments"** tab
2. See all appointments from all users
3. Cancel appointments if needed

## 🔧 Troubleshooting

### Network Error / Can't Connect to Backend

**If testing on physical device:**

1. Find your computer's IP address:
   - Windows: Open Command Prompt, type `ipconfig`
   - Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Update API URL:
   - Open `src/config/api.js`
   - Change `localhost` to your IP:
   ```javascript
   export const API_BASE_URL = __DEV__ 
     ? 'http://192.168.1.XXX:4000/api'  // Replace XXX with your IP
     : 'https://your-backend-url.com/api';
   ```

3. Make sure:
   - Backend is running on port 4000
   - Phone and computer are on same WiFi network
   - Firewall allows connections on port 4000

### App Crashes or Shows Blank Screen

1. **Check Metro Bundler:**
   - Look at terminal where you ran `npm start`
   - Check for red error messages
   - Fix any import or syntax errors

2. **Reload App:**
   - Shake device (or press `Ctrl+M` on Android emulator)
   - Tap "Reload"
   - Or press `r` in terminal

3. **Clear Cache:**
   ```bash
   npm start -- --clear
   ```

### Login Not Working

1. **Check Backend:**
   - Ensure backend server is running
   - Check backend terminal for errors
   - Verify database connection

2. **Check Credentials:**
   - Use correct email/password
   - For admin: `admin@gmail.com` / `docplus123`
   - For doctor: Use credentials from your database

### Payment Not Working

1. **Configure Razorpay:**
   - Open `src/screens/patient/PaymentScreen.js`
   - Replace `'YOUR_RAZORPAY_KEY_ID'` with your actual key
   - Use test keys for development

2. **Check Backend:**
   - Ensure Razorpay keys are in backend `.env` file
   - Backend should create orders successfully

### Images Not Loading

1. **Check Backend:**
   - Ensure Cloudinary is configured
   - Check backend `.env` for Cloudinary credentials

2. **Check Permissions:**
   - Allow camera roll access when prompted
   - Check app permissions in device settings

## 📱 Development Tips

### Hot Reload
- Changes automatically reload in Expo Go
- No need to restart app
- Press `r` in terminal to manually reload

### Debugging
- Shake device to open developer menu
- Enable "Debug Remote JS" to use Chrome DevTools
- Check console logs in terminal

### Testing Different User Types
- Logout and login as different user types
- Test all three flows: Patient, Doctor, Admin

## ✅ Checklist

After scanning, verify:

- [ ] App loads without errors
- [ ] Login screen appears
- [ ] Can register new patient account
- [ ] Can login with credentials
- [ ] Can browse doctors
- [ ] Can view doctor profiles
- [ ] Can book appointments
- [ ] Can make payments (or test payment flow)
- [ ] Can view appointments
- [ ] Can update profile
- [ ] Can login as doctor
- [ ] Can login as admin
- [ ] All screens navigate correctly
- [ ] No crashes or errors

## 🚀 Next Steps

1. **Test all features** thoroughly
2. **Fix any bugs** you encounter
3. **Customize UI/UX** as needed
4. **Add your app icons** to `assets/` folder
5. **Configure Razorpay** with real keys for production
6. **Test on both iOS and Android**
7. **Prepare for production build**

## 📞 Need Help?

- Check terminal for error messages
- Review backend logs
- Check Expo documentation
- Verify all environment variables are set

