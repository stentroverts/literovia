import { useState, useCallback } from 'react';
import { RAZORPAY_CONFIG, type PaymentOptions, type RazorpayPaymentData } from '@/config/razorpay';
import { ErrorHandler, RetryHandler, NetworkChecker } from '@/lib/error-handling';

interface UseRazorpayProps {
  onSuccess: (paymentData: RazorpayPaymentData) => void;
  onError: (error: { type: string; message: string; retryable: boolean }) => void;
  onDismiss?: () => void;
}

export const useRazorpay = ({ onSuccess, onError, onDismiss }: UseRazorpayProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);

  const loadRazorpayScript = useCallback(() => {
    return RetryHandler.withRetry(
      () => {
        return new Promise<boolean>((resolve, reject) => {
          // Check if Razorpay is already loaded
          if (window.Razorpay) {
            resolve(true);
            return;
          }

          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => resolve(true);
          script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
          
          // Remove any existing Razorpay scripts
          const existingScript = document.querySelector('script[src*="checkout.razorpay.com"]');
          if (existingScript) {
            existingScript.remove();
          }
          
          document.body.appendChild(script);
        });
      },
      {
        maxRetries: 2,
        delay: 1000,
        retryCondition: (error) => error instanceof Error && error.message.includes('Failed to load'),
      }
    );
  }, []);

  const initializePayment = useCallback(async (userDetails: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      setIsLoading(true);
      setRetryAttempts(prev => prev + 1);

      // Check network connectivity
      const isOnline = await NetworkChecker.checkConnectivity();
      if (!isOnline) {
        const error = ErrorHandler.handleNetworkError(new Error('No internet connection'));
        onError({
          type: error.type,
          message: error.userFriendlyMessage,
          retryable: error.retryable,
        });
        setIsLoading(false);
        return;
      }

      // Load Razorpay script with retry
      try {
        await loadRazorpayScript();
      } catch (scriptError) {
        const error = ErrorHandler.handlePaymentError(scriptError);
        onError({
          type: error.type,
          message: 'Unable to load payment gateway. Please refresh the page and try again.',
          retryable: error.retryable,
        });
        setIsLoading(false);
        return;
      }

      // Validate Razorpay configuration
      if (!RAZORPAY_CONFIG.KEY_ID) {
        const error = ErrorHandler.handlePaymentError(new Error('Payment configuration missing'));
        onError({
          type: error.type,
          message: 'Payment gateway is not properly configured. Please contact support.',
          retryable: false,
        });
        setIsLoading(false);
        return;
      }

      // Payment options with enhanced error handling
      const options: PaymentOptions = {
        key: RAZORPAY_CONFIG.KEY_ID,
        amount: RAZORPAY_CONFIG.PASS_AMOUNT,
        currency: RAZORPAY_CONFIG.CURRENCY,
        name: RAZORPAY_CONFIG.COMPANY_NAME,
        description: RAZORPAY_CONFIG.DESCRIPTION,
        prefill: {
          name: userDetails.name.trim(),
          email: userDetails.email.trim().toLowerCase(),
          contact: userDetails.phone.replace(/\s/g, ''),
        },
        theme: {
          color: RAZORPAY_CONFIG.THEME_COLOR,
        },
        handler: (response: RazorpayPaymentData) => {
          setRetryAttempts(0); // Reset retry attempts on success
          onSuccess(response);
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            if (onDismiss) {
              onDismiss();
            }
          },
        },
      };

      // Create and configure Razorpay instance
      const razorpayInstance = new window.Razorpay(options);
      
      // Enhanced payment failure handling
      razorpayInstance.on('payment.failed', (response: { error: unknown }) => {
        setIsLoading(false);
        const error = ErrorHandler.handlePaymentError(response.error);
        
        // Add retry suggestion for retryable errors
        let message = error.userFriendlyMessage;
        if (error.retryable && retryAttempts < 3) {
          message += ' You can try again or use a different payment method.';
        }
        
        onError({
          type: error.type,
          message,
          retryable: error.retryable && retryAttempts < 3,
        });
      });
      
      // Open payment gateway
      razorpayInstance.open();

    } catch (error) {
      setIsLoading(false);
      const handledError = ErrorHandler.handlePaymentError(error);
      onError({
        type: handledError.type,
        message: handledError.userFriendlyMessage,
        retryable: handledError.retryable && retryAttempts < 3,
      });
    }
  }, [loadRazorpayScript, onSuccess, onError, onDismiss, retryAttempts]);

  // Reset retry attempts
  const resetRetryAttempts = useCallback(() => {
    setRetryAttempts(0);
  }, []);

  return {
    initializePayment,
    isLoading,
    retryAttempts,
    resetRetryAttempts,
  };
};
