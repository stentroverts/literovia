# LITEROVIA REGISTRATION DEPLOYMENT

## How It Works
User provides Google Drive link → Link saved in Google Sheets → Email confirmation sent

## Deploy Steps

1. **Google Apps Script**
   - Go to https://script.google.com
   - Create new project
   - Copy paste `google-apps-script/registration.js`
   - Deploy as web app (Execute as "Me", Access "Anyone")
   - Copy web app URL

2. **Update Frontend**
   - Edit `src/config/google-sheets.ts`
   - Replace SCRIPT_URL with your web app URL

3. **Test**
   - Fill registration form with Google Drive link
   - Check Google Sheets for "Link Provided" status
   - Check email confirmation

## User Instructions
Users must:
- Upload payment screenshot to their Google Drive
- Set sharing to "Anyone with link can view"  
- Paste the shareable link in registration form
- Invalid/private links will result in registration rejection
