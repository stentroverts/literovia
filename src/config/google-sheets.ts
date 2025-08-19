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
          // Enhanced FormData preparation with validation
          const formData = new FormData();
          
          // Add required fields with validation
          const requiredFields = [
            { key: 'fullName', value: data.fullName?.trim() },
            { key: 'email', value: data.email?.trim().toLowerCase() },
            { key: 'phone', value: data.phone?.replace(/\s/g, '') },
            { key: 'college', value: data.college?.trim() },
            { key: 'year', value: data.year },
            { key: 'course', value: data.course?.trim() }
          ];
          
          // Validate all required fields before sending
          for (const field of requiredFields) {
            if (!field.value || field.value === '') {
              throw new Error(`Required field '${field.key}' is missing or empty`);
            }
            formData.append(field.key, field.value);
          }
          
          // Add payment fields (optional)
          formData.append('paymentId', data.paymentId || '');
          formData.append('paymentAmount', data.paymentAmount?.toString() || '149');
          formData.append('paymentStatus', data.paymentStatus || 'pending');
          formData.append('timestamp', new Date().toISOString());
          
          // Add execution tracking ID
          const executionId = `CLIENT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          formData.append('clientExecutionId', executionId);
          
          // Log the request for debugging
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('🚀 Sending registration data:', {
              executionId,
              email: data.email,
              paymentId: data.paymentId,
              fieldsCount: Array.from(formData.entries()).length
            });
          }

          const response = await fetch(GOOGLE_SHEETS_CONFIG.SCRIPT_URL, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              // Don't set Content-Type - let browser set it for FormData
            },
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const responseText = await response.text();
          
          // Handle empty response
          if (!responseText.trim()) {
            throw new Error('Empty response from server - data may not have been received');
          }

          try {
            const result = JSON.parse(responseText);
            
            // Enhanced error handling with execution ID tracking
            if (!result.success) {
              const errorMessage = result.message || 'Unknown error occurred';
              if (result.retryable) {
                throw new Error(`Retryable error: ${errorMessage} (Execution ID: ${result.executionId})`);
              } else {
                throw new Error(`Non-retryable error: ${errorMessage} (Execution ID: ${result.executionId})`);
              }
            }
            
            // Log successful response
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.log('✅ Registration successful:', {
                registrationId: result.registrationId,
                executionId: result.executionId,
                emailSent: result.emailSent
              });
            }
            
            return {
              success: true,
              message: result.message || 'Registration successful!',
              registrationId: result.registrationId || result.id,
              executionId: result.executionId,
              emailSent: result.emailSent
            };
            
          } catch (parseError) {
            // If JSON parsing fails, but response was successful, treat as success
            if (response.ok && responseText.includes('success')) {
              return {
                success: true,
                message: 'Registration submitted successfully!',
                registrationId: `REG_${Date.now()}`,
              };
            }
            throw new Error(`Invalid response format: ${responseText.substring(0, 200)}... (Parse error: ${parseError instanceof Error ? parseError.message : 'Unknown'})`);
          }
        } finally {
          clearTimeout(timeoutId);
        }
      },
      {
        maxRetries: GOOGLE_SHEETS_CONFIG.MAX_RETRIES,
        delay: 2000, // Increased delay for better reliability
        backoff: true,
        retryCondition: (error) => {
          if (error instanceof Error) {
            // Don't retry on validation errors
            if (error.message.includes('Required field') || 
                error.message.includes('400') || 
                error.message.includes('validation') ||
                error.message.includes('Non-retryable error')) {
              return false;
            }
            // Always retry on data transmission failures
            if (error.message.includes('No request data received') ||
                error.message.includes('Empty response') ||
                error.message.includes('Retryable error')) {
              return true;
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
    // Enhanced error logging for debugging
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('❌ Registration submission failed:', {
        error: error instanceof Error ? error.message : error,
        email: data.email,
        paymentId: data.paymentId
      });
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

