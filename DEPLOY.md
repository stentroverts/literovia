# LITEROVIA REGISTRATION DEPLOYMENT

## How It Works
User fills registration form → Clicks "Pay & Register" → Razorpay payment gateway opens → After successful payment → Registration data saved in Google Sheets → Email confirmation sent

## Deploy Steps

1. **Google Apps Script**
   - Go to https://script.google.com
   - Create new project
   - Copy paste `google-apps-script/registration.js`
   - Deploy as web app (Execute as "Me", Access "Anyone")
   - Copy web app URL

2. **Update Frontend**
   - Edit `src/config/google-sheets.ts`
   - Replace SCRIPT_URL with your web app URL
   - Update `src/config/razorpay.ts` with your Razorpay keys (if different)

3. **Razorpay Setup**
   - Current test keys are already configured in `src/config/razorpay.ts`
   - For production, replace with live keys
   - Current amount is set to ₹149 (14900 paise)

4. **Test**
   - Fill registration form 
   - Click "Pay ₹149 & Register"
   - Complete payment via Razorpay
   - Check Google Sheets for registration with payment ID
   - Check email confirmation

## Changing Registration Amount

To change the registration fee from ₹149:

1. **Frontend**: Edit `src/config/razorpay.ts`
   ```typescript
   PASS_AMOUNT: 14900, // Change this (amount in paise: ₹149 = 14900 paise)
   ```

2. **Google Apps Script**: Edit `google-apps-script/registration.js`
   ```javascript
   paymentAmount = parseFloat(data.paymentAmount) || 149; // Update fallback amount
   ```

## Razorpay API Keys
- **Test Key ID**: `rzp_test_J2WMFtkzHidr8Y`
- **Test Key Secret**: `SUCbeM387rMK70zNCoAKohKa`
- Location: `src/config/razorpay.ts`

⚠️ **Important**: For production, replace test keys with live Razorpay keys and ensure the key secret is stored securely on the server side.

## Google Sheets Structure
The updated sheet will have these columns:
1. Timestamp
2. Registration ID  
3. Full Name
4. Email
5. Phone
6. College
7. Year
8. Course
9. Payment Status
10. Payment ID (Razorpay transaction ID)
11. Payment Amount
12. Screenshot Link (fallback for old method)

## Fallback Support
The system still supports the old Google Drive link method as a fallback for users who cannot complete Razorpay payment.
