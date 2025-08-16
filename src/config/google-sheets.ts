// Simple Google Apps Script Configuration
export const GOOGLE_SHEETS_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwT2wd8v2is-GvJrBbG7Vd6Hz8Mxr2a_XBZBSnOF1LzKrTlgPNMzBdj3kpxJR5Lgkgc/exec',
  SHEET_ID: '1pJoqI0bF---YbTt3R2q6nA8TnftyvIYSndDF3xYGkPU'
};

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  course: string;
  paymentId?: string;
  paymentAmount?: number;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  screenshotLink?: string; // Made optional since we're using Razorpay now
}

export const submitRegistration = async (data: RegistrationData): Promise<{ success: boolean; message: string; registrationId?: string }> => {
  try {
    console.log('🚀 Submitting registration with data:', data);
    
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('college', data.college);
    formData.append('year', data.year);
    formData.append('course', data.course);
    formData.append('paymentId', data.paymentId || '');
    formData.append('paymentAmount', data.paymentAmount?.toString() || '');
    formData.append('paymentStatus', data.paymentStatus || 'pending');
    formData.append('screenshotLink', data.screenshotLink || '');

    console.log('📤 Form data being sent:');
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    const response = await fetch(GOOGLE_SHEETS_CONFIG.SCRIPT_URL, {
      method: 'POST',
      body: formData
    });

    console.log('📥 Response status:', response.status);
    const responseText = await response.text();
    console.log('📥 Response text:', responseText);

    if (response.ok) {
      const result = JSON.parse(responseText);
      console.log('✅ Success:', result);
      return {
        success: true,
        message: result.message || 'Registration successful!',
        registrationId: result.registrationId
      };
    } else {
      throw new Error(`Server error: ${response.status} - ${responseText}`);
    }
  } catch (error) {
    console.error('❌ Registration failed:', error);
    return {
      success: false,
      message: `Registration failed: ${error.message}`
    };
  }
};

