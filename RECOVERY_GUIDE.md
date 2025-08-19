# Recovery Tools Guide

If payments succeed but registrations fail, use these tools to recover the data:

## How to Use Recovery Tools

### 1. Frontend Recovery (Browser)
When users report payment success but no confirmation email:

1. Ask user to open browser console (F12)
2. Tell them to paste this code and press Enter:
```javascript
// Copy all code from: src/utils/recovery/frontend-recovery.js
// Then run this function:
extractRecoveryData()
```
3. User sends you the output (payment ID + form data)

### 2. Backend Recovery (Google Apps Script)
Once you have the payment data:

1. Open Google Apps Script editor
2. Copy all code from: `google-apps-script/recovery-tools.js`  
3. Run the recovery function with user data

## Quick Recovery Steps

1. **Get Payment IDs** from Razorpay dashboard
2. **Get User Details** from frontend recovery or Razorpay
3. **Run Recovery Script** in Google Apps Script
4. **Verify** registration appears in Google Sheets
5. **Send Manual Email** if needed

## Example Recovery

```javascript
// In Google Apps Script console:
recoverRegistrationsFromPaymentData([
  {
    paymentId: "pay_XXXXXX",
    email: "user@email.com",
    fullName: "John Doe",
    phone: "1234567890",
    college: "ABC College",
    year: "2",
    course: "BTech"
  }
]);
```

That's it! Keep it simple.
