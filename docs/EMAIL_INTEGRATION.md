# Email Integration Documentation

## Backend Email Integration

This document shows how to integrate with the backend email endpoint to send offer PDFs via email.

### Backend Endpoint Details

- **URL**: `POST /api/offers/{offerId}/email`
- **Authentication**: Requires JWT Bearer token (automatically handled)
- **Content-Type**: application/json

#### Request Body
```json
{
  "email": "customer@example.com",
  "subject": "Optional custom subject line",
  "message": "Optional custom message to include in email"
}
```

#### Response Format
**Success (200):**
```json
{
  "success": true,
  "message": "Tilbudet ble sendt til customer@example.com",
  "emailSentTo": "customer@example.com"
}
```

**Error (400/401/403/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Implementation

### 1. API Functions (lib/api.ts)

```typescript
import { sendOfferEmail, SendOfferEmailRequest, SendOfferEmailResponse } from '../lib/api'

// Basic usage
const response = await sendOfferEmail('123', {
  email: 'customer@example.com'
})

// With custom subject and message
const response = await sendOfferEmail('123', {
  email: 'customer@example.com',
  subject: 'Your Custom Quote',
  message: 'Thank you for your interest. Please find the quote attached.'
})
```

### 2. React Hook (offers/hooks/useSendOfferEmail.ts)

```typescript
import { useSendOfferEmail } from '../hooks/useSendOfferEmail'

function MyComponent() {
  const { sendEmail, isLoading, error, clearError } = useSendOfferEmail('123', {
    onSuccess: (response) => {
      console.log('Email sent:', response.message)
    },
    onError: (error) => {
      console.error('Email failed:', error)
    }
  })

  const handleSend = async () => {
    try {
      await sendEmail({
        email: 'customer@example.com',
        subject: 'Optional subject',
        message: 'Optional message'
      })
    } catch (err) {
      // Error handling is done by the hook
    }
  }

  return (
    <button onClick={handleSend} disabled={isLoading}>
      {isLoading ? 'Sending...' : 'Send Email'}
    </button>
  )
}
```

### 3. Complete Drawer Component (offers/components/SendOfferEmailDrawer.tsx)

```typescript
import SendOfferEmailDrawer from '../../components/SendOfferEmailDrawer'

function MyPage() {
  const [emailDrawerOpen, setEmailDrawerOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  return (
    <>
      <Button onClick={() => setEmailDrawerOpen(true)}>
        Send by Email
      </Button>

      <SendOfferEmailDrawer
        open={emailDrawerOpen}
        onClose={() => setEmailDrawerOpen(false)}
        offerId="123"
        defaultEmail="customer@example.com"
        onSuccess={(message, emailSentTo) => {
          setSuccessMessage(\`\${message} (\${emailSentTo})\`)
          // Optionally update offer status to PENDING
        }}
      />

      {successMessage && (
        <Toast 
          open={true} 
          message={successMessage} 
          severity="success" 
        />
      )}
    </>
  )
}
```

### 4. Direct Integration in Existing Components

For components that already have email buttons:

```typescript
// Replace the old onClick handler
onClick={() => setSendDrawerOpen(true)}

// With the new drawer
<SendOfferEmailDrawer
  open={sendDrawerOpen}
  onClose={() => setSendDrawerOpen(false)}
  offerId={offerId}
  defaultEmail={offer?.email || ''}
  onSuccess={(message, emailSentTo) => {
    // Handle success - show toast, update status, etc.
    setSuccessToast({ open: true, message, email: emailSentTo })
  }}
/>
```

## Features

### ✅ Implemented Features

1. **API Integration**: Full backend integration with error handling
2. **Email Validation**: RFC 5322 compliant email validation
3. **Loading States**: Visual feedback during email sending
4. **Error Handling**: Comprehensive error messages from backend
5. **Success Notifications**: Toast notifications on successful send
6. **Optional Fields**: Support for custom subject and message
7. **Default Values**: Pre-populate with customer email from offer
8. **Status Updates**: Automatically update offer status to PENDING

### 🎨 UI/UX Features

1. **Modern Drawer**: Bottom sheet design with rounded corners
2. **Progressive Disclosure**: Advanced options (subject/message) are optional
3. **Responsive Design**: Mobile-friendly interface
4. **Design System**: Uses Timla design system components
5. **Accessibility**: Proper focus management and keyboard navigation
6. **Loading States**: Disabled inputs and loading indicators

### 🔒 Security & Validation

1. **JWT Authentication**: Automatic token handling
2. **Email Validation**: Client-side validation before sending
3. **Error Messages**: User-friendly error messages
4. **Input Sanitization**: Trim whitespace and validate inputs

## Testing

### Manual Testing Steps

1. **Open offer summary page**: Navigate to `/offers/{id}/summary`
2. **Click "Send på e-post"**: Opens the email drawer
3. **Validate email field**: Try invalid emails to see validation
4. **Test advanced options**: Add custom subject and message
5. **Send email**: Click send and verify success/error handling
6. **Check offer status**: Verify offer status updates to PENDING

### Error Scenarios to Test

1. **Invalid email**: Should show validation error
2. **Network error**: Should show network error message
3. **Backend error**: Should show backend error message
4. **Empty required fields**: Should disable send button

## Migration from Old Implementation

The old implementation in `summary/page.tsx` has been fully replaced with:

1. **Old drawers removed**: Confirmation drawer and manual API calls
2. **New drawer component**: Reusable SendOfferEmailDrawer
3. **Improved UX**: Single-step process with optional advanced fields
4. **Better error handling**: More specific error messages
5. **Toast notifications**: Replaced success drawer with toast

## Usage in Other Components

To add email functionality to other components:

1. **Import the drawer**: `import SendOfferEmailDrawer from '../../components/SendOfferEmailDrawer'`
2. **Add state**: `const [emailDrawerOpen, setEmailDrawerOpen] = useState(false)`
3. **Add button**: Button that opens the drawer
4. **Add drawer**: The SendOfferEmailDrawer component
5. **Handle success**: Show toast or navigate after success
