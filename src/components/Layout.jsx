import React from 'react';
import Navbar from './Navbar';
import '../styles/Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        {children}
      </main>
      <footer className="layout-footer">
        <p>&copy; 2024 MovieDB. All rights reserved.</p>
      </footer>
    </div>
  );
}