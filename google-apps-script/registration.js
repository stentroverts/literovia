/**
 * FALLBACK REGISTRATION HANDLER - WITH GOOGLE DRIVE LINK INPUT
 * User provides Google Drive link instead of uploading file
 */

const SHEET_ID = '1pJoqI0bF---YbTt3R2q6nA8TnftyvIYSndDF3xYGkPU';

function doPost(e) {
  try {
    console.log('🚀 Registration started (Link Version)');
    
    // Get form data
    const data = e.parameter;
    console.log('📋 Received data:', Object.keys(data));
    
    // Generate registration ID
    const regId = 'LIT' + Date.now().toString(36).toUpperCase();
    
    // Handle Google Drive link
    let driveLink = '';
    let uploadStatus = 'Not Provided';
    
    if (data.screenshotLink && data.screenshotLink.trim()) {
      driveLink = data.screenshotLink.trim();
      
      // Validate if it's a Google Drive link
      if (driveLink.includes('drive.google.com') || driveLink.includes('docs.google.com')) {
        uploadStatus = 'Link Provided';
        console.log('✅ Google Drive link provided:', driveLink);
      } else {
        uploadStatus = 'Invalid Link';
        console.log('❌ Invalid link provided:', driveLink);
      }
    }
    
    // Save to Google Sheets
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    sheet.appendRow([
      timestamp,
      regId,
      data.fullName,
      data.email,
      data.phone,
      data.college,
      data.year,
      data.course,
      uploadStatus,
      driveLink
    ]);
    
    console.log('✅ Data saved to sheets');
    
    // Send email
    try {
      const subject = `Literovia Registration - ${regId}`;
      const body = `
Dear ${data.fullName},

Your registration has been confirmed!

Registration ID: ${regId}
Payment Status: ${uploadStatus}
Screenshot Link: ${driveLink || 'Not provided'}

Thank you for registering for Literovia!

Best regards,
Literovia Team
      `;
      
      GmailApp.sendEmail(data.email, subject, body);
      console.log('✅ Email sent');
    } catch (emailError) {
      console.error('❌ Email failed:', emailError);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        registrationId: regId,
        message: 'Registration successful!',
        paymentStatus: uploadStatus,
        screenshotUrl: driveLink
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
  return ContentService.createTextOutput('Literovia Registration API (Link Version) is running!');
}
