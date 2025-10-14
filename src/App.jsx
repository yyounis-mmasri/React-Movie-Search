import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import './styles/global.css';

// Lazy load Home page
const Home = lazy(() => import('./pages/Home'));

export default function App() {
  return (
    <Router>
      <div className="app-layout">
      
        <main className="app-main">
          <Suspense fallback={<Spinner label="Loading page..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
           
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}