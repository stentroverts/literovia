/**
 * BACKEND DATA RETRIEVAL TOOLS FOR GOOGLE APPS SCRIPT
 * Add these functions to your Google Apps Script for comprehensive data recovery
 */

// Tool 1: Analyze All Script Executions
function analyzeFailedExecutions() {
  console.log("🔍 Analyzing Google Apps Script executions...");
  
  // Note: This function helps you understand what to look for in the execution logs
  // You need to manually check the Apps Script console for actual execution data
  
  const analysisGuide = {
    steps: [
      "1. Go to Google Apps Script Console (script.google.com)",
      "2. Select your Literovia project",
      "3. Click on 'Executions' in the left sidebar",
      "4. Look for executions with errors or warnings",
      "5. Click on failed executions to see detailed logs"
    ],
    
    commonErrors: {
      "No request data received": {
        meaning: "Frontend never sent data to script",
        causes: ["Network failure during POST", "Browser blocked request", "Data serialization failed"],
        recovery: "Check Razorpay dashboard for payment, then use manual recovery"
      },
      
      "Missing required fields": {
        meaning: "Data was sent but incomplete",
        causes: ["Form validation bypassed", "Data corruption during transmission"],
        recovery: "Contact customer for missing details, then recover manually"
      },
      
      "Sheet write failed": {
        meaning: "Could not save to Google Sheets",
        causes: ["Permissions issue", "Sheet API limit", "Invalid sheet ID"],
        recovery: "Fix sheet access, then reprocess the registration"
      },
      
      "Email failed": {
        meaning: "Registration saved but email not sent",
        causes: ["Gmail API limit", "Invalid email format", "Email service down"],
        recovery: "Registration is saved, just resend confirmation email"
      },
      
      "Timeout": {
        meaning: "Script took too long to execute",
        causes: ["Heavy load", "API delays", "Complex processing"],
        recovery: "Check if registration was partially saved, then complete manually"
      }
    },
    
    whatToLookFor: [
      "Execution timestamp matching failed registration time",
      "Error messages in execution logs",
      "Partial success indicators",
      "Request data received vs not received",
      "Email send success/failure"
    ]
  };
  
  console.log("📊 Execution Analysis Guide:");
  console.log(JSON.stringify(analysisGuide, null, 2));
  
  return analysisGuide;
}

// Tool 2: Check Google Sheet Data Integrity
function checkSheetDataIntegrity() {
  console.log("📋 Checking Google Sheet data integrity...");
  
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length === 0) {
      console.log("❌ Sheet is empty");
      return { status: "empty", data: [] };
    }
    
    // Analyze data structure
    const headers = data[0];
    const registrations = data.slice(1);
    
    const analysis = {
      totalRows: data.length,
      totalRegistrations: registrations.length,
      headers: headers,
      recentRegistrations: registrations.slice(-5), // Last 5 registrations
      statistics: {
        byPaymentStatus: {},
        byCollege: {},
        byDate: {},
        missingData: []
      }
    };
    
    // Analyze each registration
    registrations.forEach((row, index) => {
      const rowIndex = index + 2; // +2 because index starts at 0 and we skip header
      
      // Check for missing critical data
      if (!row[1]) analysis.statistics.missingData.push({ row: rowIndex, issue: "Missing Registration ID" });
      if (!row[2]) analysis.statistics.missingData.push({ row: rowIndex, issue: "Missing Full Name" });
      if (!row[3]) analysis.statistics.missingData.push({ row: rowIndex, issue: "Missing Email" });
      if (!row[9]) analysis.statistics.missingData.push({ row: rowIndex, issue: "Missing Payment ID" });
      
      // Count by payment status
      const paymentStatus = row[8] || 'unknown';
      analysis.statistics.byPaymentStatus[paymentStatus] = (analysis.statistics.byPaymentStatus[paymentStatus] || 0) + 1;
      
      // Count by college
      const college = row[5] || 'unknown';
      analysis.statistics.byCollege[college] = (analysis.statistics.byCollege[college] || 0) + 1;
      
      // Count by date (approximate - using timestamp)
      const timestamp = row[0] || 'unknown';
      const date = timestamp.toString().split(' ')[0]; // Get date part
      analysis.statistics.byDate[date] = (analysis.statistics.byDate[date] || 0) + 1;
    });
    
    console.log("✅ Sheet analysis completed:");
    console.log(JSON.stringify(analysis, null, 2));
    
    return analysis;
    
  } catch (error) {
    console.error("❌ Error checking sheet:", error.toString());
    return { status: "error", error: error.toString() };
  }
}

// Tool 3: Find Missing Registrations by Time Range
function findMissingRegistrationsByTime(startTime, endTime) {
  console.log(`🕐 Searching for missing registrations between ${startTime} and ${endTime}...`);
  
  /**
   * This function helps identify potential missing registrations by time gaps
   * Usage: findMissingRegistrationsByTime('2025-08-20 17:00:00', '2025-08-20 20:00:00')
   */
  
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return { message: "No registration data found" };
    }
    
    const registrations = data.slice(1); // Skip header
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    const registrationsInRange = registrations.filter(row => {
      const timestamp = new Date(row[0]); // Assuming timestamp is in column A
      return timestamp >= startDate && timestamp <= endDate;
    });
    
    const analysis = {
      searchPeriod: { start: startTime, end: endTime },
      registrationsFound: registrationsInRange.length,
      registrations: registrationsInRange.map(row => ({
        timestamp: row[0],
        regId: row[1],
        name: row[2],
        email: row[3],
        paymentId: row[9],
        paymentStatus: row[8]
      })),
      gaps: [], // This would require more complex analysis
      recommendations: [
        "Check Razorpay dashboard for payments in this time range",
        "Compare payment count with registration count",
        "Look for any payment IDs not present in this data"
      ]
    };
    
    console.log("📊 Time range analysis:");
    console.log(JSON.stringify(analysis, null, 2));
    
    return analysis;
    
  } catch (error) {
    console.error("❌ Error in time range search:", error.toString());
    return { error: error.toString() };
  }
}

// Tool 4: Compare Razorpay Payments with Sheet Data
function comparePaymentsWithRegistrations(razorpayPayments) {
  console.log("🔄 Comparing Razorpay payments with sheet registrations...");
  
  /**
   * Usage: 
   * 1. Export payment data from Razorpay dashboard as array
   * 2. Call this function with that data
   * 
   * razorpayPayments format:
   * [
   *   { id: 'pay_xxxxx', email: 'user@example.com', amount: 14900, created_at: '2025-08-20...' },
   *   ...
   * ]
   */
  
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const sheetData = sheet.getDataRange().getValues();
    
    if (sheetData.length <= 1) {
      return { error: "No registration data in sheet" };
    }
    
    const registrations = sheetData.slice(1);
    const sheetPaymentIds = new Set(registrations.map(row => row[9])); // Column J has payment IDs
    
    const comparison = {
      razorpayTotal: razorpayPayments.length,
      sheetTotal: registrations.length,
      matched: [],
      missingFromSheet: [],
      extraInSheet: []
    };
    
    // Check each Razorpay payment
    razorpayPayments.forEach(payment => {
      if (sheetPaymentIds.has(payment.id)) {
        comparison.matched.push(payment.id);
      } else {
        comparison.missingFromSheet.push({
          paymentId: payment.id,
          email: payment.email,
          amount: payment.amount,
          createdAt: payment.created_at
        });
      }
    });
    
    // Find extra entries in sheet (shouldn't happen, but check anyway)
    const razorpayPaymentIds = new Set(razorpayPayments.map(p => p.id));
    registrations.forEach(row => {
      const paymentId = row[9];
      if (paymentId && !razorpayPaymentIds.has(paymentId)) {
        comparison.extraInSheet.push({
          regId: row[1],
          email: row[3],
          paymentId: paymentId
        });
      }
    });
    
    console.log("🔍 Payment vs Registration Comparison:");
    console.log(JSON.stringify(comparison, null, 2));
    
    if (comparison.missingFromSheet.length > 0) {
      console.log("\n⚠️  MISSING REGISTRATIONS FOUND!");
      console.log("These payments exist in Razorpay but not in your sheet:");
      comparison.missingFromSheet.forEach(payment => {
        console.log(`- Payment ID: ${payment.paymentId} | Email: ${payment.email}`);
      });
      console.log("\nUse the recovery function to process these!");
    }
    
    return comparison;
    
  } catch (error) {
    console.error("❌ Error in comparison:", error.toString());
    return { error: error.toString() };
  }
}

// Tool 5: Generate Recovery Report
function generateRecoveryReport() {
  console.log("📋 Generating comprehensive recovery report...");
  
  const report = {
    timestamp: new Date().toISOString(),
    sheetAnalysis: checkSheetDataIntegrity(),
    executionGuidance: analyzeFailedExecutions(),
    instructions: {
      immediate: [
        "Check Google Apps Script execution logs for errors",
        "Check Razorpay dashboard for recent payments",
        "Compare payment count with registration count",
        "Identify any missing registrations by payment ID"
      ],
      recovery: [
        "For each missing payment:",
        "1. Get payment details from Razorpay dashboard",
        "2. Contact customer for missing details if needed",
        "3. Use recoverRegistrationsFromPaymentData() function",
        "4. Verify recovery email is sent",
        "5. Confirm entry appears in Google Sheet"
      ],
      prevention: [
        "Monitor execution logs regularly",
        "Set up Razorpay webhooks for backup",
        "Keep payment vs registration count comparison",
        "Have recovery process documented and ready"
      ]
    }
  };
  
  console.log("📊 Complete Recovery Report:");
  console.log(JSON.stringify(report, null, 2));
  
  return report;
}
