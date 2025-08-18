// Razorpay Configuration
// Note: Only KEY_ID should be used in frontend. KEY_SECRET must never be exposed in client-side code.
export const RAZORPAY_CONFIG = {
  KEY_ID: 'rzp_live_gL3oQI27aXXDTl', // Live mode key for production
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
    Razorpay: {
      new (options: PaymentOptions): {
        open(): void;
        on(event: string, handler: (response: { error: unknown }) => void): void;
      };
    };
  }
}
