# 🔑 Gemini API Setup Guide

## Why the API Connection Failed

The current API key might be:
- ❌ Expired or invalid
- ❌ Not properly configured
- ❌ Missing required permissions
- ❌ Rate limited

## 🚀 How to Get a Working API Key

### Step 1: Go to Google AI Studio
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account

### Step 2: Create New API Key
1. Click "Create API Key"
2. Choose "Create API key in new project" or select existing project
3. Copy the generated API key (starts with `AIza...`)

### Step 3: Enable Gemini API
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Select your project
3. Go to "APIs & Services" → "Library"
4. Search for "Generative Language API"
5. Click "Enable"

### Step 4: Test Your Key
1. Go to the Recommendations page in your app
2. Scroll down to "API Key Troubleshooting" section
3. Paste your new API key in the input field
4. Click "🔑 Update API Key"
5. Click "🔧 Test API" to verify it works

## 🔧 Alternative: Use the Built-in Test

If you can't get a new API key right now, the app will still work with **fallback responses** that provide helpful nutrition and health advice based on your questions.

## 📝 API Key Format
- ✅ Valid: `AIzaSyCUP_ntv5RbF78sFacxQzHiA2Ow4K0XvCs`
- ❌ Invalid: Keys that don't start with `AIza`

## 🆘 Still Having Issues?

1. **Check Browser Console** (F12 → Console) for detailed error messages
2. **Try a different browser** or incognito mode
3. **Check your internet connection**
4. **Wait a few minutes** and try again (rate limiting)

## 💡 Pro Tip
The app works even without a working API key - it provides intelligent fallback responses for common health and nutrition questions!
