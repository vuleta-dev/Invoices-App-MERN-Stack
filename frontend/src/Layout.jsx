import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = () => {

  return (
    <main className="max-container">
      <div className="min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>

    </main>
  )
}

export default Layout