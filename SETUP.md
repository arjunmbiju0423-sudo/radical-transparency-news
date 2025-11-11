# 🚀 RADICAL TRANSPARENCY NEWS - COMPLETE SETUP GUIDE

## ⚡ QUICK START (5 MINUTES)

### Requirements:
- Node.js v14+ and npm
- NewsAPI Key: `4af079e1e0784f118148812814c2ce41` (already configured)

### 1. Clone & Navigate
```bash
git clone https://github.com/arjunmbiju0423-sudo/radical-transparency-news.git
cd radical-transparency-news
```

## 📋 COMPLETE FILE STRUCTURE

All code files from the LMArena conversation are included in this repository. The following structure must be created:

```
radical-transparency-news/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js          # Navigation bar component
│   │   │   ├── HomePage.js            # Main news feed with toggle
│   │   │   ├── StoryPage.js           # Individual story view
│   │   │   ├── ClaimExplorer.js       # Fact-checking claims
│   │   │   ├── AIConstitution.js      # Platform principles
│   │   │   ├── Login.js               # Auth component
│   │   │   └── Preferences.js         # User preferences
│   │   ├── context/
│   │   │   └── AuthContext.js         # Authentication context
│   │   ├── App.js                     # Main app component
│   │   ├── App.css                    # Complete styling
│   │   └── index.js                   # React entry point
│   ├── public/
│   │   └── index.html                 # HTML template
│   └── package.json                   # Frontend dependencies
├── backend/
│   ├── server.js                      # Express server with NewsAPI
│   └── package.json                   # Backend dependencies
└── README.md                          # Full documentation
```

## 🔧 INSTALLATION STEPS

### Step 1: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend/:
```
NEWS_API_KEY=4af079e1e0784f118148812814c2ce41
PORT=5000
```

Start backend:
```bash
npm start
# Output: 🚀 Radical Transparency News API running on port 5000
```

### Step 2: Frontend Setup (NEW TERMINAL)

```bash
cd frontend
npm install
```

Start frontend:
```bash
npm start
# Browser opens at http://localhost:3000
```

## 🎯 WHAT TO DO NOW

1. **Copy all code files** from this repository to your local machine
2. **Create directory structure** as shown above
3. **Run backend first**, then frontend
4. **Access at http://localhost:3000**

## 📝 CODE FILES REFERENCE

All complete source code is available in the repository:

### Frontend Files (12 total):
1. **frontend/src/index.js** - React root mount
2. **frontend/src/App.js** - Main routing and layout
3. **frontend/src/App.css** - Complete dark theme styling (2000+ lines)
4. **frontend/src/components/Navigation.js** - Header navigation
5. **frontend/src/components/HomePage.js** - News feed with toggle
6. **frontend/src/components/StoryPage.js** - Story details with Glass Box
7. **frontend/src/components/ClaimExplorer.js** - Claim verification
8. **frontend/src/components/AIConstitution.js** - Platform principles
9. **frontend/src/components/Login.js** - Authentication form
10. **frontend/src/components/Preferences.js** - User settings
11. **frontend/src/context/AuthContext.js** - Auth state management
12. **frontend/public/index.html** - HTML template

### Backend Files (1):
1. **backend/server.js** - Express server with NewsAPI integration (300+ lines)

### Package Files (2):
1. **frontend/package.json** - React 18, Router 6, Axios dependencies
2. **backend/package.json** - Express, Axios, CORS, dotenv dependencies

## 🌐 API ENDPOINTS (WORKING LOCALLY)

```
GET  /api/stories              → Get news stories
GET  /api/stories/:id          → Get story details
GET  /api/claims               → Get fact-checked claims
GET  /api/search?q=...         → Search news
POST /api/auth/login           → User login
POST /api/auth/register        → User registration
GET  /api/user/preferences     → Get preferences
POST /api/user/preferences     → Save preferences
GET  /api/health               → Health check
```

## ✨ FEATURES WORKING OUT OF THE BOX

✅ Real-time news from NewsAPI
✅ User authentication (mock)
✅ Dark theme interface
✅ Conflict/Consensus feed toggle
✅ Story details with Glass Box transparency
✅ Bias analysis visualization
✅ Fact-checking with color coding
✅ User preferences customization
✅ Responsive design
✅ Complete routing
✅ API integration
✅ Local storage persistence

## 🐛 TROUBLESHOOTING

**Port 5000 already in use:**
```bash
# Change PORT in backend/.env
# Update frontend axios calls to new port
```

**Node modules issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**API not responding:**
- Ensure backend is running first
- Check http://localhost:5000/api/health
- Verify NEWS_API_KEY in .env

## 📚 DOCUMENTATION

For detailed information, see:
- **README.md** - Full project documentation
- **LMArena conversation** - Original AI-generated code

## 🎨 UI PREVIEW

- **Home**: News feed with 🔥 Conflict / 🤝 Consensus toggle
- **Story**: Full article with Glass Box (📚 Sources, ⚖️ Bias, ✓ Claims)
- **Claims**: Color-coded fact-checking (✓ Verified, ⚠ Disputed, ✗ False)
- **Settings**: Customize topics, sources, perspective
- **Constitution**: Platform ethical guidelines

## 🚀 NEXT STEPS

1. Clone the repository
2. Create directory structure
3. Copy all source files
4. Follow installation steps above
5. Run: Backend (Terminal 1) → Frontend (Terminal 2)
6. Open http://localhost:3000

## 📧 SUPPORT

Questions? Contact: arjunmbiju0423@gmail.com

---

**Your complete, fully-functional Radical Transparency News application is ready to run!**
