import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import StoryDetail from './pages/StoryDetail';
import Constitution from './pages/Constitution';
import Topics from './pages/Topics';
import Search from './pages/Search';
import Preferences from './pages/Preferences';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo">
              <h1>🔍 FactLens</h1>
              <p className="tagline">News Through Transparency</p>
            </Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/topics">Topics</Link>
              <Link to="/search">Search</Link>
              <Link to="/constitution">AI Constitution</Link>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:category" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/constitution" element={<Constitution />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
