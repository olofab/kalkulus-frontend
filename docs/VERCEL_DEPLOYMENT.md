# Vercel Deployment Guide

## Quick Setup for Vercel + Railway

### Step 1: Prepare Your Repository

Make sure these files are in your repository:
- ✅ `.env.example` (template for environment variables)
- ✅ `docs/API_CONFIGURATION.md` (this guide)
- ✅ Updated API client with environment support

### Step 2: Deploy to Vercel

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   
   In Vercel dashboard → Settings → Environment Variables, add:
   
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-railway-app.railway.app
   Environment: Production, Preview, Development
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Step 3: Update Your Railway Backend CORS

In your Kotlin Spring Boot application, update CORS configuration:

```kotlin
@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {
    
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:3000",           // Local development
                "https://your-app.vercel.app",     // Replace with your actual domain
                "https://*.vercel.app"             // All Vercel preview deployments
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
    }
}
```

### Step 4: Test Your Deployment

1. Visit your Vercel app URL
2. Go to `/test` page
3. Click "Test Connection" to verify backend connectivity
4. Check browser console for any CORS errors

## Environment Variables Reference

| Variable | Development | Production |
|----------|------------|------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8081` | `https://your-railway-app.railway.app` |

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Update your Railway backend CORS configuration to include your Vercel domain.

### Issue: 404 Not Found
**Solution**: Verify your Railway app URL is correct and the backend is running.

### Issue: Connection Timeout
**Solution**: Railway free tier apps sleep after inactivity. Make a request to wake it up.

### Issue: Environment Variables Not Working
**Solution**: Make sure to use `NEXT_PUBLIC_` prefix for client-side variables.

## Monitoring

- **Vercel Logs**: Check deployment and runtime logs in Vercel dashboard
- **Railway Logs**: Monitor backend logs in Railway dashboard
- **Browser Console**: Check for CORS and network errors

## Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] CORS updated in Railway backend
- [ ] Test page working (`/test`)
- [ ] Authentication flow working
- [ ] API calls successful in production

## Local Development vs Production

| Environment | API URL | Notes |
|-------------|---------|-------|
| Local | `http://localhost:8081` | Backend running locally |
| Production | `https://your-app.railway.app` | Backend on Railway |

The API client automatically detects the environment and uses the appropriate URL.
