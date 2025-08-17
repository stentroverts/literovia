// Simple Google Apps Script Configuration
export const GOOGLE_SHEETS_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwsENMgHhZyn3oADsTF95de49FFUzUicck3UF14XKK5VOjsYXsDpit88IfTBro_jQnY/exec',
  SHEET_ID: '1FJDyNld7pRob_D6kRqwRKSOxco8rdMEVRMyJH9u-sPk'
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
}

export const submitRegistration = async (data: RegistrationData): Promise<{ success: boolean; message: string; registrationId?: string }> => {
  try {
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

    const response = await fetch(GOOGLE_SHEETS_CONFIG.SCRIPT_URL, {
      method: 'POST',
      body: formData
    });

    const responseText = await response.text();

    if (response.ok) {
      const result = JSON.parse(responseText);
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

