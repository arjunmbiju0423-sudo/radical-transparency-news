# 🚀 Deployment Guide for Radical Transparency News

## Quick Deploy Links

### Backend Deployment (Choose One)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/deploy?referralCode=YOUR_CODE)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Frontend Deployment (Choose One)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/arjunmbiju0423-sudo/radical-transparency-news)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/arjunmbiju0423-sudo/radical-transparency-news)

---

## 📋 Prerequisites

✅ MongoDB Atlas cluster (already set up)
✅ NewsAPI key: `4af079e1e0784f118148812814c2ce41`
✅ Gemini API key: `AIzaSyBM4QD4-9grja82rdE-N8OEcarRvY6Bet4`
✅ MongoDB URI: `mongodb+srv://arjunmbiju0423_db_user:lGmDYF5PEjyIlrxL@radicaltransparency.oq619ui.mongodb.net/radical-transparency?retryWrites=true&w=majority`

---

## 🔧 Manual Deployment Instructions

### Option 1: Deploy to Render.com (Recommended for Backend)

#### Backend:
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select `radical-transparency-news` repository
5. Configure:
   - **Name**: `radical-transparency-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add Environment Variables:
   ```
   PORT=5000
   NEWS_API_KEY=4af079e1e0784f118148812814c2ce41
   GEMINI_API_KEY=AIzaSyBM4QD4-9grja82rdE-N8OEcarRvY6Bet4
   MONGODB_URI=mongodb+srv://arjunmbiju0423_db_user:lGmDYF5PEjyIlrxL@radicaltransparency.oq619ui.mongodb.net/radical-transparency?retryWrites=true&w=majority
   JWT_SECRET=RadicalTransparency2024SecureJWTKey!@#$%
   ```
7. Click "Create Web Service"
8. Copy the deployed URL (will be like `https://radical-transparency-backend.onrender.com`)

#### Frontend:
1. Update `frontend/src` files to use the backend URL
2. Go to [Vercel](https://vercel.com/new)
3. Import `radical-transparency-news` repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
6. Deploy

---

### Option 2: Deploy to Railway (Alternative)

#### Backend:
1. Go to [Railway](https://railway.app/new)
2. Click "Deploy from GitHub repo"
3. Select `radical-transparency-news`
4. Add environment variables (same as above)
5. Set root directory to `backend`
6. Deploy

---

## 🌐 Live URLs (After Deployment)

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-api.onrender.com
- **MongoDB**: Already deployed at MongoDB Atlas

---

## 🧪 Testing After Deployment

1. **Test Backend Health**:
   ```bash
   curl https://your-backend-url/health
   ```
   
2. **Test News API**:
   ```bash
   curl https://your-backend-url/api/stories
   ```

3. **Test Frontend**:
   - Open your frontend URL in a browser
   - Check if news stories load
   - Try searching for news
   - Test user authentication

---

## 📝 Environment Variables Summary

### Backend (.env)
```
PORT=5000
NEWS_API_KEY=4af079e1e0784f118148812814c2ce41
GEMINI_API_KEY=AIzaSyBM4QD4-9grja82rdE-N8OEcarRvY6Bet4
MONGODB_URI=mongodb+srv://arjunmbiju0423_db_user:lGmDYF5PEjyIlrxL@radicaltransparency.oq619ui.mongodb.net/radical-transparency?retryWrites=true&w=majority
JWT_SECRET=RadicalTransparency2024SecureJWTKey!@#$%
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

---

## 🎯 Quick Start for Local Development

### Backend:
```bash
cd backend
npm install
npm start
```

### Frontend:
```bash
cd frontend
npm install
npm start
```

---

## 🔐 Security Notes

⚠️ **IMPORTANT**: The API keys in this file are for development. For production:
- Rotate all API keys
- Use environment variables on deployment platforms
- Never commit `.env` files to public repositories
- Enable CORS only for your frontend domain

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Deployment Guide](https://render.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [NewsAPI Documentation](https://newsapi.org/docs)
- [Google Gemini API Docs](https://ai.google.dev/docs)

---

## 🆘 Troubleshooting

### Backend not starting?
- Check if all environment variables are set
- Verify MongoDB connection string
- Check logs in Render/Railway dashboard

### Frontend not connecting to backend?
- Verify REACT_APP_API_URL is correct
- Check CORS settings in backend
- Open browser console for errors

### MongoDB connection issues?
- Verify IP whitelist in MongoDB Atlas (should allow all IPs: 0.0.0.0/0)
- Check username/password in connection string
- Ensure database user has read/write permissions

---

**✨ Your Radical Transparency News app is now ready for deployment!**
