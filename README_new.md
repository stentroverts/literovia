# Literovia 2025 - Literary Festival Website

A modern, responsive website for Literovia 2025, the literary festival by VNRVJIET's Stentorians Club.

## 🚀 Features

- **Dark Theme Design**: Modern crimson and black aesthetic
- **Razorpay Payment Integration**: Secure online payments for registration
- **Google Sheets Backend**: Registration data stored in Google Sheets
- **Responsive Design**: Works perfectly on all devices
- **Interactive UI**: Smooth animations and hover effects
- **Event Schedule**: Day-wise event listings with flip cards
- **Email Notifications**: Automatic confirmation emails

## 💳 Payment Integration

### Razorpay Setup
- **Test Key ID**: `rzp_test_J2WMFtkzHidr8Y`
- **Test Key Secret**: `SUCbeM387rMK70zNCoAKohKa`
- **Current Amount**: ₹149 (14900 paise)

### Changing Registration Amount
To modify the registration fee, update the `PASS_AMOUNT` in:
```typescript
// src/config/razorpay.ts
PASS_AMOUNT: 14900, // Amount in paise (149 INR = 14900 paise)
```

### Payment Flow
1. User fills registration form
2. Clicks "Pay ₹149 & Register"
3. Razorpay payment gateway opens
4. After successful payment, registration is saved
5. Email confirmation sent automatically

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI
- **Payment**: Razorpay
- **Backend**: Google Apps Script
- **Database**: Google Sheets
- **Build Tool**: Vite
- **Deployment**: Vercel

## 🏃‍♂️ Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── HeroSection.tsx
│   ├── RegisterSection.tsx
│   ├── NewRegistrationForm.tsx
│   └── ...
├── config/             # Configuration files
│   ├── razorpay.ts     # Razorpay configuration
│   └── google-sheets.ts
├── hooks/              # Custom React hooks
│   ├── useRazorpay.ts  # Razorpay integration hook
│   └── useTypewriter.ts
└── pages/              # Page components
    ├── Index.tsx
    ├── Register.tsx
    └── NotFound.tsx
```

## 🔧 Configuration

### Google Sheets Integration
Update the Google Apps Script URL in `src/config/google-sheets.ts`:
```typescript
SCRIPT_URL: 'your-google-apps-script-url'
```

### Razorpay Keys
For production, replace test keys with live keys in `src/config/razorpay.ts`.

## 📧 Email Templates
Email confirmations are sent automatically with:
- Registration ID
- Payment details
- Event information
- Contact details

## 🎨 Customization

### Colors
The theme uses custom CSS variables defined in `src/index.css`:
- `--crimson`: Main accent color
- `--background`: Deep black background
- `--foreground`: Off-white text

### Fonts
Custom fonts are loaded from `src/assets/fonts/`:
- Sunday (Regular)
- Homemade Apple
- Playwrite US Trad

## 📱 Mobile Responsiveness

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized animations for mobile
- Collapsible navigation menu

## 🚀 Deployment

The project is ready for deployment on Vercel with included `vercel.json` configuration.

---

**Made with ❤️ by Stentorians Club, VNRVJIET**
