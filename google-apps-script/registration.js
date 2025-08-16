/**
 * LITEROVIA REGISTRATION HANDLER WITH RAZORPAY INTEGRATION
 * Handles registration with Razorpay payment integration only
 */

const SHEET_ID = '1FJDyNld7pRob_D6kRqwRKSOxco8rdMEVRMyJH9u-sPk';

function doPost(e) {
  try {
    console.log('🚀 Registration started (Razorpay Only)');
    
    // Get form data
    const data = e.parameter;
    console.log('📋 Received data keys:', Object.keys(data));
    console.log('📋 Full data:', JSON.stringify(data, null, 2));
    
    // Generate registration ID
    const regId = 'LIT' + Date.now().toString(36).toUpperCase();
    
    // Handle Razorpay payment information only
    let paymentStatus = 'pending';
    let paymentId = 'NOT_PROVIDED';
    let paymentAmount = 149; // Default amount
    
    console.log('🔍 Checking Razorpay payment data...');
    console.log('paymentId:', data.paymentId);
    console.log('paymentStatus:', data.paymentStatus);
    console.log('paymentAmount:', data.paymentAmount);
    
    if (data.paymentId && data.paymentId.trim() && data.paymentId !== 'undefined' && data.paymentId !== '') {
      paymentId = data.paymentId.trim();
      paymentStatus = data.paymentStatus || 'completed';
      paymentAmount = parseFloat(data.paymentAmount) || 149;
      console.log('✅ Razorpay payment info found:', { paymentId, paymentStatus, paymentAmount });
    } else {
      console.log('❌ No Razorpay payment information provided');
      paymentStatus = 'no_payment';
      paymentId = 'NOT_PROVIDED';
    }
    
    // Save to Google Sheets
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    // Column structure for Razorpay only
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
      paymentId,          // J: Razorpay Payment ID
      paymentAmount       // K: Payment Amount
    ]);
    
    console.log('✅ Data saved to sheets');
    
    // Send email confirmation for Razorpay payments only
    try {
      const subject = 'Literovia 2025 Registration Confirmed - ' + regId;
      
      // Create email content for Razorpay payment only
      let paymentSection = '';
      if (paymentStatus === 'completed' && paymentId.startsWith('pay_')) {
        paymentSection = '\n[PAYMENT CONFIRMED] Payment via Razorpay\n- Payment ID: ' + paymentId + '\n- Amount Paid: Rs.' + paymentAmount + '\n- Status: Successfully Completed\n- Method: Secure Online Payment';
      } else {
        paymentSection = '\n[PAYMENT PENDING] Payment Status: ' + paymentStatus.toUpperCase() + '\n- Registration ID: ' + regId + '\n- Amount Due: Rs.' + paymentAmount + '\n- Please complete payment through Razorpay if not already done';
      }
      
      // Create HTML email body with header image
      const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #dc2626; margin-bottom: 10px; font-size: 18px; border-bottom: 2px solid #dc2626; padding-bottom: 5px; }
        .detail-item { margin: 8px 0; }
        .detail-label { font-weight: bold; color: #666; }
        .payment-confirmed { background: #d4f6d4; border-left: 4px solid #22c55e; padding: 15px; border-radius: 4px; }
        .payment-pending { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px; }
        .event-details { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
        .footer p { margin: 5px 0; font-size: 14px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>LITEROVIA 2025</h1>
            <p>A Stentorian Odyssey</p>
            <p>Registration Confirmation</p>
        </div>
        
        <div class="content">
            <p><strong>Dear ${data.fullName},</strong></p>
            <p>Congratulations! Your registration for Literovia 2025 has been successfully received.</p>
            
            <div class="section">
                <h2>Registration Details</h2>
                <div class="detail-item"><span class="detail-label">Registration ID:</span> ${regId}</div>
                <div class="detail-item"><span class="detail-label">Name:</span> ${data.fullName}</div>
                <div class="detail-item"><span class="detail-label">Email:</span> ${data.email}</div>
                <div class="detail-item"><span class="detail-label">Phone:</span> ${data.phone}</div>
                <div class="detail-item"><span class="detail-label">College:</span> ${data.college}</div>
                <div class="detail-item"><span class="detail-label">Year:</span> ${data.year}</div>
                <div class="detail-item"><span class="detail-label">Course:</span> ${data.course}</div>
            </div>
            
            <div class="section">
                <h2>Payment Information</h2>
                <div class="${paymentStatus === 'completed' && paymentId.startsWith('pay_') ? 'payment-confirmed' : 'payment-pending'}">
                    ${paymentStatus === 'completed' && paymentId.startsWith('pay_') ? 
                        `<strong>✓ Payment Confirmed via Razorpay</strong><br>
                         Payment ID: ${paymentId}<br>
                         Amount Paid: ₹${paymentAmount}<br>
                         Status: Successfully Completed<br>
                         Method: Secure Online Payment` :
                        `<strong>⏳ Payment Status: ${paymentStatus.toUpperCase()}</strong><br>
                         Registration ID: ${regId}<br>
                         Amount Due: ₹${paymentAmount}<br>
                         Please complete payment through Razorpay if not already done`}
                </div>
            </div>
            
            <div class="section">
                <h2>Event Details</h2>
                <div class="event-details">
                    <div class="detail-item"><span class="detail-label">Event:</span> Literovia 2025 - A Stentorian Odyssey</div>
                    <div class="detail-item"><span class="detail-label">Dates:</span> September 8-9, 2025</div>
                    <div class="detail-item"><span class="detail-label">Venue:</span> VNRVJIET Campus</div>
                </div>
            </div>
            
            <p>Thank you for joining us for this literary odyssey! We'll contact you soon with more details about the event schedule, venue information, and what to expect.</p>
            
            <p>For any queries, contact us at <a href="mailto:stentorian@vnrvjiet.in">stentorian@vnrvjiet.in</a></p>
        </div>
        
        <div class="footer">
            <p><strong>Best regards,<br>The Literovia Team<br>Stentorians Club, VNRVJIET</strong></p>
            <p><em>This is an automated confirmation email. Please keep this for your records.</em></p>
        </div>
    </div>
</body>
</html>`;
      
      // Send HTML email
      GmailApp.sendEmail(data.email, subject, '', {
        htmlBody: htmlBody
      });
      console.log('Email sent with payment status:', paymentStatus);
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
  return ContentService.createTextOutput('Literovia Registration API (Razorpay Only) is running!');
}
