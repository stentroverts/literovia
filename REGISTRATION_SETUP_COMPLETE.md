# Literovia Registration System - Complete Setup Guide

## 🚀 What We've Created

A complete registration system with:

1. **Google Apps Script Backend** - Handles form submissions and stores data
2. **Professional Registration Form** - Responsive, beautiful form matching your website design
3. **Automated Email Confirmations** - Sends confirmation emails to registrants
4. **Data Storage** - All registrations saved to Google Sheets
5. **Updated Website Buttons** - All "Register NOW" buttons now redirect to the form

## 📁 Files Created

### Google Apps Script Files:
- `google-apps-script/registration-form.js` - Backend logic
- `google-apps-script/registration-form.html` - Registration form
- `google-apps-script/SETUP_INSTRUCTIONS.md` - Detailed setup guide

### Website Updates:
- `src/config/registration.ts` - Centralized registration configuration
- Updated `src/components/HeroSection.tsx` - Uses registration helper
- Updated `src/components/RegisterSection.tsx` - Uses registration helper

## ⚡ Quick Setup Steps

### 1. Set Up Google Apps Script (5 minutes)

1. Go to [script.google.com](https://script.google.com)
2. Create new project named "Literovia Registration Form"
3. Copy code from `registration-form.js` into Code.gs
4. Add HTML file named `registration-form` with content from `registration-form.html`
5. Deploy as web app (Anyone can access)
6. Copy the deployment URL

### 2. Update Your Website (2 minutes)

1. Replace `YOUR_SCRIPT_ID` in `src/config/registration.ts` with your actual script ID
2. The script ID is the part between `/s/` and `/exec` in your deployment URL

Example:
```
URL: https://script.google.com/macros/s/AKfycbx123...abc/exec
Script ID: AKfycbx123...abc
```

### 3. Test Everything (2 minutes)

1. Run your website: `npm run dev`
2. Click any "Register NOW" button
3. Fill out and submit the test form
4. Check your Google Drive for "Literovia Registrations" spreadsheet

## 🎯 Features Included

### Registration Form Features:
- ✅ **Responsive Design** - Works perfectly on mobile and desktop
- ✅ **Dark Theme** - Matches your website's aesthetic
- ✅ **Data Validation** - Ensures all required fields are properly filled
- ✅ **Event Selection** - Users can choose specific events or all events
- ✅ **Email Confirmation** - Automatic confirmation emails
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Loading States** - Shows progress during submission

### Data Collection:
- Full Name
- Email Address
- Phone Number
- College/Institution
- Year of Study
- Course/Branch
- Events to Participate
- Dietary Requirements (Optional)
- Additional Information (Optional)
- Automatic Timestamp

### Website Integration:
- ✅ **Hero Section Button** - "Register NOW" redirects to form
- ✅ **Register Section Button** - "Register Now" redirects to form
- ✅ **Centralized Configuration** - Easy to update URLs and settings
- ✅ **Error Handling** - Shows helpful messages if form isn't ready

## 🔧 Configuration Options

Edit `src/config/registration.ts` to customize:

```typescript
export const REGISTRATION_CONFIG = {
  FORM_URL: 'YOUR_DEPLOYMENT_URL_HERE',
  REGISTRATION_OPEN: true, // Set to false to disable registration
  MAX_REGISTRATIONS: 500, // Set limit or null for unlimited
  // ... other settings
};
```

## 📊 Managing Registrations

### View Registrations:
1. Open Google Drive
2. Find "Literovia Registrations" spreadsheet
3. All data is automatically organized with timestamps

### Export Data:
1. Open the spreadsheet
2. File > Download > Choose format (Excel, CSV, PDF)

### Send Updates:
- Use the email addresses from the spreadsheet
- Or add bulk email functionality to the script

## 🎨 Customization

### Form Styling:
Edit the CSS in `registration-form.html` to match your exact brand colors.

### Form Fields:
Modify both `registration-form.html` (frontend) and `registration-form.js` (backend) to add/remove fields.

### Email Template:
Update the `sendConfirmationEmail` function in `registration-form.js`.

## 🔒 Security & Privacy

- ✅ **Secure**: Form uses HTTPS and Google's infrastructure
- ✅ **Private**: Only you can access the registration data
- ✅ **GDPR Compliant**: Collects only necessary information
- ✅ **No Tracking**: No third-party analytics or tracking

## 🚨 Troubleshooting

### "Registration form is being set up" message:
- Update `YOUR_SCRIPT_ID` in `src/config/registration.ts`

### Form not submitting:
- Check Google Apps Script permissions
- Ensure deployment is set to "Anyone can access"

### No confirmation email:
- Check spam folder
- Verify Gmail account has permission to send emails

## 📈 Next Steps

1. **Set up the Google Apps Script** (follow detailed instructions)
2. **Update your registration configuration**
3. **Test with a few team members**
4. **Share the registration URL** on social media
5. **Monitor registrations** through the Google Sheet

## 🎉 Benefits

- **Professional** - Clean, responsive design
- **Reliable** - Built on Google's infrastructure
- **Free** - No additional costs or subscriptions
- **Scalable** - Handles hundreds of registrations easily
- **Integrated** - Seamlessly works with your existing website
- **Data Ownership** - All data stays in your Google account

Your registration system is now ready to handle Literovia 2025 registrations! 🚀
