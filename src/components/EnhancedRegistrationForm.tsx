import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, CreditCard, IndianRupee, AlertTriangle, RefreshCw } from 'lucide-react';
import { 
  submitRegistration, 
  validateRegistrationData,
  type RegistrationData 
} from '@/config/google-sheets';
import { useRazorpay } from '@/hooks/useRazorpay';
import { RAZORPAY_CONFIG } from '@/config/razorpay';
import { EnhancedErrorAlert, ConnectionStatus } from '@/components/ui/EnhancedErrorAlert';
import { ErrorHandler, NetworkChecker, type AppError } from '@/lib/error-handling';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  otherInstitution: string;
  year: string;
  course: string;
}

interface FormErrors {
  [key: string]: string;
}

const EnhancedRegistrationForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    otherInstitution: '',
    year: '',
    course: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentError, setCurrentError] = useState<AppError | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionChecked, setConnectionChecked] = useState(false);

  // Network connectivity monitoring
  useEffect(() => {
    const checkInitialConnection = async () => {
      const isConnected = await NetworkChecker.checkConnectivity();
      setIsOnline(isConnected);
      setConnectionChecked(true);
    };

    checkInitialConnection();

    const cleanup = NetworkChecker.setupConnectionMonitoring(
      () => setIsOnline(true),
      () => setIsOnline(false)
    );

    return cleanup;
  }, []);

  // Enhanced Razorpay integration with robust error handling
  const { initializePayment, isLoading: isPaymentLoading, retryAttempts, resetRetryAttempts } = useRazorpay({
    onSuccess: async (razorpayResponse) => {
      resetRetryAttempts();
      await submitRegistrationWithPayment(razorpayResponse);
    },
    onError: (error) => {
      const appError = ErrorHandler.createError(
        'PAYMENT',
        error.message,
        {
          retryable: error.retryable,
          userFriendlyMessage: error.message,
          code: error.type,
        }
      );
      
      setCurrentError(appError);
      setIsSubmitting(false);
      scrollToTop();
    },
    onDismiss: () => {
      const appError = ErrorHandler.createError(
        'PAYMENT',
        'Payment was cancelled',
        {
          retryable: true,
          userFriendlyMessage: 'Payment was cancelled. You can try again to complete your registration.',
        }
      );
      
      setCurrentError(appError);
      setIsSubmitting(false);
      scrollToTop();
    }
  });

  const collegeOptions = [
    { value: 'VNRVJIET', label: 'VNRVJIET' },
    { value: 'Others', label: 'Others' }
  ];

  const yearOptions = [
    { value: '1st year', label: '1st Year' },
    { value: '2nd year', label: '2nd Year' },
    { value: '3rd year', label: '3rd Year' },
    { value: '4th year', label: '4th Year' },
    { value: 'Other', label: 'Other' }
  ];

  const scrollToTop = () => {
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (Indian mobile number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    // College validation
    if (!formData.college) {
      newErrors.college = 'Please select your college';
    }

    // Other institution validation (if Others is selected)
    if (formData.college === 'Others' && !formData.otherInstitution.trim()) {
      newErrors.otherInstitution = 'Institution name is required when Others is selected';
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = 'Please select your year of study';
    }

    // Course validation
    if (!formData.course.trim()) {
      newErrors.course = 'Course/Branch is required';
    }

    // Terms and conditions validation
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRegistrationWithPayment = async (razorpayResponse: { razorpay_payment_id: string }) => {
    const paymentId = razorpayResponse.razorpay_payment_id;
    
    // CRITICAL: Store payment data locally immediately for recovery
    const recoveryData = {
      paymentId: paymentId,
      formData: formData,
      timestamp: new Date().toISOString(),
      status: 'processing',
      error: undefined as string | undefined
    };
    
    try {
      localStorage.setItem(`literovia_recovery_${paymentId}`, JSON.stringify(recoveryData));
    } catch (error) {
      // If localStorage fails, continue anyway but log for debugging
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Could not store recovery data:', error);
      }
    }
    
    // Show immediate feedback to user
    const loadingMessage = document.createElement('div');
    loadingMessage.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                  background: rgba(0,0,0,0.9); color: white; padding: 20px; border-radius: 10px; 
                  z-index: 9999; text-align: center;">
        <div style="font-size: 18px; margin-bottom: 10px;">Payment Successful!</div>
        <div style="font-size: 14px; margin-bottom: 15px;">Processing your registration...</div>
        <div style="font-size: 12px; color: #ccc;">Payment ID: ${paymentId}</div>
        <div style="font-size: 10px; color: #aaa; margin-top: 10px;">Please do not close this page</div>
        <div style="margin-top: 15px;">
          <div style="border: 2px solid #3498db; border-top: 2px solid transparent; 
                      border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
      </div>
      <style>
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>
    `;
    document.body.appendChild(loadingMessage);
    
    try {
      setIsSubmitting(true);
      setCurrentError(null);
      
      // Remove loading message after processing (success or error)
      const cleanupLoading = () => {
        if (loadingMessage.parentNode) {
          loadingMessage.parentNode.removeChild(loadingMessage);
        }
      };
      
      // Fallback cleanup after 45 seconds (increased timeout)
      const timeoutCleanup = setTimeout(() => {
        cleanupLoading();
        // Show timeout message with recovery info
        setCurrentError(ErrorHandler.createError(
          'SUBMISSION',
          'Registration is taking longer than expected',
          {
            retryable: true,
            userFriendlyMessage: `Your payment (${paymentId}) was successful but registration is taking time. Please contact support with this Payment ID if you don't receive confirmation within 10 minutes.`
          }
        ));
        scrollToTop();
      }, 45000);
      
      // Prepare registration data with payment info
      const registrationData: RegistrationData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/\s/g, ''),
        college: formData.college === 'Others' ? formData.otherInstitution.trim() : formData.college,
        year: formData.year,
        course: formData.course.trim(),
        paymentId: paymentId,
        paymentAmount: RAZORPAY_CONFIG.PASS_AMOUNT / 100,
        paymentStatus: 'completed'
      };

      // Validate data before submission
      const validation = validateRegistrationData(registrationData);
      if (!validation.isValid) {
        clearTimeout(timeoutCleanup);
        cleanupLoading();
        const error = ErrorHandler.handleValidationError('registration', validation.errors.join(', '));
        setCurrentError(error);
        setIsSubmitting(false);
        scrollToTop();
        return;
      }

      // Submit to Google Sheets with enhanced error handling
      const result = await submitRegistration(registrationData);
      
      // Clear loading message and timeout
      clearTimeout(timeoutCleanup);
      cleanupLoading();
      
      if (result.success) {
        // Mark recovery data as completed
        try {
          recoveryData.status = 'completed';
          localStorage.setItem(`literovia_recovery_${paymentId}`, JSON.stringify(recoveryData));
        } catch {
          // Continue anyway - localStorage failure is not critical
        }
        
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Mark recovery data as failed for manual processing
        try {
          recoveryData.status = 'failed';
          recoveryData.error = result.message;
          localStorage.setItem(`literovia_recovery_${paymentId}`, JSON.stringify(recoveryData));
        } catch {
          // Continue anyway - localStorage failure is not critical
        }
        
        if (result.error) {
          const appError = ErrorHandler.createError(
            result.error.type as AppError['type'],
            result.message + ` (Payment ID: ${paymentId} - Please contact support with this ID)`,
            {
              retryable: result.error.retryable,
              userFriendlyMessage: result.error.userMessage + ` Your payment was successful (${paymentId}). Please contact support.`,
            }
          );
          setCurrentError(appError);
        } else {
          const appError = ErrorHandler.handleSubmissionError(new Error(result.message));
          appError.userFriendlyMessage += ` Your payment (${paymentId}) was successful. Please contact support.`;
          setCurrentError(appError);
        }
        scrollToTop();
      }
      
    } catch (error) {
      // Mark recovery data as failed
      try {
        recoveryData.status = 'failed';
        recoveryData.error = error instanceof Error ? error.message : 'Unknown error';
        localStorage.setItem(`literovia_recovery_${paymentId}`, JSON.stringify(recoveryData));
      } catch {
        // Continue anyway - localStorage failure is not critical
      }
      
      // Ensure loading message is removed on error
      if (loadingMessage.parentNode) {
        loadingMessage.parentNode.removeChild(loadingMessage);
      }
      
      const appError = ErrorHandler.handleSubmissionError(error);
      appError.userFriendlyMessage += ` Your payment (${paymentId}) was successful. Please contact support with this Payment ID.`;
      setCurrentError(appError);
      scrollToTop();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      // Clear other institution if college is not Others
      ...(field === 'college' && value !== 'Others' ? { otherInstitution: '' } : {})
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear global error when user starts making changes
    if (currentError) {
      setCurrentError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any existing errors
    setCurrentError(null);
    
    // Check network connectivity
    if (!isOnline) {
      const error = ErrorHandler.handleNetworkError(new Error('No internet connection'));
      setCurrentError(error);
      scrollToTop();
      return;
    }
    
    if (!validateForm()) {
      scrollToTop();
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Initialize Razorpay payment with enhanced error handling
      await initializePayment({
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/\s/g, ''),
      });
      
    } catch (error) {
      const appError = ErrorHandler.handlePaymentError(error);
      setCurrentError(appError);
      setIsSubmitting(false);
      scrollToTop();
    }
  };

  const handleRetry = () => {
    setCurrentError(null);
    if (currentError?.type === 'NETWORK') {
      // For network errors, retry the entire form submission
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    } else if (currentError?.type === 'PAYMENT') {
      // For payment errors, retry payment initialization
      initializePayment({
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/\s/g, ''),
      }).catch(error => {
        const appError = ErrorHandler.handlePaymentError(error);
        setCurrentError(appError);
        setIsSubmitting(false);
      });
    }
  };

  // Don't render form until connection is checked
  if (!connectionChecked) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="text-white text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Checking connection...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 pt-16">
        <div className="w-full max-w-lg mx-auto -mt-16">
          <Card className="bg-gray-800/60 border-gray-700 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                  <h2 className="text-3xl font-bold text-white">Registration Successful!</h2>
                </div>
                
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg leading-relaxed">
                    Thank you for registering for Literovia 2025! We have sent you a confirmation email with all the details.
                  </p>
                  <p className="text-base text-gray-400">
                    Follow us on social media for more updates and exciting announcements!
                  </p>
                </div>
                
                <div className="space-y-4 pt-4">
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-medium transition-colors duration-200"
                  >
                    Register Another Person
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => window.location.href = '/'} 
                      className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 text-base font-medium transition-colors duration-200"
                    >
                      Go Back to Home
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                          const scheduleElement = document.getElementById('schedule');
                          if (scheduleElement) {
                            scheduleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }}
                      className="flex-1 bg-crimson hover:bg-crimson-bright text-white py-3 text-base font-medium transition-colors duration-200"
                    >
                      View More Events
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4 pt-20 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-white">
              Register for Literovia 2025
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Join us for the most awaited literary festival
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Connection Status */}
            <ConnectionStatus isOnline={isOnline} />

            {/* Enhanced Error Alert */}
            {currentError && (
              <EnhancedErrorAlert
                error={currentError}
                onRetry={currentError.retryable ? handleRetry : undefined}
                onDismiss={() => setCurrentError(null)}
              />
            )}

            {/* Retry Information */}
            {retryAttempts > 0 && (
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3 text-blue-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Attempt {retryAttempts}/3 - If issues persist, please contact support.
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields remain the same as original, but with enhanced error handling */}
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white font-medium">
                  Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-medium">
                  Phone Number <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* College Selection */}
              <div className="space-y-2">
                <Label className="text-white font-medium">
                  College <span className="text-red-400">*</span>
                </Label>
                <Select 
                  onValueChange={(value) => handleInputChange('college', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-red-500 focus:ring-red-500">
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {collegeOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="text-white focus:bg-gray-700"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.college && (
                  <p className="text-red-400 text-sm">{errors.college}</p>
                )}
              </div>

              {/* Other Institution (Conditional) */}
              {formData.college === 'Others' && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="otherInstitution" className="text-white font-medium">
                    Institution Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="otherInstitution"
                    type="text"
                    placeholder="Enter your institution name"
                    value={formData.otherInstitution}
                    onChange={(e) => handleInputChange('otherInstitution', e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                    disabled={isSubmitting}
                  />
                  {errors.otherInstitution && (
                    <p className="text-red-400 text-sm">{errors.otherInstitution}</p>
                  )}
                </div>
              )}

              {/* Year of Study */}
              <div className="space-y-2">
                <Label className="text-white font-medium">
                  Year of Study <span className="text-red-400">*</span>
                </Label>
                <Select 
                  onValueChange={(value) => handleInputChange('year', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-red-500 focus:ring-red-500">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {yearOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="text-white focus:bg-gray-700"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.year && (
                  <p className="text-red-400 text-sm">{errors.year}</p>
                )}
              </div>

              {/* Course/Branch */}
              <div className="space-y-2">
                <Label htmlFor="course" className="text-white font-medium">
                  Course/Branch <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="course"
                  type="text"
                  placeholder="e.g., Computer Science, Electronics, Mechanical"
                  value={formData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  disabled={isSubmitting}
                />
                {errors.course && (
                  <p className="text-red-400 text-sm">{errors.course}</p>
                )}
              </div>

              {/* Payment Section */}
              <div className="space-y-4 p-6 bg-gradient-to-r from-crimson/10 via-crimson/5 to-crimson/10 backdrop-blur-md border border-crimson/20 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-crimson" />
                  Registration Fee
                  <Badge variant="secondary" className="bg-crimson text-white ml-auto">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {RAZORPAY_CONFIG.PASS_AMOUNT / 100}
                  </Badge>
                </h3>
                
                <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                  <p className="text-blue-400 text-sm font-medium mb-2">🔒 Secure Payment via Razorpay</p>
                  <p className="text-blue-300 text-xs">
                    • Your payment is processed securely through Razorpay<br/>
                    • Supports UPI, Card, Net Banking, and Wallet payments<br/>
                    • You'll receive instant confirmation after successful payment
                  </p>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4 p-6 bg-gradient-to-r from-gray-800/50 via-gray-700/30 to-gray-800/50 backdrop-blur-md border border-gray-600/30 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => {
                      setTermsAccepted(checked as boolean);
                      if (checked && errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    className="mt-1 bg-gray-700/50 border-gray-500 data-[state=checked]:bg-crimson data-[state=checked]:border-crimson"
                    disabled={isSubmitting}
                  />
                  <div className="flex-1">
                    <Label htmlFor="terms" className="text-white font-medium cursor-pointer">
                      I accept all the{' '}
                      <button
                        type="button"
                        onClick={() => window.open('/terms-and-conditions.pdf', '_blank')}
                        className="text-crimson hover:text-crimson-bright underline hover:no-underline transition-all duration-200"
                        disabled={isSubmitting}
                      >
                        Terms & Conditions
                      </button>
                      <span className="text-red-400 ml-1">*</span>
                    </Label>
                    <p className="text-gray-400 text-sm mt-1">
                      Please read and accept our terms and conditions to proceed with registration.
                    </p>
                  </div>
                </div>
                {errors.terms && (
                  <p className="text-red-400 text-sm ml-7">{errors.terms}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || isPaymentLoading || !termsAccepted || !isOnline}
                className="w-full bg-crimson hover:bg-crimson-bright text-white py-4 text-lg font-semibold transition-all duration-200 disabled:opacity-50 shadow-lg"
              >
                {isSubmitting || isPaymentLoading ? (
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {isPaymentLoading ? 'Opening Payment Gateway...' : 'Processing Registration...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pay ₹{RAZORPAY_CONFIG.PASS_AMOUNT / 100} & Register
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedRegistrationForm;
