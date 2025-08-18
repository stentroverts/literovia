// Enhanced error handling utilities for Literovia

export interface AppError {
  type: 'NETWORK' | 'VALIDATION' | 'PAYMENT' | 'SUBMISSION' | 'UNKNOWN';
  message: string;
  code?: string;
  retryable: boolean;
  userFriendlyMessage: string;
  technical?: string;
  timestamp: Date;
}

export interface RazorpayError {
  code?: string;
  description?: string;
  message?: string;
  name?: string;
}

export interface NetworkError extends Error {
  name: string;
  message: string;
}

export interface SubmissionError extends Error {
  message: string;
  status?: number;
}

export class ErrorHandler {
  static createError(
    type: AppError['type'],
    message: string,
    options: {
      code?: string;
      retryable?: boolean;
      userFriendlyMessage?: string;
      technical?: string;
    } = {}
  ): AppError {
    return {
      type,
      message,
      code: options.code,
      retryable: options.retryable ?? false,
      userFriendlyMessage: options.userFriendlyMessage || message,
      technical: options.technical,
      timestamp: new Date(),
    };
  }

  static handleNetworkError(error: NetworkError | Error | unknown): AppError {
    if (!navigator.onLine) {
      return this.createError('NETWORK', 'No internet connection', {
        retryable: true,
        userFriendlyMessage: 'Please check your internet connection and try again.',
        technical: 'Navigator offline',
      });
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return this.createError('NETWORK', 'Network request failed', {
        retryable: true,
        userFriendlyMessage: 'Network error. Please check your connection and try again.',
        technical: error.message,
      });
    }

    if (error instanceof Error && error.name === 'AbortError') {
      return this.createError('NETWORK', 'Request timeout', {
        retryable: true,
        userFriendlyMessage: 'The request took too long. Please try again.',
        technical: 'Request was aborted due to timeout',
      });
    }

    return this.createError('NETWORK', 'Network error occurred', {
      retryable: true,
      userFriendlyMessage: 'A network error occurred. Please try again.',
      technical: error instanceof Error ? error.message : 'Unknown network error',
    });
  }

  static handlePaymentError(error: RazorpayError | Error | unknown): AppError {
    // Razorpay specific errors
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const razorpayError = error as RazorpayError;
      switch (razorpayError.code) {
        case 'BAD_REQUEST_ERROR':
          return this.createError('PAYMENT', 'Invalid payment request', {
            code: razorpayError.code,
            retryable: false,
            userFriendlyMessage: 'There was an issue with the payment details. Please contact support.',
            technical: razorpayError.description,
          });
        
        case 'GATEWAY_ERROR':
          return this.createError('PAYMENT', 'Payment gateway error', {
            code: razorpayError.code,
            retryable: true,
            userFriendlyMessage: 'Payment gateway is temporarily unavailable. Please try again in a few minutes.',
            technical: razorpayError.description,
          });
        
        case 'NETWORK_ERROR':
          return this.createError('PAYMENT', 'Payment network error', {
            code: razorpayError.code,
            retryable: true,
            userFriendlyMessage: 'Network error during payment. Please try again.',
            technical: razorpayError.description,
          });
        
        case 'SERVER_ERROR':
          return this.createError('PAYMENT', 'Payment server error', {
            code: razorpayError.code,
            retryable: true,
            userFriendlyMessage: 'Payment server is temporarily unavailable. Please try again.',
            technical: razorpayError.description,
          });
        
        default:
          return this.createError('PAYMENT', 'Payment failed', {
            code: razorpayError.code,
            retryable: true,
            userFriendlyMessage: 'Payment failed. Please try again.',
            technical: razorpayError.description || razorpayError.message,
          });
      }
    }

    return this.createError('PAYMENT', 'Payment processing failed', {
      retryable: true,
      userFriendlyMessage: 'Payment could not be processed. Please try again.',
      technical: error instanceof Error ? error.message : 'Unknown payment error',
    });
  }

  static handleSubmissionError(error: SubmissionError | Error | unknown): AppError {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('400')) {
      return this.createError('SUBMISSION', 'Invalid registration data', {
        retryable: false,
        userFriendlyMessage: 'Some registration information is invalid. Please check your details and try again.',
        technical: errorMessage,
      });
    }

    if (errorMessage.includes('500') || errorMessage.includes('502') || errorMessage.includes('503')) {
      return this.createError('SUBMISSION', 'Server error', {
        retryable: true,
        userFriendlyMessage: 'Our servers are temporarily unavailable. Please try again in a few minutes.',
        technical: errorMessage,
      });
    }

    if (errorMessage.includes('timeout') || errorMessage.includes('TIMEOUT')) {
      return this.createError('SUBMISSION', 'Request timeout', {
        retryable: true,
        userFriendlyMessage: 'The request took too long. Please try again.',
        technical: errorMessage,
      });
    }

    return this.createError('SUBMISSION', 'Registration submission failed', {
      retryable: true,
      userFriendlyMessage: 'Failed to submit registration. Please try again or contact support if the issue persists.',
      technical: errorMessage,
    });
  }

  static handleValidationError(field: string, message: string): AppError {
    return this.createError('VALIDATION', `Validation failed for ${field}`, {
      retryable: false,
      userFriendlyMessage: message,
      technical: `Field validation error: ${field}`,
    });
  }

  static handleGenericError(error: Error | unknown): AppError {
    return this.createError('UNKNOWN', 'An unexpected error occurred', {
      retryable: true,
      userFriendlyMessage: 'Something went wrong. Please try again.',
      technical: error instanceof Error ? error.message : String(error),
    });
  }
}

export class RetryHandler {
  static async withRetry<T>(
    operation: () => Promise<T>,
    options: {
      maxRetries?: number;
      delay?: number;
      backoff?: boolean;
      retryCondition?: (error: Error | unknown) => boolean;
    } = {}
  ): Promise<T> {
    const {
      maxRetries = 3,
      delay = 1000,
      backoff = true,
      retryCondition = () => true,
    } = options;

    let lastError: Error | unknown;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries || !retryCondition(error)) {
          throw error;
        }
        
        const waitTime = backoff ? delay * Math.pow(2, attempt) : delay;
        await this.delay(waitTime);
      }
    }
    
    throw lastError;
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export class NetworkChecker {
  static isOnline(): boolean {
    return navigator.onLine;
  }

  static async checkConnectivity(): Promise<boolean> {
    if (!navigator.onLine) {
      return false;
    }

    try {
      // Try to fetch a small resource to verify actual connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      await fetch('/favicon.ico', {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return true;
    } catch {
      return false;
    }
  }

  static setupConnectionMonitoring(
    onOnline: () => void,
    onOffline: () => void
  ): () => void {
    const handleOnline = () => {
      this.checkConnectivity().then(isConnected => {
        if (isConnected) {
          onOnline();
        }
      });
    };

    const handleOffline = () => {
      onOffline();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Return cleanup function
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }
}
