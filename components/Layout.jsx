import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-row justify-start ">
      <Sidebar />
      <div className="bg-white flex-1 p-4 text-light dark:bg-dark_portfolio_bg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
