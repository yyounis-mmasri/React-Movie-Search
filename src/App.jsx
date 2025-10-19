import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingFallback from './components/LoadingFallback';
import NotFound from './pages/NotFound';
import './styles/variables.css';
// Lazy loading for pages
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Details = lazy(() => import('./pages/Details'));


export default function App() {
  return (
    <BrowserRouter>
    
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
             <Route path="/movie/:id" element={<Details />} /> 
            
           
  
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
     
    </BrowserRouter>
  );


}



