import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, CreditCard, IndianRupee } from 'lucide-react';
import { submitRegistration, type RegistrationData } from '@/config/google-sheets';
import { useRazorpay } from '@/hooks/useRazorpay';
import { RAZORPAY_CONFIG } from '@/config/razorpay';

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

const RegistrationForm: React.FC = () => {
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
  const [paymentData, setPaymentData] = useState<any>(null);

  // Razorpay integration
  const { initializePayment, isLoading: isPaymentLoading } = useRazorpay({
    onSuccess: async (razorpayResponse) => {
      console.log('Payment successful:', razorpayResponse);
      setPaymentData(razorpayResponse);
      
      // Submit registration with payment details
      await submitRegistrationWithPayment(razorpayResponse);
    },
    onError: (error) => {
      console.error('Payment failed:', error);
      setErrors({ submit: 'Payment failed. Please try again.' });
      setIsSubmitting(false);
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRegistrationWithPayment = async (razorpayResponse: any) => {
    try {
      setIsSubmitting(true);
      
      // Prepare registration data with payment info
      const registrationData: RegistrationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        college: formData.college === 'Others' ? formData.otherInstitution : formData.college,
        year: formData.year,
        course: formData.course,
        paymentId: razorpayResponse.razorpay_payment_id,
        paymentAmount: RAZORPAY_CONFIG.PASS_AMOUNT / 100, // Convert paise to rupees
        paymentStatus: 'completed'
      };

      // Submit to Google Sheets
      const result = await submitRegistration(registrationData);
      
      if (result.success) {
        setSubmitted(true);
        console.log('Registration submitted successfully:', result);
      } else {
        setErrors({ submit: result.message });
      }
      
    } catch (error) {
      console.error('Registration submission error:', error);
      setErrors({ submit: 'Failed to submit registration. Please contact support.' });
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
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ 
          ...prev, 
          paymentScreenshot: 'Please upload a valid image file (JPEG, JPG, PNG, WEBP)' 
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ 
          ...prev, 
          paymentScreenshot: 'File size must be less than 5MB' 
        }));
        return;
      }

      setFormData(prev => ({ ...prev, paymentScreenshot: file }));
      setErrors(prev => ({ ...prev, paymentScreenshot: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Initialize Razorpay payment
      await initializePayment({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });
      
    } catch (error) {
      console.error('Payment initialization error:', error);
      setErrors({ submit: 'Failed to initialize payment. Please try again.' });
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 pt-20">
        <div className="max-w-md mx-auto">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold text-white">Registration Successful!</h2>
                <p className="text-gray-300">
                  Thank you for registering for Literovia 2025. We'll contact you soon with further details.
                </p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="bg-red-600 hover:bg-red-700"
                >
                  Register Another Person
                </Button>
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.fullName}
                  </p>
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
                />
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
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
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* College Selection */}
              <div className="space-y-2">
                <Label className="text-white font-medium">
                  College <span className="text-red-400">*</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange('college', value)}>
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
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.college}
                  </p>
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
                  />
                  {errors.otherInstitution && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.otherInstitution}
                    </p>
                  )}
                </div>
              )}

              {/* Year of Study */}
              <div className="space-y-2">
                <Label className="text-white font-medium">
                  Year of Study <span className="text-red-400">*</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange('year', value)}>
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
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.year}
                  </p>
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
                />
                {errors.course && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.course}
                  </p>
                )}
              </div>

              {/* Payment Section - Razorpay Integration */}
              <div className="space-y-4 p-6 bg-gradient-to-r from-crimson/10 via-crimson/5 to-crimson/10 backdrop-blur-md border border-crimson/20 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-crimson" />
                  Registration Fee
                  <Badge variant="secondary" className="bg-crimson text-white ml-auto">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {RAZORPAY_CONFIG.PASS_AMOUNT / 100}
                  </Badge>
                </h3>
                
                <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-300 font-medium">Literovia 2025 Pass</span>
                    <span className="text-2xl font-bold text-crimson flex items-center">
                      <IndianRupee className="w-5 h-5 mr-1" />
                      {RAZORPAY_CONFIG.PASS_AMOUNT / 100}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>• Access to all events on Sept 8-9, 2025</p>
                    <p>• Digital certificate of participation</p>
                    <p>• Networking opportunities with literary enthusiasts</p>
                    <p>• Refreshments and materials included</p>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                  <p className="text-blue-400 text-sm font-medium mb-2">🔒 Secure Payment via Razorpay</p>
                  <p className="text-blue-300 text-xs">
                    • Your payment is processed securely through Razorpay<br/>
                    • Supports UPI, Card, Net Banking, and Wallet payments<br/>
                    • You'll receive instant confirmation after successful payment
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || isPaymentLoading}
                className="w-full bg-crimson hover:bg-crimson-bright text-white py-4 text-lg font-semibold transition-all duration-200 disabled:opacity-50 shadow-lg"
              >
                {isSubmitting || isPaymentLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isPaymentLoading ? 'Opening Payment Gateway...' : 'Processing Registration...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pay ₹{RAZORPAY_CONFIG.PASS_AMOUNT / 100} & Register
                  </div>
                )}
              </Button>

              {errors.submit && (
                <Alert className="bg-red-500/10 border-red-500 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;
