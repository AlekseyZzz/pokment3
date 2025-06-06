import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PreSession from './pages/PreSession';
import PostSession from './pages/PostSession';
import ProgressTracker from './pages/ProgressTracker';
import ImageAnalysis from './pages/ImageAnalysis';
import KnowledgeBase from './pages/KnowledgeBase';
import Settings from './pages/Settings';
import Training from './pages/Training';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pre-session" element={<PreSession />} />
          <Route path="post-session" element={<PostSession />} />
          <Route path="progress" element={<ProgressTracker />} />
          <Route path="analysis" element={<ImageAnalysis />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="settings" element={<Settings />} />
          <Route path="training" element={<Training />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App