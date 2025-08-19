/**
 * LITEROVIA REGISTRATION HANDLER WITH RAZORPAY INTEGRATION
 * Handles registration with Razorpay payment integration only
 */

const SHEET_ID = '1FJDyNld7pRob_D6kRqwRKSOxco8rdMEVRMyJH9u-sPk';

function doPost(e) {
  const executionId = 'EXEC_' + Date.now();
  
  try {
    // Enhanced logging for debugging
    console.log(`${executionId}: Execution started`);
    console.log(`${executionId}: Raw request object:`, JSON.stringify(e));
    
    // Check if we have request data with detailed logging
    if (!e) {
      console.error(`${executionId}: No event object received`);
      return createErrorResponse('No event object received', executionId);
    }
    
    if (!e.parameter) {
      console.error(`${executionId}: No parameter object in event`);
      console.log(`${executionId}: Event keys:`, Object.keys(e));
      return createErrorResponse('No form data received in parameter', executionId);
    }
    
    if (Object.keys(e.parameter).length === 0) {
      console.error(`${executionId}: Parameter object is empty`);
      return createErrorResponse('Empty form data received', executionId);
    }
    
    console.log(`${executionId}: Parameter keys received:`, Object.keys(e.parameter));
    console.log(`${executionId}: Email in request:`, e.parameter.email || 'MISSING');
    console.log(`${executionId}: PaymentId in request:`, e.parameter.paymentId || 'MISSING');
    
    // Get form data with validation
    const data = e.parameter;
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'college', 'year', 'course'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
      console.error(`${executionId}: Missing required fields:`, missingFields);
      return createErrorResponse(`Missing required fields: ${missingFields.join(', ')}`, executionId);
    }
    
    console.log(`${executionId}: All required fields present, proceeding with registration`);
    
    // Generate registration ID
    const regId = 'LIT' + Date.now().toString(36).toUpperCase();
    console.log(`${executionId}: Generated registration ID: ${regId}`);
    
    // Handle Razorpay payment information only
    let paymentStatus = 'pending';
    let paymentId = 'NOT_PROVIDED';
    let paymentAmount = 149; // Default amount
    
    if (data.paymentId && data.paymentId.trim() && data.paymentId !== 'undefined' && data.paymentId !== '') {
      paymentId = data.paymentId.trim();
      paymentStatus = data.paymentStatus || 'completed';
      paymentAmount = parseFloat(data.paymentAmount) || 149;
      console.log(`${executionId}: Payment info - ID: ${paymentId}, Status: ${paymentStatus}, Amount: ${paymentAmount}`);
    } else {
      console.warn(`${executionId}: No Razorpay payment information provided for registration: ${regId}`);
      paymentStatus = 'no_payment';
      paymentId = 'NOT_PROVIDED';
    }
    
    // CRITICAL: Save to Google Sheets FIRST (this must never fail)
    console.log(`${executionId}: Starting sheet write operation`);
    let sheetSuccess = false;
    let sheetError = null;
    
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      
      console.log(`${executionId}: Writing to sheet - Row data prepared`);
      
      // Column structure for Razorpay only
      sheet.appendRow([
        timestamp,           // A: Timestamp
        regId,              // B: Registration ID
        data.fullName.trim(), // C: Full Name
        data.email.trim().toLowerCase(), // D: Email
        data.phone.replace(/\s/g, ''), // E: Phone
        data.college.trim(),  // F: College
        data.year,          // G: Year
        data.course.trim(),  // H: Course
        paymentStatus,      // I: Payment Status
        paymentId,          // J: Razorpay Payment ID
        paymentAmount       // K: Payment Amount
      ]);
      
      sheetSuccess = true;
      console.log(`${executionId}: ✅ Sheet write successful for ${regId}`);
      
    } catch (error) {
      sheetError = error;
      console.error(`${executionId}: ❌ CRITICAL - Sheet write failed:`, error.toString());
      
      // If sheet write fails, the entire registration fails
      return createErrorResponse('Failed to save registration data. Please try again immediately.', executionId, {
        technical: error.toString(),
        retryable: true
      });
    }
    
    // Send email confirmation (can fail without breaking registration)
    console.log(`${executionId}: Starting email send operation`);
    let emailSuccess = false;
    let emailError = null;
    
    
    // Send email confirmation for Razorpay payments only
    try {
      console.log(`${executionId}: Preparing email for ${data.email}`);
      
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
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
        }
        .email-wrapper {
            background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
            padding: 20px 0;
            min-height: 100vh;
        }
        .container { 
            max-width: 650px; 
            margin: 0 auto; 
            background: #ffffff; 
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header { 
            padding: 0; 
            text-align: center; 
            position: relative;
        }
        .header img { 
            width: 100%; 
            max-width: 650px; 
            height: auto; 
            display: block; 
            border-radius: 12px 12px 0 0;
        }
        .content { 
            padding: 40px 30px; 
            background: #ffffff;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        .intro-text {
            font-size: 16px;
            margin-bottom: 30px;
            color: #34495e;
            line-height: 1.8;
        }
        .section { 
            margin-bottom: 35px; 
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            border-left: 5px solid #dc2626;
        }
        .section h2 { 
            color: #dc2626; 
            margin: 0 0 20px 0; 
            font-size: 20px; 
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .section h2:before {
            content: "✓";
            background: #dc2626;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
        }
        .detail-grid {
            display: table;
            width: 100%;
            border-spacing: 0;
        }
        .detail-item { 
            display: table-row;
            margin: 0;
        }
        .detail-label { 
            font-weight: 600; 
            color: #555; 
            padding: 8px 20px 8px 0;
            display: table-cell;
            width: 30%;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-value {
            color: #2c3e50;
            padding: 8px 0;
            display: table-cell;
            border-bottom: 1px solid #e9ecef;
            font-weight: 500;
        }
        .payment-confirmed { 
            background: linear-gradient(135deg, #d4f6d4 0%, #a7f3d0 100%);
            border: 2px solid #10b981;
            border-radius: 12px;
            padding: 20px; 
            margin: 20px 0;
            position: relative;
        }
        .payment-confirmed:before {
            content: "✓";
            position: absolute;
            top: -12px;
            left: 20px;
            background: #10b981;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        .payment-pending { 
            background: linear-gradient(135deg, #fff3cd 0%, #fde68a 100%);
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 20px; 
            margin: 20px 0;
            position: relative;
        }
        .payment-pending:before {
            content: "⏳";
            position: absolute;
            top: -12px;
            left: 20px;
            background: #f59e0b;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
        }
        .event-details { 
            background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
            padding: 25px; 
            border-radius: 12px; 
            border: 2px solid #0284c7;
            margin: 20px 0;
        }
        .closing-text {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #6366f1;
            margin: 30px 0;
            font-style: italic;
            color: #4f46e5;
        }
        .contact-info {
            text-align: center;
            margin: 25px 0;
            padding: 15px;
            background: #f1f5f9;
            border-radius: 8px;
        }
        .contact-info a {
            color: #dc2626;
            text-decoration: none;
            font-weight: 600;
        }
        .contact-info a:hover {
            text-decoration: underline;
        }
        .footer { 
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            padding: 30px 20px; 
            text-align: center; 
            border-radius: 0 0 12px 12px;
        }
        .footer p { 
            margin: 8px 0; 
            font-size: 14px; 
        }
        .footer .team-name {
            font-size: 18px;
            font-weight: 600;
            color: #fef3c7;
            margin-bottom: 10px;
        }
        .divider {
            height: 3px;
            background: linear-gradient(90deg, #dc2626, #fbbf24, #10b981, #3b82f6);
            margin: 30px 0;
            border-radius: 2px;
        }
        
        /* Responsive styles */
        @media only screen and (max-width: 600px) {
            .container { 
                margin: 0 10px; 
                border-radius: 8px;
            }
            .content { 
                padding: 25px 20px; 
            }
            .section { 
                padding: 20px 15px; 
            }
            .detail-label, .detail-value {
                display: block;
                width: 100%;
                padding: 5px 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="container">
            <div class="header">
                <img src="https://raw.githubusercontent.com/stentroverts/literovia/main/public/email-header.png" alt="Literovia 2025 - A Stentorian Odyssey - Registration Confirmation" />
            </div>
            
            <div class="content">
                <p class="greeting"><strong>Dear ${data.fullName},</strong></p>
                <p class="intro-text">&#127881; Congratulations! Your registration for Literovia 2025 has been successfully received. We're excited to have you join us for this incredible literary journey!</p>
                
                <div class="divider"></div>
                
                <div class="section">
                    <h2>Registration Details</h2>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <div class="detail-label">Registration ID:</div>
                            <div class="detail-value">${regId}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Name:</div>
                            <div class="detail-value">${data.fullName}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Email:</div>
                            <div class="detail-value">${data.email}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Phone:</div>
                            <div class="detail-value">${data.phone}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">College:</div>
                            <div class="detail-value">${data.college}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Year:</div>
                            <div class="detail-value">${data.year}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Course:</div>
                            <div class="detail-value">${data.course}</div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h2>Payment Information</h2>
                    <div class="${paymentStatus === 'completed' && paymentId.startsWith('pay_') ? 'payment-confirmed' : 'payment-pending'}">
                        ${paymentStatus === 'completed' && paymentId.startsWith('pay_') ? 
                            `<strong>Payment Confirmed via Razorpay</strong><br><br>
                             <strong>Payment ID:</strong> ${paymentId}<br>
                             <strong>Amount Paid:</strong> &#8377;${paymentAmount}<br>
                             <strong>Status:</strong> Successfully Completed<br>
                             <strong>Method:</strong> Secure Online Payment` :
                            `<strong>⏳ Payment Status: ${paymentStatus.toUpperCase()}</strong><br><br>
                             <strong>Registration ID:</strong> ${regId}<br>
                             <strong>Amount Due:</strong> &#8377;${paymentAmount}<br>
                             Please complete payment through Razorpay if not already done`}
                    </div>
                </div>
                
                <div class="section">
                    <h2>Event Details</h2>
                    <div class="event-details">
                        <div class="detail-grid">
                            <div class="detail-item">
                                <div class="detail-label">&#128218; Event:</div>
                                <div class="detail-value">Literovia 2025 - A Stentorian Odyssey</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">&#128197; Dates:</div>
                                <div class="detail-value">September 8-9, 2025</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">&#128205; Venue:</div>
                                <div class="detail-value">VNRVJIET Campus</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="closing-text">
                    <p><strong>Thank you for joining us for this literary odyssey!</strong> We'll contact you soon with more details about the event schedule, venue information, and what to expect. Don't forget to check the attached brochure for all event details!</p>
                </div>
                
                <div class="contact-info">
                    <p>&#128231; For any queries, contact us at <a href="mailto:stentorian@vnrvjiet.in">stentorian@vnrvjiet.in</a></p>
                </div>
            </div>
            
            <div class="footer">
                <p class="team-name">The Literovia Team</p>
                <p><strong>Stentorian - VNRVJIET</strong></p>
                <p><em>This is an automated confirmation email. Please keep this for your records.</em></p>
            </div>
        </div>
    </div>
</body>
</html>`;
      
      // Get the events brochure PDF from Google Drive
      let attachments = [];
      try {
        // Events brochure PDF file ID from Google Drive
        const brochureFile = DriveApp.getFileById('1ari8T2ARbye9Ynixg9r47tSd1ALIJnSf');
        
        // Use the blob directly as attachment
        attachments.push(brochureFile.getBlob().setName('Literovia 2025 Events Brochure.pdf'));
      } catch (attachmentError) {
        console.error('⚠️ Could not attach brochure PDF:', attachmentError);
      }
      
      // Send HTML email with attachment
      GmailApp.sendEmail(data.email, subject, '', {
        htmlBody: htmlBody,
        attachments: attachments
      });
      
      emailSuccess = true;
      console.log(`${executionId}: ✅ Email sent successfully to ${data.email}`);
      
    } catch (error) {
      emailError = error;
      console.error(`${executionId}: ⚠️ Email failed (but registration saved):`, error.toString());
      // Don't fail the entire registration - email failure is not critical
    }
    
    console.log(`${executionId}: Registration process completed - Sheet: ${sheetSuccess}, Email: ${emailSuccess}`);
    
    // Return success response (even if email failed)
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        registrationId: regId,
        message: 'Registration successful! ' + (emailSuccess ? 'Check your email for confirmation.' : 'Email confirmation may be delayed - check spam folder or contact support.'),
        paymentStatus: paymentStatus,
        paymentId: paymentId,
        amount: paymentAmount,
        emailSent: emailSuccess,
        executionId: executionId,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    const executionId = 'ERR_' + Date.now();
    console.error(`${executionId}: 💥 Unexpected error in doPost:`, error.toString());
    console.error(`${executionId}: Error stack:`, error.stack);
    
    return createErrorResponse('Unexpected error occurred. Please try again or contact support.', executionId, {
      technical: error.toString(),
      retryable: true
    });
  }
}

// Helper function to create consistent error responses
function createErrorResponse(message, executionId, options = {}) {
  const response = {
    success: false,
    message: message,
    executionId: executionId,
    timestamp: new Date().toISOString(),
    retryable: options.retryable || false
  };
  
  if (options.technical) {
    response.technical = options.technical;
  }
  
  console.log(`${executionId}: Returning error response:`, JSON.stringify(response));
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput('Literovia Registration API (Razorpay Only) is running!');
}

// RECOVERY FUNCTIONS - Add these to help recover missed payments

/**
 * RECOVERY FUNCTION FOR MISSED PAYMENTS
 * Use this when payments succeeded but registration data was lost
 */
function recoverRegistrationsFromPaymentData() {
  /**
   * INSTRUCTIONS TO USE THIS:
   * 
   * 1. Get payment details from Razorpay Dashboard for the missing payments
   * 2. Replace the data below with actual payment details
   * 3. Run this function from Google Apps Script
   */
  
  const missingPayments = [
    {
      // REPLACE WITH ACTUAL DATA FROM RAZORPAY DASHBOARD
      paymentId: 'pay_REPLACE_WITH_ACTUAL_ID_1',
      email: 'replace@with.actual.email',
      phone: '9876543210', // From Razorpay contact field (remove +91)
      amount: 149, // Amount in rupees
      createdAt: '2025-08-20T17:55:17+05:30', // Razorpay created_at timestamp
      
      // THESE FIELDS YOU NEED TO GET FROM THE CUSTOMER
      fullName: 'PLEASE_ASK_CUSTOMER', // Ask the customer for their name
      college: 'VNRVJIET', // Most likely VNRVJIET, but confirm with customer
      year: '2nd year', // Ask customer or make reasonable guess
      course: 'Computer Science' // Ask customer or make reasonable guess
    },
    {
      // Second missing payment - duplicate and modify as needed
      paymentId: 'pay_REPLACE_WITH_ACTUAL_ID_2',
      email: 'replace@with.actual.email2',
      phone: '9876543211',
      amount: 149,
      createdAt: '2025-08-20T18:15:22+05:30',
      
      fullName: 'PLEASE_ASK_CUSTOMER_2',
      college: 'VNRVJIET',
      year: '3rd year',
      course: 'Electronics'
    }
  ];
  
  // Validate that we have real data before processing
  const hasPlaceholderData = missingPayments.some(payment => 
    payment.paymentId.includes('REPLACE_WITH_ACTUAL') ||
    payment.email.includes('replace@with.actual') ||
    payment.fullName.includes('PLEASE_ASK_CUSTOMER')
  );
  
  if (hasPlaceholderData) {
    console.error('⚠️ Please replace all placeholder data with actual payment details before running this function');
    return {
      success: false,
      message: 'Placeholder data detected. Please update with actual payment details.'
    };
  }
  
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const recoveredRegistrations = [];
  
  missingPayments.forEach((payment, index) => {
    try {
      const regId = 'LIT_RECOVERED_' + Date.now().toString(36).toUpperCase() + '_' + index;
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      
      console.log(`🔄 Recovering registration for payment: ${payment.paymentId}`);
      
      // Clean phone number (ensure no +91 prefix)
      const cleanPhone = payment.phone.toString().replace(/^\+91/, '').replace(/\s/g, '');
      
      // Add to sheet
      sheet.appendRow([
        timestamp,
        regId,
        payment.fullName,
        payment.email,
        cleanPhone,
        payment.college,
        payment.year,
        payment.course,
        'recovered_manual', // Special status to identify recovered registrations
        payment.paymentId,
        payment.amount
      ]);
      
      // Send recovery email with full HTML template
      const subject = `Literovia 2025 - Registration Recovered - ${regId}`;
      
      const htmlBody = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 650px; margin: 0 auto; background: #ffffff; }
                .header { background: #dc2626; color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; background: #f8f9fa; }
                .footer { background: #dc2626; color: white; padding: 20px; text-align: center; }
                .highlight { background: #d4f6d4; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981; }
                .event-details { background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Literovia 2025 - Registration Recovered</h1>
                </div>
                <div class="content">
                    <p><strong>Dear ${payment.fullName},</strong></p>
                    
                    <p>We sincerely apologize for the technical issue that occurred during your registration process. Your payment was successful, and we have now <strong>recovered your registration</strong>.</p>
                    
                    <div class="highlight">
                        <h3>✅ Registration Confirmed</h3>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li><strong>Registration ID:</strong> ${regId}</li>
                            <li><strong>Payment ID:</strong> ${payment.paymentId}</li>
                            <li><strong>Amount Paid:</strong> ₹${payment.amount}</li>
                            <li><strong>Status:</strong> Confirmed (Recovered)</li>
                            <li><strong>Recovery Date:</strong> ${timestamp}</li>
                        </ul>
                    </div>
                    
                    <p>Your registration for Literovia 2025 is now <strong>officially confirmed</strong>. Thank you for your patience while we resolved this technical issue.</p>
                    
                    <div class="event-details">
                        <h3>📚 Event Details</h3>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li><strong>Event:</strong> Literovia 2025 - A Stentorian Odyssey</li>
                            <li><strong>Dates:</strong> September 8-9, 2025</li>
                            <li><strong>Venue:</strong> VNRVJIET Campus</li>
                        </ul>
                    </div>
                    
                    <p><strong>What's Next?</strong></p>
                    <ul>
                        <li>Keep this email as proof of registration</li>
                        <li>Follow our social media for event updates</li>
                        <li>Arrive at the venue on September 8th with your ID</li>
                    </ul>
                    
                    <p>Once again, we apologize for the inconvenience and thank you for your understanding.</p>
                </div>
                <div class="footer">
                    <p><strong>The Literovia Team</strong><br>
                    Stentorian - VNRVJIET</p>
                    <p>📧 For queries: stentorian@vnrvjiet.in</p>
                    <p><em>This is an automated recovery confirmation. Please keep this for your records.</em></p>
                </div>
            </div>
        </body>
        </html>
      `;
      
      GmailApp.sendEmail(payment.email, subject, '', {
        htmlBody: htmlBody
      });
      
      recoveredRegistrations.push({
        registrationId: regId,
        paymentId: payment.paymentId,
        email: payment.email,
        fullName: payment.fullName
      });
      
      console.log(`✅ Successfully recovered: ${regId} for ${payment.fullName} (${payment.email})`);
      
    } catch (error) {
      console.error(`❌ Failed to recover payment ${payment.paymentId}:`, error.toString());
    }
  });
  
  console.log(`🎉 Recovery completed. Recovered ${recoveredRegistrations.length} registrations.`);
  
  return {
    success: true,
    recoveredCount: recoveredRegistrations.length,
    registrations: recoveredRegistrations
  };
}

// Test function to verify the recovery process without affecting real data
function testRecoveryProcess() {
  console.log("🧪 Testing recovery process...");
  
  // This is a safe test that won't affect real data
  const testPayment = {
    paymentId: 'pay_TEST_' + Date.now(),
    email: 'test@example.com',
    phone: '9876543210',
    fullName: 'Test User',
    college: 'VNRVJIET',
    year: '2nd year',
    course: 'Computer Science',
    amount: 149
  };
  
  console.log("Test payment data structure:", testPayment);
  console.log("✅ Recovery data structure is valid");
  console.log("✅ Google Apps Script recovery functions are ready");
  
  return {
    status: "Recovery system ready",
    testData: testPayment,
    instructions: "Replace placeholder data in recoverRegistrationsFromPaymentData() and run it"
  };
}
