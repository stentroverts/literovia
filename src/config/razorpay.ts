// Razorpay Configuration
export const RAZORPAY_CONFIG = {
  KEY_ID: 'rzp_test_J2WMFtkzHidr8Y',
  KEY_SECRET: 'SUCbeM387rMK70zNCoAKohKa', // Note: In production, this should be on server-side only
  CURRENCY: 'INR',
  // You can easily change the amount here
  PASS_AMOUNT: 14900, // Amount in paise (149 INR = 14900 paise)
  COMPANY_NAME: 'Literovia 2025',
  DESCRIPTION: 'Literovia 2025 - Literary Festival Pass',
  THEME_COLOR: '#dc2626' // Crimson color matching your theme
};

export interface RazorpayPaymentData {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface PaymentOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayPaymentData) => void;
  modal: {
    ondismiss: () => void;
  };
}

// Type declaration for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}
