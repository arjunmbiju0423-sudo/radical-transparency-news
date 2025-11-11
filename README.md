# Radical Transparency News 📰

> A news aggregation platform with radical transparency - featuring real-time fact-checking, bias analysis, and multi-perspective coverage

## 🚀 Features

- **Dark Theme**: Modern, responsive design with a beautiful dark interface
- **Full Routing**: Complete navigation with React Router 6
- **Authentication System**: Context-based auth with login/register
- **News Aggregation**: Real-time news from NewsAPI
- **Bias Analysis**: Visual analysis of content bias
- **Fact-Checking**: Claim verification and fact-checking system
- **Glass Box Transparency**: Sources, bias indicators, and claims sidebar
- **Multi-Perspective**: Conflict and consensus feed views
- **User Preferences**: Customizable news feed and settings
- **AI Constitution**: Ethical guidelines and principles

## 📦 Project Structure

```
radical-transparency-news/
├── frontend/                      # React frontend application
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── Navigation.js
│   │   │   ├── HomePage.js
│   │   │   ├── StoryPage.js
│   │   │   ├── ClaimExplorer.js
│   │   │   ├── AIConstitution.js
│   │   │   ├── Login.js
│   │   │   └── Preferences.js
│   │   ├── context/              # React Context
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
├── backend/                       # Express backend server
│   ├── server.js                 # Main server file with NewsAPI integration
│   └── package.json
└── .gitignore
```

## 🔧 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- NewsAPI key: `4af079e1e0784f118148812814c2ce41`

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/arjunmbiju0423-sudo/radical-transparency-news.git
cd radical-transparency-news
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
NEWS_API_KEY=4af079e1e0784f118148812814c2ce41
PORT=5000
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

In a new terminal, navigate to the frontend:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm start
```

The frontend will open automatically at `http://localhost:3000`

## 🚀 Running the Application

1. **Terminal 1 - Start Backend**:
   ```bash
   cd backend
   npm start
   ```
   Output: `🚀 Radical Transparency News API running on port 5000`

2. **Terminal 2 - Start Frontend**:
   ```bash
   cd frontend
   npm start
   ```
   Output: Browser opens at `http://localhost:3000`

## 📱 Features Walkthrough

### Home Page
- **Conflict Feed**: Shows divisive news stories
- **Consensus View**: Shows areas of agreement
- Click any story to view full details

### Story Page
- **Glass Box Transparency**:
  - 📚 Sources: All source information with credibility ratings
  - ⚖️ Bias Analysis: Visual representation of bias
  - ✓ Key Claims: Fact-checked claims with evidence

### Claim Explorer
- Filter claims by: All, Verified ✓, Disputed ⚠, False ✗
- Click claims to see detailed evidence
- Color-coded claim status

### User System
- Create an account or login
- Customize preferences
- Choose topics and sources
- Adjust perspective balance

### AI Constitution
- View the platform's ethical guidelines
- Understand core principles
- Learn about operational guidelines

## 🔌 API Endpoints

### News Endpoints
- `GET /api/stories` - Get latest news stories
- `GET /api/stories/:id` - Get story details
- `GET /api/claims` - Get fact-checked claims
- `GET /api/search?q=query` - Search news

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### User Endpoints
- `GET /api/user/preferences` - Get user preferences
- `POST /api/user/preferences` - Save user preferences

### Health
- `GET /api/health` - API health check

## 🔐 Environment Variables

### Backend (.env)
```
NEWS_API_KEY=4af079e1e0784f118148812814c2ce41
PORT=5000
```

## 📚 Tech Stack

### Frontend
- React 18
- React Router 6
- Axios
- CSS3 (Dark theme, Responsive)

### Backend
- Express.js
- Node.js
- Axios (for NewsAPI calls)
- CORS enabled

## 🎨 Design Features

- **Color Scheme**:
  - Primary BG: #0a0a0a (Dark)
  - Accent Primary: #00d4ff (Cyan)
  - Accent Secondary: #ff00ff (Magenta)
  - Success: #00ff88 (Green)
  - Warning: #ffaa00 (Orange)
  - Danger: #ff3366 (Red)

- **Responsive Breakpoints**:
  - Desktop: Full layout
  - Tablet (768px): Single column
  - Mobile (480px): Minimal layout

## 📖 Usage Examples

### View News
1. Open http://localhost:3000
2. Click "🔥 Conflict Feed" to see divisive stories
3. Click "🤝 Consensus View" to see agreement areas
4. Click any story to view full details with analysis

### Check Claims
1. Go to "Claim Explorer" in the navbar
2. Filter by status: All, Verified ✓, Disputed ⚠, False ✗
3. Click any claim to see evidence and fact-checking

### Customize Settings
1. Click "Login" to create an account
2. After login, click "Preferences"
3. Choose topics, sources, and perspective balance
4. Save preferences

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- **NewsAPI**: For real-time news data
- **React**: For the UI framework
- **Express**: For the backend server

## 📧 Contact

For questions or feedback, reach out at: arjunmbiju0423@gmail.com

## 🗺️ Roadmap

- [ ] User authentication with JWT
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Advanced bias detection algorithms
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Community fact-checking
- [ ] API rate limiting and caching

---

**Made with ❤️ for radical transparency in news**
