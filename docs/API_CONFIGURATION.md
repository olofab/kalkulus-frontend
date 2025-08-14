# API Configuration Guide

This guide explains how to configure your Next.js frontend to connect to your Kotlin Spring Boot backend on Railway.

## Environment Setup

### Local Development

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your local backend URL:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8081
   ```

### Production Deployment on Vercel

#### Step 1: Get your Railway Backend URL

1. Go to your Railway dashboard
2. Find your Kotlin Spring Boot project
3. Copy the public URL (usually looks like: `https://your-backend-name.railway.app`)

#### Step 2: Configure Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend-name.railway.app`
   - **Environment**: Select all (Production, Preview, Development)

#### Step 3: Verify CORS Configuration

Make sure your Kotlin Spring Boot backend has CORS configured to allow your Vercel domains:

```kotlin
@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {
    
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:3000",           // Local development
                "https://your-app.vercel.app",     // Your Vercel production domain
                "https://*.vercel.app"             // All Vercel preview deployments
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
    }
}
```

#### Step 4: Deploy

1. Push your changes to your repository
2. Vercel will automatically deploy with the new environment variables

## API Client Features

The API client includes the following features:

### ✅ Environment-aware Configuration
- Automatically uses localhost for development
- Uses Railway URL for production
- Validates configuration on startup

### ✅ Authentication
- Automatic JWT token inclusion in requests
- Token storage in localStorage
- Automatic redirect to login on 401 errors

### ✅ Error Handling
- Network error detection
- Timeout handling (30 seconds)
- Server error logging
- User-friendly error messages

### ✅ Request/Response Logging
- Development mode logging
- Request and response tracking
- Error details in development

## Usage Examples

### Making API Calls

```typescript
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'

// GET request
const offers = await apiGet<Offer[]>('/api/offers')

// POST request
const newOffer = await apiPost<Offer>('/api/offers', offerData)

// PUT request
const updatedOffer = await apiPut<Offer>(`/api/offers/${id}`, updateData)

// DELETE request
await apiDelete(`/api/offers/${id}`)
```

### Public API Calls (no authentication)

```typescript
import { apiPublicPost, apiPublicGet } from '@/lib/api'

// Login
const authResponse = await apiPublicPost('/api/auth/login', credentials)

// Registration
const user = await apiPublicPost('/api/auth/register', userData)
```

## Troubleshooting

### Common Issues

1. **CORS errors**: Make sure your backend allows your Vercel domain
2. **404 errors**: Verify your Railway backend URL is correct
3. **Timeout errors**: Check if your Railway app is sleeping (free tier limitation)
4. **401 errors**: Check if JWT token is valid and not expired

### Debugging

Enable development logging by setting `NODE_ENV=development` in your environment variables.

### Testing the Connection

You can test your API connection by visiting:
```
https://your-backend-name.railway.app/api/health
```

(Make sure you have a health endpoint in your backend)

## Backend URL Examples

- **Railway**: `https://your-backend-name.railway.app`
- **Local**: `http://localhost:8081`

## Important Notes

- Always use `NEXT_PUBLIC_` prefix for environment variables that need to be accessible in the browser
- The API client automatically handles trailing slashes in URLs
- All authenticated requests include the JWT token from localStorage
- The client will automatically redirect to `/login` on authentication failures
