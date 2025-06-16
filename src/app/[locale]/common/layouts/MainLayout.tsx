import React from 'react';
import Header from './Header'; // يفترض أن Header.tsx في نفس المجلد (./)
import Footer from './Footer'; // يفترض أن Footer.tsx في نفس المجلد (./)

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;