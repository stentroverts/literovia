/**
 * LITEROVIA REGISTRATION HANDLER WITH RAZORPAY INTEGRATION
 * Handles registration with Razorpay payment integration only
 */

const SHEET_ID = '1FJDyNld7pRob_D6kRqwRKSOxco8rdMEVRMyJH9u-sPk';

function doPost(e) {
  try {
    // Check if we have request data
    if (!e || !e.parameter) {
      console.error('No request data received');
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'No form data received. This endpoint expects POST data.'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get form data
    const data = e.parameter;
    
    // Generate registration ID
    const regId = 'LIT' + Date.now().toString(36).toUpperCase();
    
    // Handle Razorpay payment information only
    let paymentStatus = 'pending';
    let paymentId = 'NOT_PROVIDED';
    let paymentAmount = 149; // Default amount
    
    if (data.paymentId && data.paymentId.trim() && data.paymentId !== 'undefined' && data.paymentId !== '') {
      paymentId = data.paymentId.trim();
      paymentStatus = data.paymentStatus || 'completed';
      paymentAmount = parseFloat(data.paymentAmount) || 149;
    } else {
      console.warn('No Razorpay payment information provided for registration:', regId);
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
                <p><strong>Stentorian Club, VNRVJIET</strong></p>
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
