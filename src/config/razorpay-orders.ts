import { GOOGLE_SHEETS_CONFIG } from './google-sheets';

export interface RazorpayOrderRequest {
  amount: number;
  currency: string;
  name: string;
  email: string;
}

export interface RazorpayOrderResponse {
  success: boolean;
  order?: {
    id: string;
    entity: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
  };
  error?: string;
}

/**
 * Create a Razorpay Order through Google Apps Script
 * This ensures payments are auto-captured instead of requiring manual capture
 */
export const createRazorpayOrder = async (orderRequest: RazorpayOrderRequest): Promise<RazorpayOrderResponse> => {
  try {
    const params = new URLSearchParams({
      action: 'create_order',
      amount: orderRequest.amount.toString(),
      currency: orderRequest.currency,
      name: orderRequest.name,
      email: orderRequest.email,
    });

    const response = await fetch(`${GOOGLE_SHEETS_CONFIG.SCRIPT_URL}?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to create Razorpay order:', error);
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
