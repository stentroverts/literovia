/**
 * Literovia Registration Form - Google Apps Script
 * This script handles form submissions and stores data in Google Sheets
 */

// Configuration
const SHEET_NAME = 'Literovia Registrations';
const FORM_TITLE = 'Literovia 2025 Registration';

/**
 * Main function to serve the HTML form
 */
function doGet() {
  return HtmlService.createTemplateFromFile('registration-form')
    .evaluate()
    .setTitle(FORM_TITLE)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Handle POST requests from external forms (like React app)
 */
function doPost(e) {
  // Simple version that should always work
  console.log('doPost function called');
  
  try {
    // Log what we received
    if (e && e.parameter) {
      console.log('Parameters received:', e.parameter);
      
      // Try to save to spreadsheet
      const sheet = getOrCreateSheet();
      const timestamp = new Date();
      const rowData = [
        timestamp,
        e.parameter.name || 'N/A',
        e.parameter.email || 'N/A',
        e.parameter.phone || 'N/A',
        e.parameter.college || 'N/A',
        e.parameter.year || 'N/A',
        e.parameter.course || 'N/A',
        e.parameter.events || 'N/A'
      ];
      
      sheet.appendRow(rowData);
      console.log('Data saved to sheet');
      
      // Send confirmation email
      if (e.parameter.email && e.parameter.name) {
        try {
          const formData = {
            fullName: e.parameter.name,
            email: e.parameter.email,
            college: e.parameter.college || 'N/A',
            year: e.parameter.year || 'N/A',
            course: e.parameter.course || 'N/A',
            events: e.parameter.events ? e.parameter.events.split(', ') : []
          };
          
          sendConfirmationEmail(formData);
          console.log('Confirmation email sent to:', e.parameter.email);
        } catch (emailError) {
          console.error('Email sending error:', emailError);
          // Don't fail the whole request if email fails
        }
      }
    }
    
    return ContentService
      .createTextOutput('{"success":true,"message":"Registration successful! You will receive a confirmation email shortly."}')
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('doPost error:', error);
    return ContentService
      .createTextOutput('{"success":false,"message":"Error occurred"}')
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle form submission
 */
function submitRegistration(formData) {
  try {
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Validate the form data
    const validationResult = validateFormData(formData);
    if (!validationResult.isValid) {
      return {
        success: false,
        message: validationResult.message
      };
    }
    
    // Prepare the row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      formData.fullName,
      formData.email,
      formData.phone,
      formData.college,
      formData.year,
      formData.course,
      formData.events.join(', ')
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Send confirmation email (optional)
    sendConfirmationEmail(formData);
    
    return {
      success: true,
      message: 'Registration successful! You will receive a confirmation email shortly.'
    };
    
  } catch (error) {
    console.error('Error submitting registration:', error);
    return {
      success: false,
      message: 'There was an error processing your registration. Please try again.'
    };
  }
}

/**
 * Get or create the registration sheet
 */
function getOrCreateSheet() {
  let spreadsheet;
  
  try {
    // Try to get existing spreadsheet
    const files = DriveApp.getFilesByName('Literovia Registrations');
    if (files.hasNext()) {
      const file = files.next();
      spreadsheet = SpreadsheetApp.openById(file.getId());
    } else {
      throw new Error('Spreadsheet not found');
    }
  } catch (error) {
    // Create new spreadsheet
    spreadsheet = SpreadsheetApp.create('Literovia Registrations');
  }
  
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    
    // Add headers
    const headers = [
      'Timestamp',
      'Full Name',
      'Email',
      'Phone',
      'College',
      'Year',
      'Course',
      'Events'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * Validate form data
 */
function validateFormData(data) {
  if (!data.fullName || data.fullName.trim().length < 2) {
    return { isValid: false, message: 'Please enter a valid full name.' };
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    return { isValid: false, message: 'Please enter a valid email address.' };
  }
  
  if (!data.phone || data.phone.trim().length < 10) {
    return { isValid: false, message: 'Please enter a valid phone number.' };
  }
  
  if (!data.college || data.college.trim().length < 2) {
    return { isValid: false, message: 'Please enter your college name.' };
  }
  
  if (!data.year) {
    return { isValid: false, message: 'Please select your year of study.' };
  }
  
  if (!data.course || data.course.trim().length < 2) {
    return { isValid: false, message: 'Please enter your course/branch.' };
  }
  
  if (!data.events || data.events.length === 0) {
    return { isValid: false, message: 'Please select at least one event.' };
  }
  
  return { isValid: true };
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Send confirmation email
 */
function sendConfirmationEmail(formData) {
  try {
    const subject = 'Literovia 2025 Registration Confirmation';
    const body = `
Dear ${formData.fullName},

Thank you for registering for Literovia 2025 - A Stentorian Odyssey!

Registration Details:
- Name: ${formData.fullName}
- Email: ${formData.email}
- College: ${formData.college}
- Year: ${formData.year}
- Course: ${formData.course}
- Events: ${formData.events.join(', ')}

Event Details:
- Date: September 8-9, 2025
- Venue: VNRVJIET Campus

We'll send you more details about the event schedule and venue closer to the date.

Best regards,
Stentorian VNRVJIET Team

Follow us:
Instagram: @stentorian_vnrvjiet
LinkedIn: Stentorian VNRVJIET
    `;
    
    MailApp.sendEmail(formData.email, subject, body);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

/**
 * Include HTML files
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
