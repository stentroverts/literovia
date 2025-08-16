import { useState, useCallback } from 'react';
import { RAZORPAY_CONFIG, type PaymentOptions, type RazorpayPaymentData } from '@/config/razorpay';

interface UseRazorpayProps {
  onSuccess: (paymentData: RazorpayPaymentData) => void;
  onError: (error: any) => void;
}

export const useRazorpay = ({ onSuccess, onError }: UseRazorpayProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initializePayment = useCallback(async (userDetails: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      setIsLoading(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Payment options
      const options: PaymentOptions = {
        key: RAZORPAY_CONFIG.KEY_ID,
        amount: RAZORPAY_CONFIG.PASS_AMOUNT,
        currency: RAZORPAY_CONFIG.CURRENCY,
        name: RAZORPAY_CONFIG.COMPANY_NAME,
        description: RAZORPAY_CONFIG.DESCRIPTION,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: {
          color: RAZORPAY_CONFIG.THEME_COLOR,
        },
        handler: (response: RazorpayPaymentData) => {
          console.log('Payment successful:', response);
          onSuccess(response);
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal closed');
            setIsLoading(false);
          },
        },
      };

      // Create Razorpay instance and open
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response);
        onError(response.error);
      });
      
      razorpayInstance.open();

    } catch (error) {
      console.error('Error initializing payment:', error);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  }, [loadRazorpayScript, onSuccess, onError]);

  return {
    initializePayment,
    isLoading,
  };
};
