/**
 * FRONTEND DATA RETRIEVAL TOOLS
 * Use these tools to extract failed registration data from user's browser
 */

// Tool 1: Extract Recovery Data from User's Browser
// Instructions: Ask the user to run this in their browser's console (F12 → Console)
function extractRecoveryData() {
  console.log("🔍 Searching for Literovia recovery data...");
  
  const recoveryData = [];
  const allData = {};
  
  // Get all localStorage data
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    allData[key] = value;
    
    // Look for Literovia recovery data specifically
    if (key && key.startsWith('literovia_recovery_')) {
      try {
        const data = JSON.parse(value);
        recoveryData.push(data);
        console.log(`✅ Found recovery data for payment: ${data.paymentId}`);
      } catch (e) {
        console.error(`❌ Error parsing recovery data for key: ${key}`, e);
      }
    }
  }
  
  // Also check sessionStorage
  const sessionData = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    sessionData[key] = value;
  }
  
  // Prepare comprehensive report
  const report = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    recoveryDataFound: recoveryData.length,
    recoveryData: recoveryData,
    allLocalStorageData: allData,
    sessionStorageData: sessionData,
    browserInfo: {
      cookiesEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine,
      language: navigator.language,
      platform: navigator.platform
    }
  };
  
  console.log("📊 Complete Data Report:");
  console.log(JSON.stringify(report, null, 2));
  
  if (recoveryData.length > 0) {
    console.log("\n🎯 RECOVERY DATA FOUND!");
    console.log("Copy the above JSON and send it to support for manual recovery.");
    
    recoveryData.forEach(data => {
      console.log(`\n💳 Payment ID: ${data.paymentId}`);
      console.log(`📧 Email: ${data.formData.email}`);
      console.log(`👤 Name: ${data.formData.fullName}`);
      console.log(`📱 Phone: ${data.formData.phone}`);
      console.log(`🏫 College: ${data.formData.college}`);
      console.log(`🎓 Year: ${data.formData.year}`);
      console.log(`📚 Course: ${data.formData.course}`);
      console.log(`🔄 Status: ${data.status}`);
      console.log(`⏰ Timestamp: ${data.timestamp}`);
    });
  } else {
    console.log("❌ No recovery data found in this browser.");
    console.log("This could mean:");
    console.log("1. Registration completed successfully");
    console.log("2. User cleared browser data");
    console.log("3. Registration was attempted from a different browser/device");
  }
  
  return report;
}

// Tool 2: Check Network Issues and Browser State
function checkBrowserState() {
  console.log("🔍 Checking browser state for troubleshooting...");
  
  const state = {
    network: {
      online: navigator.onLine,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : 'Not available',
      userAgent: navigator.userAgent
    },
    storage: {
      localStorageAvailable: (() => {
        try {
          const test = 'test';
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return true;
        } catch(e) {
          return false;
        }
      })(),
      sessionStorageAvailable: (() => {
        try {
          const test = 'test';
          sessionStorage.setItem(test, test);
          sessionStorage.removeItem(test);
          return true;
        } catch(e) {
          return false;
        }
      })(),
      cookiesEnabled: navigator.cookieEnabled
    },
    razorpay: {
      scriptLoaded: typeof window.Razorpay !== 'undefined',
      libraryVersion: window.Razorpay ? 'Available' : 'Not loaded'
    },
    formData: {
      currentUrl: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    }
  };
  
  console.log("Browser State Report:", JSON.stringify(state, null, 2));
  return state;
}

// Tool 3: Test Network Connectivity
async function testConnectivity() {
  console.log("🌐 Testing network connectivity...");
  
  const tests = [
    { name: 'Google', url: 'https://www.google.com/favicon.ico' },
    { name: 'Razorpay', url: 'https://checkout.razorpay.com/v1/checkout.js' },
    { name: 'Google Apps Script', url: 'https://script.google.com/favicon.ico' }
  ];
  
  const results = {};
  
  for (const test of tests) {
    try {
      const start = Date.now();
      const response = await fetch(test.url, { method: 'HEAD', mode: 'no-cors' });
      const duration = Date.now() - start;
      results[test.name] = { success: true, duration: `${duration}ms` };
      console.log(`✅ ${test.name}: Connected (${duration}ms)`);
    } catch (error) {
      results[test.name] = { success: false, error: error.message };
      console.log(`❌ ${test.name}: Failed - ${error.message}`);
    }
  }
  
  return results;
}

// Tool 4: Generate User Report (for support tickets)
function generateUserReport() {
  console.log("📋 Generating comprehensive user report...");
  
  const report = {
    timestamp: new Date().toISOString(),
    userInfo: {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine
    },
    page: {
      url: window.location.href,
      referrer: document.referrer,
      title: document.title
    },
    recovery: extractRecoveryData(),
    connectivity: null, // Will be filled by async call
    storage: {
      localStorage: (() => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('literovia')) {
            data[key] = localStorage.getItem(key);
          }
        }
        return data;
      })()
    }
  };
  
  // Test connectivity
  testConnectivity().then(connectivity => {
    report.connectivity = connectivity;
    console.log("\n🎯 FINAL REPORT FOR SUPPORT:");
    console.log("Copy this entire report and send to support:");
    console.log(JSON.stringify(report, null, 2));
  });
  
  return report;
}

// Instructions for users
console.log(`
🔧 LITEROVIA RECOVERY TOOLS LOADED
================================

If your payment succeeded but registration failed, run these commands:

1. Extract recovery data:
   extractRecoveryData()

2. Check browser state:
   checkBrowserState()

3. Test connectivity:
   testConnectivity()

4. Generate full report for support:
   generateUserReport()

After running any command, copy the output and send to support.
`);
