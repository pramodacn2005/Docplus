# Contact Details Update Guide

## Problem Fixed ✅
The contact details were hardcoded in multiple files, making it difficult to update them consistently across the website.

## Solution Implemented ✅
Created a centralized contact configuration system that allows you to update contact details in one place and have them reflect across the entire website.

## How to Update Contact Details

### 1. Open the Configuration File
Navigate to: `frontend/src/config/contactInfo.js`

### 2. Update the Contact Information
Edit the `contactInfo` object with your new details:

```javascript
export const contactInfo = {
  // Office Address
  address: {
    line1: "Your New Address Line 1",
    line2: "Your New Address Line 2", 
    country: "YOUR COUNTRY"
  },
  
  // Contact Details
  phone: "your-new-phone-number",
  email: "your-new-email@example.com",
  
  // Social Media Links (optional)
  social: {
    facebook: "your-facebook-url",
    twitter: "your-twitter-url", 
    instagram: "your-instagram-url",
    linkedin: "your-linkedin-url"
  },
  
  // Company Information
  company: {
    name: "Your Company Name",
    description: "Your company description..."
  }
}
```

### 3. Save and Refresh
- Save the file
- Refresh your website
- The changes will automatically appear on:
  - Contact page (`/contact`)
  - Footer (on all pages)

## Files Updated ✅
- ✅ `frontend/src/config/contactInfo.js` - New centralized configuration
- ✅ `frontend/src/pages/Contact.jsx` - Now uses centralized data
- ✅ `frontend/src/components/Footer.jsx` - Now uses centralized data

## Benefits
- ✅ Single source of truth for contact information
- ✅ Easy to update across entire website
- ✅ Consistent contact details everywhere
- ✅ No more hardcoded values scattered across files

## Testing
After updating the contact details in `contactInfo.js`, check:
1. Contact page shows new details
2. Footer shows new details on all pages
3. All contact information is consistent

