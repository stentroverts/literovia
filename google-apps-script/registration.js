/**
 * LITEROVIA REGISTRATION HANDLER WITH RAZORPAY INTEGRATION
 * Handles registration with Razorpay payment integration
 */

const SHEET_ID = '1pJoqI0bF---YbTt3R2q6nA8TnftyvIYSndDF3xYGkPU';

function doPost(e) {
  try {
    console.log('🚀 Registration started (Razorpay Version)');
    
    // Get form data
    const data = e.parameter;
    console.log('📋 Received data keys:', Object.keys(data));
    console.log('📋 Full data:', JSON.stringify(data, null, 2));
    
    // Generate registration ID
    const regId = 'LIT' + Date.now().toString(36).toUpperCase();
    
    // Handle payment information with detailed logging
    let paymentStatus = 'pending';
    let paymentId = 'NOT_PROVIDED';
    let paymentAmount = 149; // Default amount
    
    console.log('🔍 Checking payment data...');
    console.log('paymentId:', data.paymentId);
    console.log('paymentStatus:', data.paymentStatus);
    console.log('paymentAmount:', data.paymentAmount);
    
    if (data.paymentId && data.paymentId.trim() && data.paymentId !== 'undefined' && data.paymentId !== '') {
      paymentId = data.paymentId.trim();
      paymentStatus = data.paymentStatus || 'completed';
      paymentAmount = parseFloat(data.paymentAmount) || 149;
      console.log('✅ Razorpay payment info found:', { paymentId, paymentStatus, paymentAmount });
    } else if (data.screenshotLink && data.screenshotLink.trim()) {
      // Fallback for old method (Google Drive links)
      const driveLink = data.screenshotLink.trim();
      if (driveLink.includes('drive.google.com') || driveLink.includes('docs.google.com')) {
        paymentStatus = 'link_provided';
        paymentId = 'DRIVE_LINK';
        paymentAmount = 149;
        console.log('✅ Google Drive link provided (fallback method)');
      } else {
        paymentStatus = 'invalid_link';
        paymentId = 'INVALID_LINK';
        console.log('❌ Invalid Google Drive link');
      }
    } else {
      console.log('❌ No payment information provided');
      paymentStatus = 'no_payment';
      paymentId = 'NOT_PROVIDED';
    }
    
    // Save to Google Sheets with updated structure
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    // Updated column structure
    sheet.appendRow([
      timestamp,           // A: Timestamp
      regId,              // B: Registration ID
      data.fullName,      // C: Full Name
      data.email,         // D: Email
      data.phone,         // E: Phone
      data.college,       // F: College
      data.year,          // G: Year
      data.course,        // H: Course
      paymentStatus,      // I: Payment Status
      paymentId,          // J: Payment ID (Razorpay ID or DRIVE_LINK)
      paymentAmount,      // K: Payment Amount
      data.screenshotLink || '' // L: Screenshot Link (for fallback)
    ]);
    
    console.log('✅ Data saved to sheets');
    
    // Send email confirmation with dynamic content based on payment method
    try {
      const subject = `Literovia 2025 Registration Confirmed - ${regId}`;
      
      // Create dynamic email content based on payment status
      let paymentSection = '';
      if (paymentStatus === 'completed' && paymentId.startsWith('pay_')) {
        // Razorpay payment
        paymentSection = `
✅ Payment Confirmed via Razorpay
- Payment ID: ${paymentId}
- Amount Paid: ₹${paymentAmount}
- Status: Successfully Completed
- Method: Online Payment Gateway`;
      } else if (paymentStatus === 'link_provided') {
        // Google Drive fallback
        paymentSection = `
📎 Payment Screenshot Received
- Status: Link Provided (Manual Verification Required)
- Amount: ₹${paymentAmount}
- Method: Google Drive Upload`;
      } else {
        // No payment or pending
        paymentSection = `
⏳ Payment Status: ${paymentStatus.toUpperCase()}
- Registration ID: ${regId}
- Amount Due: ₹${paymentAmount}
- Please complete payment if not already done`;
      }
      
      const body = `
Dear ${data.fullName},

🎉 Your registration for Literovia 2025 has been received!

📋 Registration Details:
- Registration ID: ${regId}
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
- College: ${data.college}
- Year: ${data.year}
- Course: ${data.course}

💳 Payment Information:${paymentSection}

📅 Event Details:
- Event: Literovia 2025 - A Stentorian Odyssey
- Dates: September 8-9, 2025
- Venue: VNRVJIET Campus

Thank you for joining us for this literary odyssey! We'll contact you soon with more details about the event schedule, venue information, and what to expect.

For any queries, contact us at stentorian@vnrvjiet.in

Best regards,
The Literovia Team
Stentorians Club, VNRVJIET

---
This is an automated confirmation email. Please keep this for your records.
      `;
      
      GmailApp.sendEmail(data.email, subject, body);
      console.log('✅ Email sent with payment status:', paymentStatus);
    } catch (emailError) {
      console.error('❌ Email failed:', emailError);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        registrationId: regId,
        message: 'Registration successful! Check your email for confirmation.',
        paymentStatus: paymentStatus,
        paymentId: paymentId,
        amount: paymentAmount
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('💥 Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Literovia Registration API (Razorpay Version) is running!');
}
