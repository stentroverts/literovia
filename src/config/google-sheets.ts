import { ErrorHandler, RetryHandler, NetworkChecker } from '@/lib/error-handling';

// Simple Google Apps Script Configuration
export const GOOGLE_SHEETS_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwsENMgHhZyn3oADsTF95de49FFUzUicck3UF14XKK5VOjsYXsDpit88IfTBro_jQnY/exec',
  SHEET_ID: '1FJDyNld7pRob_D6kRqwRKSOxco8rdMEVRMyJH9u-sPk',
  TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
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

export interface SubmissionResult {
  success: boolean;
  message: string;
  registrationId?: string;
  error?: {
    type: string;
    retryable: boolean;
    userMessage: string;
  };
}

export const submitRegistration = async (data: RegistrationData): Promise<SubmissionResult> => {
  // Check network connectivity first
  const isOnline = await NetworkChecker.checkConnectivity();
  if (!isOnline) {
    const error = ErrorHandler.handleNetworkError(new Error('No internet connection'));
    return {
      success: false,
      message: error.userFriendlyMessage,
      error: {
        type: error.type,
        retryable: error.retryable,
        userMessage: error.userFriendlyMessage,
      },
    };
  }

  try {
    const result = await RetryHandler.withRetry(
      async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), GOOGLE_SHEETS_CONFIG.TIMEOUT);

        try {
          const formData = new FormData();
          formData.append('fullName', data.fullName.trim());
          formData.append('email', data.email.trim().toLowerCase());
          formData.append('phone', data.phone.replace(/\s/g, ''));
          formData.append('college', data.college.trim());
          formData.append('year', data.year);
          formData.append('course', data.course.trim());
          formData.append('paymentId', data.paymentId || '');
          formData.append('paymentAmount', data.paymentAmount?.toString() || '');
          formData.append('paymentStatus', data.paymentStatus || 'pending');
          formData.append('timestamp', new Date().toISOString());

          const response = await fetch(GOOGLE_SHEETS_CONFIG.SCRIPT_URL, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
            },
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const responseText = await response.text();
          
          // Handle empty response
          if (!responseText.trim()) {
            throw new Error('Empty response from server');
          }

          try {
            const result = JSON.parse(responseText);
            
            if (result.error) {
              throw new Error(result.error);
            }
            
            return {
              success: true,
              message: result.message || 'Registration successful!',
              registrationId: result.registrationId || result.id,
            };
          } catch {
            // If JSON parsing fails, but response was successful, treat as success
            if (response.ok && responseText.includes('success')) {
              return {
                success: true,
                message: 'Registration submitted successfully!',
                registrationId: `REG_${Date.now()}`,
              };
            }
            throw new Error(`Invalid response format: ${responseText.substring(0, 100)}`);
          }
        } finally {
          clearTimeout(timeoutId);
        }
      },
      {
        maxRetries: GOOGLE_SHEETS_CONFIG.MAX_RETRIES,
        delay: 1000,
        backoff: true,
        retryCondition: (error) => {
          if (error instanceof Error) {
            // Don't retry on validation errors
            if (error.message.includes('400') || error.message.includes('validation')) {
              return false;
            }
            // Retry on network, timeout, and server errors
            return error.message.includes('fetch') ||
                   error.message.includes('timeout') ||
                   error.message.includes('AbortError') ||
                   error.message.includes('502') ||
                   error.message.includes('503') ||
                   error.message.includes('504');
          }
          return true;
        },
      }
    );

    return result;

  } catch (error) {
    // Log error for debugging (can be removed in production)
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('❌ Registration submission failed:', error);
    }
    
    let handledError;
    if (error instanceof Error && error.name === 'AbortError') {
      handledError = ErrorHandler.handleNetworkError(error);
    } else if (error instanceof TypeError && error.message.includes('fetch')) {
      handledError = ErrorHandler.handleNetworkError(error);
    } else {
      handledError = ErrorHandler.handleSubmissionError(error);
    }

    return {
      success: false,
      message: handledError.userFriendlyMessage,
      error: {
        type: handledError.type,
        retryable: handledError.retryable,
        userMessage: handledError.userFriendlyMessage,
      },
    };
  }
};

// Utility function to validate registration data before submission
export const validateRegistrationData = (data: RegistrationData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.fullName?.trim()) {
    errors.push('Full name is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.phone?.trim()) {
    errors.push('Phone number is required');
  } else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, ''))) {
    errors.push('Invalid phone number format');
  }

  if (!data.college?.trim()) {
    errors.push('College is required');
  }

  if (!data.year?.trim()) {
    errors.push('Year of study is required');
  }

  if (!data.course?.trim()) {
    errors.push('Course/Branch is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

