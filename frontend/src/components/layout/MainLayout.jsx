import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-page position-relative">
      <div className="ambient-glow-orb-1" aria-hidden="true"></div>
      <div className="ambient-glow-orb-2" aria-hidden="true"></div>
      <Navbar />
      <main className="flex-grow-1 position-relative" style={{ zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
