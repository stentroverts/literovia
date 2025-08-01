# Literovia Registration Form - Google Apps Script Setup

## Step 1: Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Rename the project to "Literovia Registration Form"

## Step 2: Add the Code Files

### Replace Code.gs:
1. Delete the default `myFunction()` in Code.gs
2. Copy and paste the entire content from `registration-form.js`

### Add HTML File:
1. Click the "+" next to "Files" 
2. Select "HTML"
3. Name it `registration-form`
4. Replace the default content with the content from `registration-form.html`

## Step 3: Deploy the Web App

1. Click "Deploy" > "New deployment"
2. Click the gear icon next to "Type"
3. Select "Web app"
4. Fill in the details:
   - **Description**: "Literovia Registration Form"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click "Deploy"
6. **IMPORTANT**: Copy the Web app URL - you'll need this!

## Step 4: Grant Permissions

1. Click "Authorize access" when prompted
2. Choose your Google account
3. Click "Advanced" > "Go to Literovia Registration Form (unsafe)"
4. Click "Allow"

## Step 5: Test the Form

1. Open the Web app URL in a new tab
2. Fill out and submit a test registration
3. Check that a new Google Sheet was created in your Google Drive named "Literovia Registrations"

## Step 6: Get the Registration URL

The URL you copied in Step 3 is your registration form URL. It will look like:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 7: Update Your Website

Use this URL to redirect users when they click the "Register NOW" button.

## Features Included:

✅ **Responsive Design** - Works on all devices
✅ **Data Validation** - Ensures all required fields are filled
✅ **Email Confirmation** - Sends confirmation email to registrants
✅ **Google Sheets Storage** - All data saved to a spreadsheet
✅ **Event Selection** - Users can choose specific events or all events
✅ **Professional UI** - Matches your website's dark theme
✅ **Error Handling** - User-friendly error messages

## Data Collected:

1. Full Name
2. Email Address
3. Phone Number
4. College/Institution
5. Year of Study
6. Course/Branch
7. Events to Participate
8. Dietary Requirements (Optional)
9. Additional Information (Optional)
10. Timestamp (Automatic)

## Next Steps:

1. Set up the Google Apps Script
2. Test the form
3. Update your website buttons to use the registration URL
4. Share the URL with participants

## Security Note:

The form is publicly accessible but data is only stored in your Google account. Only you can access the registration data through the Google Sheet.
