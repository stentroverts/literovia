# 🎭 Literovia 2025 - A Stentorian Odyssey

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://literovia.vercel.app)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-yellow)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-blue)](https://tailwindcss.com/)

> **The 1st Edition of Literovia** - Where stories come alive and imagination knows no bounds.

A premium literary festival website featuring modern React architecture, integrated payment systems, and automated registration management. Hosted at VNRVJIET Campus on **September 8-9, 2025**.

---

## 🌟 Features

### 🎨 **Modern Web Experience**
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Dark Theme**: Elegant crimson & ink color palette with deep black backgrounds
- **Smooth Animations**: Scroll-triggered animations and smooth transitions
- **Custom Typography**: Beautiful font combinations including Playfair Display, Sunday, and Homemade Apple
- **Particle Effects**: Interactive confetti and star animations

### 💳 **Integrated Payment System**
- **Razorpay Integration**: Secure online payment gateway
- **Real-time Processing**: Instant payment verification and confirmation
- **Registration Fee**: ₹149 per pass with access to all events
- **Payment Status Tracking**: Complete payment history and status management

### 📧 **Automated Registration**
- **Google Sheets Backend**: Automatic data storage and management
- **Email Confirmations**: Professional HTML emails with event brochure attachment
- **Registration IDs**: Unique ID generation for each participant
- **Form Validation**: Comprehensive form validation with error handling

### 🎪 **Event Management**
- **15+ Literary Events**: Across 2 days with diverse categories
- **Event Categories**: Speaking, Writing, Interactive, Workshops, Performances
- **Detailed Descriptions**: Complete event information with venues and timings
- **Dynamic Routing**: Individual pages for each event

---

## 🎯 Event Highlights

### **Day 1 - September 8, 2025**
- **🎤 Slam Poetry** (10:00 AM - 12:00 PM)
- **🎭 Mimic and Mystify** with Srinivos & Magician Ali (1:00 PM - 2:30 PM)
- **📚 Plot Bid** - Literary Auction (2:00 PM - 4:00 PM)
- **🤝 Paperback Partners** (11:00 AM - 12:30 PM)
- **👋 Sign Language Workshop** (11:00 AM - 12:30 PM)
- **🎯 Bang Jam** (7:00 PM - 9:00 PM)

### **Day 2 - September 9, 2025**
- **📝 MetaphorA** - Poetry Interpretation (10:00 AM - 11:30 AM)
- **⚔️ Spockle** - Debate Battles (11:45 AM - 1:00 PM)
- **🎭 P.S (Post Supper)** - After-dinner speeches (7:00 PM - 8:30 PM)
- **⚔️ Lore Wars** - Storytelling Duels (2:00 PM - 4:00 PM)
- **🎓 Between Reality and Imagination** - Panel Discussion (1:15 PM - 2:45 PM)

### **Both Days**
- **🎮 Arcade** - Gaming Extravaganza (9:00 AM - 5:00 PM)

---

## 🛠 Tech Stack

### **Frontend**
```json
{
  "framework": "React 18.3.1",
  "language": "TypeScript 5.5.3",
  "bundler": "Vite 5.4.1",
  "styling": "Tailwind CSS 3.4.11",
  "ui-components": "Radix UI + shadcn/ui",
  "routing": "React Router DOM 6.26.2",
  "animations": "Framer Motion + CSS Animations",
  "icons": "Lucide React",
  "payments": "Razorpay 2.9.6"
}
```

### **Backend & Services**
```json
{
  "registration": "Google Apps Script",
  "database": "Google Sheets",
  "email": "Gmail API",
  "hosting": "Vercel",
  "payments": "Razorpay Gateway"
}
```

### **Development Tools**
```json
{
  "linting": "ESLint 9.9.0",
  "formatting": "TypeScript ESLint",
  "build": "Vite Build System",
  "deployment": "Vercel CLI"
}
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** or **bun**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/stentroverts/literovia.git
cd literovia

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server (http://localhost:8080)
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # ESLint checking
```

---

## 🏗 Project Structure

```
literovia/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── AboutSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── NewRegistrationForm.tsx
│   │   ├── ScheduleSection.tsx
│   │   ├── SponsorsSection.tsx
│   │   └── 📁 ui/              # shadcn/ui components
│   ├── 📁 pages/
│   │   ├── Index.tsx           # Main landing page
│   │   ├── Register.tsx        # Registration page
│   │   ├── EventDetail.tsx     # Individual event pages
│   │   └── NotFound.tsx        # 404 page
│   ├── 📁 data/
│   │   ├── eventsData.ts       # Complete event information
│   │   └── eventUtils.ts       # Event helper functions
│   ├── 📁 config/
│   │   ├── razorpay.ts         # Razorpay configuration
│   │   └── google-sheets.ts    # Google Sheets API config
│   ├── 📁 hooks/
│   │   ├── useRazorpay.ts      # Payment hook
│   │   ├── useTypewriter.ts    # Typewriter animation
│   │   └── use-toast.ts        # Toast notifications
│   └── 📁 assets/              # Images, fonts, icons
├── 📁 google-apps-script/
│   └── registration.js         # Backend registration handler
├── 📁 public/
│   ├── events/                 # Event images
│   ├── email-header.png        # Email header
│   └── *.pdf                   # Documents (brochure, T&C)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── DEPLOY.md                   # Deployment guide
```

---

## ⚙️ Configuration

### **Environment Variables**

```env
# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=rzp_live_gL3oQI27aXXDTl
VITE_RAZORPAY_CURRENCY=INR
VITE_PASS_AMOUNT=14900  # ₹149 in paise
```

### **Payment Configuration**

```typescript
// src/config/razorpay.ts
export const RAZORPAY_CONFIG = {
  KEY_ID: 'rzp_live_gL3oQI27aXXDTl',
  CURRENCY: 'INR',
  PASS_AMOUNT: 14900, // ₹149 = 14900 paise
  COMPANY_NAME: 'Literovia 2025',
  DESCRIPTION: 'Literovia 2025 - Literary Festival Pass',
  THEME_COLOR: '#dc2626'
};
```

### **Color Theme**

```css
/* Primary Colors */
--background: rgb(10,10,10);     /* Deep black */
--crimson: #dc2626;              /* Crimson red */
--foreground: #f8fafc;           /* Off-white */
--secondary-text: #94a3b8;       /* Light gray */
```

---

## 🎨 Design System

### **Typography**
- **Primary**: Playfair Display (serif)
- **Secondary**: Della Respira (serif)
- **Accent**: Sunday (custom font)
- **Handwritten**: Homemade Apple
- **Modern**: Playwrite US Trad

### **Components Architecture**
- **Radix UI Primitives**: Accessible, unstyled components
- **shadcn/ui**: Pre-built component library
- **Custom Components**: Tailored for literary theme
- **Responsive Design**: Mobile-first approach

### **Animation System**
- **Scroll Animations**: Reveal on scroll
- **Hover Effects**: Interactive feedback
- **Loading States**: Smooth transitions
- **Particle Systems**: Confetti and stars

---

## 💻 Development

### **File Organization**
- **Components**: Reusable UI components
- **Pages**: Route-based page components  
- **Hooks**: Custom React hooks
- **Utils**: Helper functions and utilities
- **Config**: Configuration files
- **Data**: Static data and type definitions

### **Code Style**
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (via ESLint)
- **Tailwind**: Utility-first CSS

### **Development Workflow**
```bash
# 1. Create new feature branch
git checkout -b feature/new-feature

# 2. Make changes and test
npm run dev

# 3. Lint and build
npm run lint
npm run build

# 4. Commit and push
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

---

## 🚀 Deployment

### **Automated Deployment**
- **Platform**: Vercel
- **Domain**: [literovia.vercel.app](https://literovia.vercel.app)
- **Build Command**: `npm run build`
- **Deploy**: Auto-deploy on `main` branch push

### **Manual Deployment Steps**

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Vercel**
```bash
vercel --prod
```

### **Backend Setup**

1. **Google Apps Script Setup**
   - Go to [script.google.com](https://script.google.com)
   - Create new project
   - Copy `google-apps-script/registration.js`
   - Deploy as web app (Execute as "Me", Access "Anyone")
   - Copy web app URL

2. **Update Frontend Config**
   ```typescript
   // src/config/google-sheets.ts
   const SCRIPT_URL = 'your-web-app-url-here';
   ```

3. **Razorpay Configuration**
   - Live Key ID: `rzp_live_gL3oQI27aXXDTl`
   - Update keys in `src/config/razorpay.ts`

For detailed deployment instructions, see [DEPLOY.md](./DEPLOY.md).

---

## 📊 Registration System

### **Registration Flow**
1. **Form Submission**: User fills registration form
2. **Payment Gateway**: Razorpay payment processing
3. **Data Storage**: Automatic Google Sheets storage
4. **Email Confirmation**: HTML email with event brochure
5. **Registration ID**: Unique identifier generation

### **Data Structure**
```typescript
interface Registration {
  timestamp: string;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  course: string;
  paymentStatus: 'completed' | 'pending' | 'failed';
  paymentId: string;
  paymentAmount: number;
}
```

### **Payment Integration**
- **Gateway**: Razorpay
- **Amount**: ₹149 per pass
- **Currency**: INR
- **Verification**: Server-side validation
- **Receipts**: Auto-generated emails

---

## 📱 Features

### **User Experience**
- ✅ **Responsive Design**: Works on all devices
- ✅ **Fast Loading**: Optimized performance
- ✅ **Accessibility**: WCAG compliant components
- ✅ **SEO Optimized**: Meta tags and structured data
- ✅ **Progressive**: Works offline after first load

### **Event Management**
- ✅ **15+ Events**: Comprehensive event catalog
- ✅ **Category Filtering**: Organized by event type
- ✅ **Detailed Pages**: Individual event information
- ✅ **Schedule View**: Day-wise event timeline
- ✅ **Venue Information**: Location details

### **Registration Features**
- ✅ **Secure Payments**: Razorpay integration
- ✅ **Email Confirmations**: Automated notifications
- ✅ **PDF Attachments**: Event brochure included
- ✅ **Real-time Status**: Payment verification
- ✅ **Data Export**: Google Sheets integration

---

## 🎯 Event Categories

### **Speaking Events** 🎤
- Slam Poetry
- Bang Jam  
- P.S (Post Supper)
- Spockle

### **Writing Events** ✍️
- Plot Bid (Literary Auction)
- Lore Wars
- MetaphorA

### **Interactive Events** 🤝
- Paperback Partners

### **Workshops** 🎓
- Sign Language Workshop

### **Performances** 🎭
- Mimic and Mystify

### **Panel Discussions** 💬
- Between Reality and Imagination

### **Fun Events** 🎮
- Arcade

---

## 🏆 About Stentorian

**Stentorian** is the literary club of VNRVJIET (VNR Vignana Jyothi Institute of Engineering and Technology), dedicated to fostering creativity, expression, and literary excellence among students.

### **Contact Information**
- **Email**: stentorian@vnrvjiet.in
- **Phone**: 
  - Nehal Reddy: +91 6301 130 977
  - Sameer Ahmed: +91 99128 18640
- **Social Media**:
  - [Instagram](https://www.instagram.com/stentorian_vnrvjiet/)
  - [LinkedIn](https://www.linkedin.com/company/stentorian-vnrvjiet/)

### **Venue**
**VNRVJIET Campus**  
Vignana Jyothi Nagar, Pragathi Nagar,  
Nizampet, Hyderabad, Telangana 500090  
[📍 Google Maps](https://maps.app.goo.gl/ALiVUqrHErw1W7kG7)

---

## 📋 Registration Details

### **Festival Pass**
- **Price**: ₹149
- **Validity**: September 8-9, 2025
- **Access**: All events and activities
- **Includes**: Digital certificate of participation

### **What You Get**
- Access to 15+ literary events
- Event brochure (PDF)
- Networking opportunities
- Certificate of participation
- Refreshments during breaks
- Swag items (limited)

### **Registration Process**
1. Fill the registration form
2. Complete payment via Razorpay (₹149)
3. Receive confirmation email
4. Download event brochure
5. Join us on September 8-9, 2025!

**[🎫 Register Now](https://literovia.vercel.app/register)**

---

## 🤝 Contributing

We welcome contributions to improve Literovia! Here's how you can help:

### **Getting Started**
```bash
# Fork the repository
git clone https://github.com/your-username/literovia.git
cd literovia
npm install
npm run dev
```

### **Contribution Guidelines**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Code Style**
- Follow existing TypeScript patterns
- Use Tailwind CSS for styling
- Add proper type definitions
- Include JSDoc comments for functions
- Write meaningful commit messages

---

## 📄 License & Legal

### **Terms & Conditions**
- [Terms and Conditions](https://literovia.vercel.app/terms-and-conditions.pdf)
- [Privacy Policy](https://literovia.vercel.app/Literovia%20T&C%20and%20privacy%20policy.pdf)

### **Copyright**
© 2025 Literovia. All rights reserved.  
Crafted with ❤️ by **Stentorian - VNRVJIET**

---

## 🔧 Troubleshooting

### **Common Issues**

1. **Payment not processing**
   - Check Razorpay key configuration
   - Verify internet connection
   - Try different payment method

2. **Email not received**
   - Check spam folder
   - Verify email address entered correctly
   - Contact support: stentorian@vnrvjiet.in

3. **Registration form errors**
   - Fill all required fields
   - Check phone number format
   - Refresh page and try again

### **Development Issues**

1. **Build errors**
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Type errors**
   ```bash
   # Run type check
   npm run lint
   ```

3. **Port conflicts**
   ```bash
   # Use different port
   npm run dev -- --port 3001
   ```

---

## 📞 Support

### **For Participants**
- **Registration Help**: stentorian@vnrvjiet.in
- **Event Queries**: Check our [FAQ section](https://literovia.vercel.app)
- **Technical Issues**: Contact development team

### **For Sponsors**
- **Partnership Opportunities**: [Download Brochure](https://literovia.vercel.app/Literovia%20Sponsorship%20Brochure.pdf)
- **Contact**: stentorian@vnrvjiet.in
- **Phone**: +91 6301 130 977

### **Emergency Contact**
- **Event Day Support**: +91 99128 18640
- **Registration Desk**: Available during event hours

---

## 🌟 Acknowledgments

### **Special Thanks**
- **VNR Vignana Jyothi Institute** for hosting
- **Razorpay** for payment gateway services
- **Google** for Apps Script and Sheets integration
- **Vercel** for hosting platform
- **Open Source Community** for amazing tools and libraries

### **Built With Love Using**
- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool  
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI Primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component Library
- [Lucide React](https://lucide.dev/) - Icons
- [Google Apps Script](https://script.google.com/) - Backend
- [Razorpay](https://razorpay.com/) - Payments

---

## 🎉 Join the Literary Odyssey!

**Literovia 2025** isn't just an event – it's a celebration of creativity, expression, and the power of words. Whether you're a seasoned writer, an enthusiastic reader, or someone curious about the world of literature, we have something special waiting for you.

**📅 Mark Your Calendar**: September 8-9, 2025  
**📍 Location**: VNRVJIET Campus, Hyderabad  
**🎫 Registration**: ₹149 (All events included)

**Ready to embark on this literary journey?**

**[🚀 Register Now](https://literovia.vercel.app/register)** | **[📖 View Events](https://literovia.vercel.app/#schedule)** | **[📞 Contact Us](mailto:stentorian@vnrvjiet.in)**

---

<div align="center">

**Made with ❤️ by the Stentorian Team**

[Website](https://literovia.vercel.app) • [Instagram](https://www.instagram.com/stentorian_vnrvjiet/) • [LinkedIn](https://www.linkedin.com/company/stentorian-vnrvjiet/) • [Email](mailto:stentorian@vnrvjiet.in)

**Literovia 2025 - Where Stories Come Alive** ✨

</div>
