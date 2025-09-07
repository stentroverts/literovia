# Send Missed Confirmation Emails - Quick Guide

## 🎯 For Users Who Registered Successfully But Didn't Receive Confirmation Emails

### Step 1: Gather User Information
You need these details for each user:
- ✅ Email address
- ✅ Full name
- ✅ Phone number
- ✅ College name
- ✅ Year of study
- ✅ Course/Branch
- ✅ Payment ID (from Razorpay dashboard or user)
- ✅ Registration ID (check Google Sheets)

### Step 2: Open Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Open your **Literovia Registration** project
3. Open the `registration.js` file

### Step 3: Use the Email Function
Find the function `sendMissedConfirmationEmails()` and replace the placeholder data:

```javascript
const missedUsers = [
  {
    email: 'actual.user@email.com',           // Replace with real email
    fullName: 'Actual User Name',             // Replace with real name
    phone: '9876543210',                      // Replace with real phone
    college: 'VNRVJIET',                      // Replace with real college
    year: '2nd Year',                         // Replace with real year
    course: 'Computer Science',               // Replace with real course
    paymentId: 'pay_ActualPaymentID',         // Replace with real payment ID
    registrationId: 'LIT_ActualRegID'        // Replace with real reg ID
  },
  // Add more users by copying the above structure
];
```

### Step 4: Run the Function
1. Save the file (Ctrl+S)
2. Select `sendMissedConfirmationEmails` from the function dropdown
3. Click the **Run** button (▶️)
4. Grant permissions if asked
5. Check the logs for success/failure messages

### Step 5: Verify Results
- Check the execution log for success messages
- Ask users to check their email (including spam folder)
- Verify in your Gmail sent folder

---

## 🚨 Quick Alternative: Manual Email Method

If Google Apps Script isn't working, you can send emails manually:

### Option A: Using Gmail Template
1. Copy the HTML template from the function
2. Create a new Gmail draft
3. Paste as HTML content
4. Replace variables with actual user data
5. Send manually

### Option B: Using Email Marketing Tool
1. Export user data to CSV
2. Use Mailchimp, SendGrid, or similar service
3. Create email template
4. Send bulk emails

---

## 📋 Example User Data Format

```javascript
{
  email: 'john.doe@example.com',
  fullName: 'John Doe',
  phone: '9876543210',
  college: 'VNRVJIET',
  year: '3rd Year',
  course: 'Electronics and Communication',
  paymentId: 'pay_MJn8xKZ9D8Pk7Y',
  registrationId: 'LIT67890ABC'
}
```

---

## ⚠️ Important Notes

1. **Double-check email addresses** - Wrong emails will bounce
2. **Use real Payment IDs** - Get these from Razorpay dashboard
3. **Get Registration IDs** - Check your Google Sheets
4. **Test with one email first** - Make sure everything works
5. **Check Gmail limits** - Don't send too many at once

---

## 🔍 How to Find Missing Information

### Registration IDs:
- Open your Google Sheets
- Search for user's email or name
- Registration ID is in column B

### Payment IDs:
- Log into Razorpay Dashboard
- Go to Payments section
- Search by email or amount
- Copy the Payment ID (starts with `pay_`)

### User Details:
- Ask users directly
- Check Razorpay payment notes
- Look in Google Sheets if partially saved

---

## 🎉 Success Indicators

You'll know it worked when:
- ✅ Function logs show "Email sent successfully"
- ✅ Users receive confirmation emails
- ✅ No errors in Google Apps Script console
- ✅ Emails appear in your Gmail sent folder

---

**Need Help?** Check the Google Apps Script execution logs for detailed error messages.
