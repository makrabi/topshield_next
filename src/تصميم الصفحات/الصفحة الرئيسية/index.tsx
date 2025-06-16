
import Head from 'next/head';
import { useEffect, useRef } from 'react';

const HomePage = () => {
  const sandstormRef = useRef<HTMLDivElement>(null);
  const snowfallRef = useRef<HTMLDivElement>(null);
  const glassAnimationRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const menuToggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // إنشاء العاصفة الرملية
    const createSandstorm = () => {
      if (!sandstormRef.current) return;
      
      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.classList.add('sand-particle');
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * -100}px`;
        particle.style.animationDuration = `${Math.random() * 8 + 3}s`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        sandstormRef.current.appendChild(particle);
      }
    };

    // إنشاء تساقط الثلوج
    const createSnowfall = () => {
      if (!snowfallRef.current) return;
      
      for (let i = 0; i < 100; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.style.width = `${Math.random() * 10 + 3}px`;
        flake.style.height = flake.style.width;
        flake.style.left = `${Math.random() * 100}vw`;
        flake.style.top = `${Math.random() * 100}vh`;
        flake.style.animationDuration = `${Math.random() * 8 + 5}s`;
        flake.style.animationDelay = `${Math.random() * 5}s`;
        flake.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        snowfallRef.current.appendChild(flake);
      }
    };

    // شريط التنقل للأجهزة المحمولة
    const setupMobileMenu = () => {
      if (!menuToggleRef.current || !navLinksRef.current) return;
      
      menuToggleRef.current.addEventListener('click', () => {
        navLinksRef.current?.classList.toggle('active');
        const icon = menuToggleRef.current?.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinksRef.current?.classList.remove('active');
          const icon = menuToggleRef.current?.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        });
      });
    };

    // تأثير التمرير السلس
    const setupSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (!targetId) return;
          
          const targetElement = document.querySelector(targetId);
          if (!targetElement) return;
          
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - 90,
            behavior: 'smooth'
          });
        });
      });
    };

    // تأثير التمرير لشريط التنقل
    const setupNavbarScroll = () => {
      const header = document.querySelector('header');
      if (!header) return;
      
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
          header.style.background = 'rgba(31, 63, 148, 0.98)';
        } else {
          header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
          header.style.background = 'rgba(31, 63, 148, 0.95)';
        }
      });
    };

    // تفعيل تأثيرات الأقسام عند التمرير
    const setupSectionEffects = () => {
      const challengesSection = document.getElementById('challenges');
      const solutionsSection = document.getElementById('solutions');
      const featuresSection = document.getElementById('features');
      
      const observerOptions = {
        threshold: 0.3
      };
      
      const challengesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            challengesSection?.classList.add('active');
            sandstormRef.current?.classList.add('active');
          } else {
            challengesSection?.classList.remove('active');
            sandstormRef.current?.classList.remove('active');
          }
        });
      }, observerOptions);
      
      const solutionsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            solutionsSection?.classList.add('active');
            snowfallRef.current?.classList.add('active');
          } else {
            solutionsSection?.classList.remove('active');
            snowfallRef.current?.classList.remove('active');
          }
        });
      }, observerOptions);
      
      const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            featuresSection?.classList.add('active');
            glassAnimationRef.current?.classList.add('active');
          } else {
            featuresSection?.classList.remove('active');
            glassAnimationRef.current?.classList.remove('active');
          }
        });
      }, observerOptions);
      
      if (challengesSection) challengesObserver.observe(challengesSection);
      if (solutionsSection) solutionsObserver.observe(solutionsSection);
      if (featuresSection) featuresObserver.observe(featuresSection);
    };

    // تهيئة الصفحة
    createSandstorm();
    createSnowfall();
    setupMobileMenu();
    setupSmoothScroll();
    setupNavbarScroll();
    setupSectionEffects();
    
    // تهيئة تأثيرات قسم تحليل الطاقة
    const tempMarker = document.querySelector('.temp-marker');
    if (tempMarker) {
      tempMarker.setAttribute('style', 'left: 30%;');
    }
  }, []);

  return (
    <>
      <Head>
        <title>TOPSHIELD - الحلول المتكاملة للحماية والطاقة</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Tajawal', sans-serif;
        }
        
        :root {
          --royal-blue: #1F3F94;
          --gold-start: #FFD700;
          --gold-end: #DAA520;
          --skyblue-start: #B0E0E6;
          --skyblue-end: #4682B4;
          --gold-gradient: linear-gradient(135deg, var(--gold-start) 0%, var(--gold-end) 100%);
          --skyblue-gradient: linear-gradient(135deg, var(--skyblue-start) 0%, var(--skyblue-end) 100%);
          --light: #f8f9fa;
          --dark: #212529;
          --hot-orange: #FF6B35;
          --hot-red: #E63946;
          --cool-blue: #1D3557;
          --snow-white: #F1FAEE;
        }
        
        body {
          background-color: #f0f4f8;
          color: #333;
          overflow-x: hidden;
          background: linear-gradient(135deg, #0a192f 0%, #1a3a5f 100%);
          background-attachment: fixed;
        }
        
        /* التصميم العام */
        .container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 30px;
        }
        
        section {
          padding: 100px 0;
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 70px;
          position: relative;
          z-index: 10;
        }
        
        .section-title h2 {
          font-size: 3rem;
          color: white;
          margin-bottom: 20px;
          font-weight: 800;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .section-title p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.8;
        }
        
        .section-title::after {
          content: "";
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 5px;
          background: var(--gold-gradient);
          border-radius: 3px;
        }
        
        .btn {
          display: inline-block;
          padding: 15px 35px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          border: none;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: width 0.6s ease;
          z-index: -1;
        }
        
        .btn:hover::before {
          width: 100%;
        }
        
        .btn-primary {
          background: var(--gold-gradient);
          color: white;
          box-shadow: 0 10px 25px rgba(218, 165, 32, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 30px rgba(218, 165, 32, 0.5);
        }
        
        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .btn-outline:hover {
          background: white;
          color: var(--royal-blue);
        }
        
        /* شريط التنقل */
        header {
          background: rgba(31, 63, 148, 0.95);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
        }
        
        .logo {
          display: flex;
          align-items: center;
        }
        
        .logo img {
          height: 60px;
          margin-left: 15px;
        }
        
        .logo h1 {
          font-size: 2.2rem;
          color: white;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          align-items: center;
        }
        
        .nav-links li {
          margin: 0 10px;
        }
        
        .nav-links a {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 1.1rem;
          position: relative;
          padding: 8px 5px;
          transition: all 0.3s;
          white-space: nowrap;
        }
        
        .nav-links a:hover {
          color: #FFD700;
        }
        
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: var(--gold-gradient);
          transition: width 0.3s;
        }
        
        .nav-links a:hover::after {
          width: 100%;
        }
        
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .nav-actions .btn {
          margin: 0;
          padding: 12px 25px;
          font-size: 1rem;
        }
        
        /* أيقونة اللغات */
        .language-switcher {
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          position: relative;
        }
        
        .language-icon {
          font-size: 1.3rem;
        }
        
        .language-text {
          font-size: 0.9rem;
        }
        
        .menu-toggle {
          display: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: white;
        }
        
        /* قسم البطل */
        .hero {
          padding: 180px 0 120px;
          color: white;
          position: relative;
          overflow: hidden;
          background: url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
        }
        
        .hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(31, 63, 148, 0.85);
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          text-align: center;
          margin: 0 auto;
        }
        
        .hero h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 25px;
          line-height: 1.2;
          text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .hero p {
          font-size: 1.4rem;
          margin-bottom: 40px;
          opacity: 0.9;
          line-height: 1.8;
        }
        
        .hero-btns {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        
        /* قسم التحديات - تم التعديل هنا */
        .challenges {
          position: relative;
          background: linear-gradient(135deg, #FF6B35 0%, #E63946 100%);
        }
        
        .challenges::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(255, 107, 53, 0.2), rgba(230, 57, 70, 0.3));
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }
        
        .challenges.active::before {
          opacity: 1;
        }
        
        .sandstorm {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 2;
        }
        
        .sandstorm.active {
          opacity: 0.8;
        }
        
        .sand-particle {
          position: absolute;
          background: linear-gradient(135deg, #FFD700, #FF6B35);
          border-radius: 50%;
          animation: sandMove linear infinite;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
        }
        
        @keyframes sandMove {
          0% { transform: translateY(-100px) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(100px); opacity: 0; }
        }
        
        .challenges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          position: relative;
          z-index: 5;
        }
        
        .challenge-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.4s ease;
          text-align: center;
        }
        
        .challenge-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .challenge-icon {
          font-size: 3rem;
          color: white;
          margin-bottom: 20px;
          text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
        }
        
        .challenge-card h3 {
          font-size: 1.6rem;
          margin-bottom: 15px;
          color: white;
        }
        
        .challenge-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.8;
        }
        
        /* قسم الحلول */
        .solutions {
          position: relative;
          background: linear-gradient(to bottom, #1a3a5f 0%, #0a192f 100%);
        }
        
        .solutions::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(29, 53, 87, 0.8), rgba(168, 218, 220, 0.6));
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }
        
        .solutions.active::before {
          opacity: 1;
        }
        
        .solutions.active {
          background: linear-gradient(135deg, #1D3557, #457B9D);
        }
        
        .snowfall {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 2;
        }
        
        .snowfall.active {
          opacity: 1;
        }
        
        .snowflake {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: snowfall linear infinite;
        }
        
        @keyframes snowfall {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(100vh); }
        }
        
        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          position: relative;
          z-index: 5;
        }
        
        .solution-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          text-align: center;
        }
        
        .solution-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 215, 0, 0.3);
          background: rgba(168, 218, 220, 0.1);
        }
        
        .solution-icon {
          font-size: 3rem;
          color: #4CAF50;
          margin-bottom: 20px;
        }
        
        .solution-card h3 {
          font-size: 1.6rem;
          margin-bottom: 15px;
          color: white;
        }
        
        .solution-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
        }
        
        /* قسم المميزات */
        .features {
          position: relative;
          background: linear-gradient(to bottom, #0a192f 0%, #1a3a5f 100%);
        }
        
        .features::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(31, 63, 148, 0.8), rgba(218, 165, 32, 0.4));
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }
        
        .features.active::before {
          opacity: 1;
        }
        
        .glass-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 2;
          background: url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
        }
        
        .glass-animation.active {
          opacity: 0.3;
          animation: glassCool 2s ease-in-out;
        }
        
        @keyframes glassCool {
          0% { filter: brightness(1.5) contrast(1.2) hue-rotate(30deg); }
          50% { filter: brightness(1.2) contrast(1.1) hue-rotate(15deg); }
          100% { filter: brightness(1) contrast(1) hue-rotate(0deg); }
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          position: relative;
          z-index: 5;
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          text-align: center;
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 215, 0, 0.3);
          background: rgba(31, 63, 148, 0.1);
        }
        
        .feature-icon {
          font-size: 3rem;
          color: #4682B4;
          margin-bottom: 20px;
        }
        
        .feature-card h3 {
          font-size: 1.6rem;
          margin-bottom: 15px;
          color: white;
        }
        
        .feature-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
        }
        
        /* قسم تحليل الطاقة */
        .energy-analysis {
          position: relative;
          background: linear-gradient(135deg, #1D3557, #457B9D);
          padding: 120px 0;
          color: white;
        }
        
        .energy-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }
        
        .energy-header {
          text-align: center;
          margin-bottom: 50px;
        }
        
        .energy-header h2 {
          font-size: 2.8rem;
          margin-bottom: 20px;
          color: #FFD700;
        }
        
        .energy-header p {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.8;
        }
        
        .energy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 40px;
        }
        
        .energy-comparison {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          padding: 30px;
        }
        
        .comparison-title {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 30px;
          color: white;
        }
        
        .comparison-chart {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          height: 300px;
          margin-bottom: 30px;
        }
        
        .chart-bar {
          width: 60px;
          background: #E63946;
          border-radius: 8px 8px 0 0;
          position: relative;
          transition: height 1s ease, background 1s ease;
        }
        
        .chart-bar.without {
          background: #E63946;
        }
        
        .chart-bar.with {
          background: #1D3557;
        }
        
        .chart-bar-label {
          position: absolute;
          bottom: -40px;
          left: 0;
          width: 100%;
          text-align: center;
          font-weight: bold;
        }
        
        .chart-bar-value {
          position: absolute;
          top: -30px;
          left: 0;
          width: 100%;
          text-align: center;
          font-weight: bold;
        }
        
        .bills-comparison {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 40px;
        }
        
        .bill-card {
          text-align: center;
          padding: 20px;
          border-radius: 10px;
          width: 45%;
          transition: transform 0.3s ease;
        }
        
        .bill-card:hover {
          transform: translateY(-10px);
        }
        
        .bill-card.without {
          background: rgba(230, 57, 70, 0.2);
          border: 2px solid #E63946;
        }
        
        .bill-card.with {
          background: rgba(29, 53, 87, 0.2);
          border: 2px solid #1D3557;
        }
        
        .bill-card h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }
        
        .bill-amount {
          font-size: 2.2rem;
          font-weight: bold;
          margin: 15px 0;
        }
        
        .bill-card.without .bill-amount {
          color: #E63946;
        }
        
        .bill-card.with .bill-amount {
          color: #A8DADC;
        }
        
        .bill-saving {
          font-size: 1.2rem;
          color: #FFD700;
          font-weight: bold;
        }
        
        .temperature-tracker {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          padding: 30px;
          text-align: center;
        }
        
        .temp-title {
          font-size: 1.8rem;
          margin-bottom: 30px;
          color: white;
        }
        
        .temp-display {
          display: flex;
          justify-content: space-around;
          margin: 40px 0;
        }
        
        .temp-card {
          width: 45%;
          padding: 20px;
          border-radius: 10px;
          transition: transform 0.3s ease;
        }
        
        .temp-card:hover {
          transform: scale(1.05);
        }
        
        .temp-card.outside {
          background: rgba(230, 57, 70, 0.2);
          border: 2px solid #E63946;
        }
        
        .temp-card.inside {
          background: rgba(29, 53, 87, 0.2);
          border: 2px solid #1D3557;
        }
        
        .temp-card h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }
        
        .temp-value {
          font-size: 3.5rem;
          font-weight: bold;
          margin: 20px 0;
        }
        
        .temp-card.outside .temp-value {
          color: #E63946;
        }
        
        .temp-card.inside .temp-value {
          color: #A8DADC;
        }
        
        .temp-bar {
          height: 30px;
          background: linear-gradient(to right, #E63946, #1D3557);
          border-radius: 15px;
          margin: 20px 0;
          position: relative;
          overflow: hidden;
        }
        
        .temp-marker {
          position: absolute;
          top: 0;
          height: 100%;
          width: 4px;
          background: white;
          transform: translateX(-50%);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        }
        
        .temp-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        
        .temp-label {
          font-size: 1.1rem;
          font-weight: bold;
        }
        
        .energy-tracker {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          padding: 30px;
          margin-top: 40px;
        }
        
        .tracker-title {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 30px;
          color: #FFD700;
        }
        
        .tracker-chart {
          height: 300px;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          padding: 0 20px;
        }
        
        .tracker-bar {
          width: 50px;
          background: #1D3557;
          border-radius: 8px 8px 0 0;
          position: relative;
          transition: height 1s ease;
          margin: 0 15px;
        }
        
        .tracker-bar-label {
          position: absolute;
          bottom: -40px;
          left: 0;
          width: 100%;
          text-align: center;
        }
        
        .tracker-bar-value {
          position: absolute;
          top: -30px;
          left: 0;
          width: 100%;
          text-align: center;
          font-weight: bold;
          color: #FFD700;
        }
        
        /* قسم طلب الخدمة */
        .service-request {
          position: relative;
          background: linear-gradient(to bottom, #1a3a5f 0%, #0a192f 100%);
          overflow: hidden;
          text-align: center;
        }
        
        .request-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 50px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .request-content h2 {
          font-size: 2.5rem;
          color: white;
          margin-bottom: 20px;
        }
        
        .request-content p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 30px;
          line-height: 1.8;
        }
        
        /* قسم المتجر الإلكتروني */
        .products {
          position: relative;
          background: linear-gradient(to bottom, #0a192f 0%, #1a3a5f 100%);
          overflow: hidden;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .product-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          text-align: center;
        }
        
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 215, 0, 0.3);
        }
        
        .product-icon {
          font-size: 3rem;
          color: #FFD700;
          margin-bottom: 20px;
        }
        
        .product-card h3 {
          font-size: 1.6rem;
          margin-bottom: 15px;
          color: white;
        }
        
        .product-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          margin-bottom: 20px;
        }
        
        .product-price {
          font-size: 1.8rem;
          color: white;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        /* قسم الباقات والعروض */
        .offers {
          position: relative;
          background: linear-gradient(to bottom, #1a3a5f 0%, #0a192f 100%);
          overflow: hidden;
        }
        
        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .offer-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          padding: 40px 30px;
        }
        
        .offer-card.featured {
          border: 2px solid #FFD700;
          transform: scale(1.05);
          position: relative;
        }
        
        .offer-card.featured::before {
          content: 'الأكثر شعبية';
          position: absolute;
          top: 20px;
          left: 20px;
          background: var(--gold-gradient);
          color: white;
          padding: 8px 15px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.9rem;
        }
        
        .offer-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 215, 0, 0.3);
        }
        
        .offer-icon {
          font-size: 3.5rem;
          color: #FFD700;
          margin-bottom: 20px;
        }
        
        .offer-title {
          font-size: 1.7rem;
          color: white;
          margin-bottom: 15px;
        }
        
        .offer-price {
          font-size: 2.2rem;
          color: white;
          margin-bottom: 25px;
          font-weight: 700;
        }
        
        .offer-price span {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .offer-features {
          list-style: none;
          margin-bottom: 30px;
        }
        
        .offer-features li {
          color: rgba(255, 255, 255, 0.8);
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .offer-features li:last-child {
          border-bottom: none;
        }
        
        .offer-features li i {
          color: #FFD700;
          margin-left: 10px;
        }
        
        /* قسم اتصل بنا */
        .contact {
          position: relative;
          background: linear-gradient(to bottom, #1a3a5f 0%, #0a192f 100%);
          overflow: hidden;
        }
        
        .contact::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
          opacity: 0.05;
        }
        
        .contact-content {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 60px;
        }
        
        .contact-form {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 50px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .form-group {
          margin-bottom: 25px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: white;
        }
        
        .form-control {
          width: 100%;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }
        
        .form-control:focus {
          outline: none;
          border-color: #FFD700;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        textarea.form-control {
          min-height: 180px;
          resize: vertical;
        }
        
        .contact-info {
          flex: 1;
        }
        
        .contact-info h3 {
          font-size: 2.2rem;
          margin-bottom: 30px;
          color: white;
        }
        
        .contact-details {
          margin-bottom: 50px;
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 30px;
        }
        
        .contact-icon {
          background: var(--gold-gradient);
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 15px;
          flex-shrink: 0;
          font-size: 1.5rem;
        }
        
        .contact-text h4 {
          font-size: 1.4rem;
          margin-bottom: 10px;
          color: white;
        }
        
        .contact-text p, .contact-text a {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: color 0.3s;
          font-size: 1.1rem;
          line-height: 1.7;
        }
        
        .contact-text a:hover {
          color: #FFD700;
        }
        
        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1.5rem;
          transition: all 0.4s ease;
        }
        
        .social-link:hover {
          background: var(--gold-gradient);
          transform: translateY(-5px) rotate(10deg);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        /* التذييل - تم التعديل هنا */
        footer {
          background: #0a192f;
          color: white;
          padding: 80px 0 30px;
          position: relative;
          overflow: hidden;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          margin-bottom: 60px;
        }
        
        .footer-column h3 {
          font-size: 1.6rem;
          margin-bottom: 25px;
          position: relative;
          padding-bottom: 15px;
          color: white;
        }
        
        .footer-column h3::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 3px;
          background: var(--gold-gradient);
          border-radius: 3px;
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 15px;
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          display: block;
          padding: 8px 0;
          font-size: 1.1rem;
        }
        
        .footer-links a:hover {
          color: #FFD700;
          padding-right: 10px;
        }
        
        .footer-links a i {
          margin-left: 10px;
          font-size: 0.9rem;
        }
        
        .footer-newsletter {
          grid-column: span 4;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .footer-newsletter p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 25px;
          line-height: 1.8;
          font-size: 1.1rem;
        }
        
        .newsletter-form {
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          overflow: hidden;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .newsletter-form input {
          flex: 1;
          padding: 15px 20px;
          border: none;
          background: transparent;
          color: white;
          font-size: 1rem;
        }
        
        .newsletter-form input:focus {
          outline: none;
        }
        
        .newsletter-form button {
          background: var(--gold-gradient);
          color: white;
          border: none;
          padding: 0 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.2rem;
        }
        
        .newsletter-form button:hover {
          background: linear-gradient(135deg, var(--gold-end) 0%, var(--gold-start) 100%);
        }
        
        .copyright {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
        }
        
        /* التجاوب */
        @media (max-width: 1200px) {
          .hero h1 {
            font-size: 3rem;
          }
          
          .contact-content {
            flex-direction: column;
          }
          
          .contact-form {
            margin-bottom: 50px;
          }
          
          .energy-grid {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 992px) {
          .hero h1 {
            font-size: 2.7rem;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
          }
          
          .footer-newsletter {
            grid-column: span 1;
          }
        }
        
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
          
          .nav-links {
            position: fixed;
            top: 90px;
            right: -100%;
            background: rgba(31, 63, 148, 0.95);
            width: 80%;
            height: calc(100vh - 90px);
            flex-direction: column;
            align-items: center;
            padding: 50px 0;
            transition: right 0.4s ease;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            z-index: 1000;
          }
          
          .nav-links.active {
            right: 0;
          }
          
          .nav-links li {
            margin: 20px 0;
          }
          
          .hero h1 {
            font-size: 2.2rem;
          }
          
          .hero p {
            font-size: 1.1rem;
          }
          
          .hero-btns {
            flex-direction: column;
            align-items: center;
          }
          
          .section-title h2 {
            font-size: 2.2rem;
          }
          
          .offer-card.featured {
            transform: scale(1);
          }
          
          .bills-comparison,
          .temp-display {
            flex-direction: column;
            gap: 30px;
          }
          
          .bill-card,
          .temp-card {
            width: 100%;
          }
        }
        
        @media (max-width: 576px) {
          .hero {
            padding: 150px 0 80px;
          }
          
          .hero h1 {
            font-size: 2rem;
          }
          
          .section-title h2 {
            font-size: 1.8rem;
          }
          
          .energy-comparison,
          .temperature-tracker,
          .energy-tracker {
            padding: 20px;
          }
          
          .chart-bar {
            width: 40px;
          }
        }
      `}</style>

      {/* شريط التنقل */}
      <header>
        <div className="container">
          <nav>
            <div className="logo">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFD700' d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/%3E%3C/svg%3E" alt="TOPSHIELD Logo" />
              <h1>TOPSHIELD</h1>
            </div>
            
            <ul className="nav-links" ref={navLinksRef}>
              <li className="language-switcher">
                <i className="fas fa-globe language-icon"></i>
                <span className="language-text">الإنجليزية</span>
              </li>
              <li><a href="#challenges">التحديات</a></li>
              <li><a href="#solutions">الحلول</a></li>
              <li><a href="#services">الخدمات</a></li>
              <li><a href="#products">المتجر الالكتروني</a></li>
              <li><a href="#offers">الباقات والعروض</a></li>
              <li><a href="#" className="btn btn-outline">بوابة العملاء</a></li>
              <li><a href="#contact" className="btn btn-primary">تواصل معنا</a></li>
            </ul>
            
            <div className="menu-toggle" ref={menuToggleRef}>
              <i className="fas fa-bars"></i>
            </div>
          </nav>
        </div>
      </header>
      
      {/* قسم البطل */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>حلول متكاملة لحماية السيارات والمباني والطائرات</h1>
            <p>تقدم TOPSHIELD أحدث حلول الحماية والتظليل العازل للحرارة وتقنيات تحسين كفاءة الطاقة بجودة فائقة وضمان ممتاز</p>
            <div className="hero-btns">
              <a href="#solutions" className="btn btn-primary">اكتشف الحلول</a>
              <a href="#request" className="btn btn-outline">طلب استشارة</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* قسم التحديات */}
      <section className="challenges" id="challenges">
        <div className="sandstorm" id="sandstorm" ref={sandstormRef}></div>
        <div className="container">
          <div className="section-title">
            <h2>التحديات التي تواجهك</h2>
            <p>هذه أبرز التحديات التي يعاني منها العملاء في حياتهم اليومية ونحن هنا لحلها</p>
          </div>
          
          <div className="challenges-grid">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-temperature-high"></i>
              </div>
              <h3>ارتفاع درجات الحرارة داخل المركبات</h3>
              <p>السيارة تتحول إلى فرن في الصيف مما يجعل القيادة غير مريحة ويزيد من استهلاك الوقود لتشغيل التكييف</p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-sun"></i>
              </div>
              <h3>تلف المقاعد والأسطح الداخلية</h3>
              <p>أشعة الشمس الحارقة تتسبب في بهتان ألوان مقاعد السيارة وتلفها مع مرور الوقت</p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-fire"></i>
              </div>
              <h3>ارتفاع فواتير الكهرباء</h3>
              <p>استهلاك مكيفات الهواء المرتفع في المباني بسبب عدم عزل الحرارة بشكل فعال</p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>ضعف حماية الزجاج</h3>
              <p>زجاج السيارات والمباني معرض للكسر بسهولة مما يشكل خطراً على السلامة</p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>انعدام الخصوصية</h3>
              <p>عدم وجود خصوصية كافية في زجاج المباني والمركبات</p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-tint"></i>
              </div>
              <h3>تأثير الأشعة فوق البنفسجية</h3>
              <p>التعرض المباشر للأشعة فوق البنفسجية الضارة على الجلد والعينين</p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-car-crash"></i>
              </div>
              <h3>ضعف الرؤية في السيارة</h3>
              <p>الوهج الشديد من أشعة الشمس يؤثر على رؤية السائق ويزيد من خطر الحوادث</p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>عدم كفاءة الطاقة</h3>
              <p>المباني تستهلك طاقة كهربائية عالية دون وجود حلول فعالة للعزل الحراري</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* قسم الحلول */}
      <section className="solutions" id="solutions">
        <div className="snowfall" id="snowfall" ref={snowfallRef}></div>
        <div className="container">
          <div className="section-title">
            <h2>حلولنا المتكاملة</h2>
            <p>نقدم حلولاً مبتكرة للتحديات التي تواجهك في حياتك اليومية</p>
          </div>
          
          <div className="solutions-grid">
            <div className="solution-card">
              <div className="solution-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>تظليل سيارات عازل للحرارة</h3>
              <p>أفلام تظليل عالية الجودة تخفض حرارة السيارة بنسبة تصل إلى 70%، مما يوفر الراحة ويقلل استهلاك الوقود</p>
            </div>
            
            <div className="solution-card">
              <div className="solution-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>عزل حراري للمباني</h3>
              <p>حلول متكاملة لعزل واجهات المباني الزجاجية تخفض استهلاك الطاقة وتوفر الراحة الحرارية</p>
            </div>
            
            <div className="solution-card">
              <div className="solution-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>حماية الزجاج من الكسر</h3>
              <p>أفلام حماية متطورة للزجاج تمنع تشظيه عند الكسر وتوفر أماناً إضافياً للسيارات والمباني</p>
            </div>
            
            <div className="solution-card">
              <div className="solution-icon">
                <i className="fas fa-eye-slash"></i>
              </div>
              <h3>حلول الخصوصية الذكية</h3>
              <p>أفلام تظليل توفر خصوصية كاملة مع الحفاظ على الرؤية الواضحة من الداخل إلى الخارج</p>
            </div>
            
            <div className="solution-card">
              <div className="solution-icon">
                <i className="fas fa-sun"></i>
              </div>
              <h3>حجب الأشعة فوق البنفسجية</h3>
              <p>حلول متكاملة تحجب 99% من الأشعة فوق البنفسجية الضارة لحماية صحتك وممتلكاتك</p>
            </div>
            
            <div className="solution-card">
              <div className="solution-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>تحليل الطاقة</h3>
              <p>تحليل متقدم لاستهلاك الطاقة وتقديم حلول مخصصة لخفض الفواتير وزيادة الكفاءة</p>
            </div>
            
            <div className="solution-card">
              <div className="solution-icon">
                <i className="fas fa-paint-roller"></i>
              </div>
              <h3>طلاء نانو سيراميك</h3>
              <p>طلاء متقدم لحماية سطوح السيارات من الخدوش والتآكل مع لمعان استثنائي يدوم طويلاً</p>
            </div>
            
            <div className="solution-card">
              <div className="solution-icon">
                <i className="fas fa-snowflake"></i>
              </div>
              <h3>حلول التبريد الذكي</h3>
              <p>أنظمة تبريد متطورة للمباني تعمل بكفاءة عالية مع توفير استهلاك الطاقة</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* قسم تحليل الطاقة */}
      <section className="energy-analysis" id="energy">
        <div className="container">
          <div className="energy-content">
            <div className="energy-header">
              <h2>تحليل الطاقة الذكي</h2>
              <p>اكتشف كيف توفر TOPSHIELD فواتير الطاقة وتقلل استهلاك الوقود مع ضمان راحة باردة</p>
            </div>
            
            <div className="energy-grid">
              <div className="energy-comparison">
                <div className="comparison-title">
                  مقارنة الأداء مع وبدون TOPSHIELD
                </div>
                <div className="comparison-chart">
                  <div className="chart-bar without" style={{ height: '280px' }}>
                    <div className="chart-bar-value">48°C</div>
                    <div className="chart-bar-label">بدون توبشيلد</div>
                  </div>
                  <div className="chart-bar with" style={{ height: '160px' }}>
                    <div className="chart-bar-value">22°C</div>
                    <div className="chart-bar-label">مع توبشيلد</div>
                  </div>
                </div>
                
                <div className="bills-comparison">
                  <div className="bill-card without">
                    <h3>فواتير الكهرباء قبل</h3>
                    <div className="bill-amount">1,200 ر.س</div>
                    <p>متوسط الفاتورة الشهري بدون حلول توبشيلد</p>
                  </div>
                  <div className="bill-card with">
                    <h3>فواتير الكهرباء بعد</h3>
                    <div className="bill-amount">720 ر.س</div>
                    <p>متوسط الفاتورة الشهري مع حلول توبشيلد</p>
                    <div className="bill-saving">توفير 40% شهرياً</div>
                  </div>
                </div>
              </div>
              
              <div className="temperature-tracker">
                <div className="temp-title">
                  تتبع درجات الحرارة
                </div>
                <div className="temp-display">
                  <div className="temp-card outside">
                    <h3>درجة الحرارة الخارجية</h3>
                    <div className="temp-value">48°C</div>
                    <p>درجة الحرارة في الخارج</p>
                  </div>
                  <div className="temp-card inside">
                    <h3>درجة الحرارة الداخلية</h3>
                    <div className="temp-value">22°C</div>
                    <p>درجة الحرارة مع توبشيلد</p>
                  </div>
                </div>
                
                <div className="temp-bar">
                  <div className="temp-marker" style={{ left: '30%' }}></div>
                </div>
                <div className="temp-labels">
                  <div className="temp-label">22°C</div>
                  <div className="temp-label">30°C</div>
                  <div className="temp-label">38°C</div>
                  <div className="temp-label">46°C</div>
                </div>
              </div>
              
              <div className="energy-tracker">
                <div className="tracker-title">
                  تتبع توفير الطاقة الشهري
                </div>
                <div className="tracker-chart">
                  <div className="tracker-bar" style={{ height: '240px' }}>
                    <div className="tracker-bar-value">40%</div>
                    <div className="tracker-bar-label">الشهر 1</div>
                  </div>
                  <div className="tracker-bar" style={{ height: '200px' }}>
                    <div className="tracker-bar-value">42%</div>
                    <div className="tracker-bar-label">الشهر 2</div>
                  </div>
                  <div className="tracker-bar" style={{ height: '180px' }}>
                    <div className="tracker-bar-value">45%</div>
                    <div className="tracker-bar-label">الشهر 3</div>
                  </div>
                  <div className="tracker-bar" style={{ height: '160px' }}>
                    <div className="tracker-bar-value">48%</div>
                    <div className="tracker-bar-label">الشهر 4</div>
                  </div>
                  <div className="tracker-bar" style={{ height: '140px' }}>
                    <div className="tracker-bar-value">50%</div>
                    <div className="tracker-bar-label">الشهر 5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* قسم المميزات */}
      <section className="features" id="features">
        <div className="glass-animation" id="glass-animation" ref={glassAnimationRef}></div>
        <div className="container">
          <div className="section-title">
            <h2>مميزات منتجاتنا</h2>
            <p>اكتشف لماذا تتفوق حلولنا على المنافسة</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-thermometer-three-quarters"></i>
              </div>
              <h3>عزل حراري فائق</h3>
              <p>نسبة عزل حراري تصل إلى 70%، تخفض درجات الحرارة بشكل ملحوظ وتوفر الراحة</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-virus"></i>
              </div>
              <h3>حماية من الكسر</h3>
              <p>أفلام حماية تمنع تشظي الزجاج عند الكسر، توفر أماناً إضافياً للركاب والسكان</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>توفير الطاقة</h3>
              <p>خفض استهلاك الطاقة بنسبة تصل إلى 40% في المباني و25% في المركبات</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>وضوح الرؤية</h3>
              <p>حلول تظليل توفر خصوصية مع الحفاظ على وضوح الرؤية من الداخل إلى الخارج</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-sun"></i>
              </div>
              <h3>حجب الأشعة الضارة</h3>
              <p>حجب 99% من الأشعة فوق البنفسجية لحماية الجلد والعينين والممتلكات</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h3>لمعان دائم</h3>
              <p>طلاء نانو سيراميك يعطي سطوح السيارات لمعاناً استثنائياً يدوم لسنوات</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-medal"></i>
              </div>
              <h3>ضمان ممتد</h3>
              <p>ضمان يصل إلى 10 سنوات على منتجاتنا، يضمن لك جودة وأداء مستمرين</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tools"></i>
              </div>
              <h3>سهولة الصيانة</h3>
              <p>منتجاتنا لا تحتاج إلى صيانة متكررة، مما يوفر وقتك ومالك</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* قسم طلب الخدمة */}
      <section className="service-request" id="request">
        <div className="container">
          <div className="section-title">
            <h2>طلب الخدمة</h2>
            <p>استعد لتجربة فائقة الجودة مع حلول TOPSHIELD</p>
          </div>
          
          <div className="request-content">
            <h2>جاهزون لحل جميع تحدياتك</h2>
            <p>فريقنا من الخبراء جاهز لمساعدتك في اختيار الحل الأمثل لسيارتك أو منزلك أو مبنى عملك. تواصل معنا اليوم واحصل على استشارة مجانية وتقييم شامل لاحتياجاتك.</p>
            <a href="#contact" className="btn btn-primary">اطلب خدمتك الآن</a>
          </div>
        </div>
      </section>
      
      {/* قسم المتجر الإلكتروني */}
      <section className="products" id="products">
        <div className="container">
          <div className="section-title">
            <h2>المتجر الإلكتروني</h2>
            <p>اكتشف منتجاتنا المتطورة واختر ما يناسب احتياجاتك</p>
          </div>
          
          <div className="products-grid">
            <div className="product-card">
              <div className="product-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>فيلم تظليل سيارات فاخر</h3>
              <p>تظليل عازل للحرارة بنسبة 70% مع حجب 99% من الأشعة فوق البنفسجية</p>
              <div className="product-price">799 ر.س</div>
              <a href="#" className="btn btn-outline">شراء المنتج</a>
            </div>
            
            <div className="product-card">
              <div className="product-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>فيلم حماية الزجاج الأمامي</h3>
              <p>حماية متقدمة ضد الكسر والتشقق مع الحفاظ على وضوح الرؤية</p>
              <div className="product-price">1,299 ر.س</div>
              <a href="#" className="btn btn-outline">شراء المنتج</a>
            </div>
            
            <div className="product-card">
              <div className="product-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>فيلم عزل حراري للمباني</h3>
              <p>حلول عزل حراري متكاملة لواجهات المباني الزجاجية</p>
              <div className="product-price">2,499 ر.س</div>
              <a href="#" className="btn btn-outline">شراء المنتج</a>
            </div>
            
            <div className="product-card">
              <div className="product-icon">
                <i className="fas fa-spa"></i>
              </div>
              <h3>طلاء نانو سيراميك</h3>
              <p>طلاء متقدم للحماية الدائمة للسيارة من الخدوش والتآكل</p>
              <div className="product-price">1,899 ر.س</div>
              <a href="#" className="btn btn-outline">شراء المنتج</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* قسم الباقات والعروض */}
      <section className="offers" id="offers">
        <div className="container">
          <div className="section-title">
            <h2>الباقات والعروض</h2>
            <p>اختر الباقة التي تناسب احتياجاتك واستمتع بعروض حصرية</p>
          </div>
          
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3 className="offer-title">باقة السيارات الأساسية</h3>
              <div className="offer-price">1,499 <span>ر.س</span></div>
              <ul className="offer-features">
                <li><i className="fas fa-check"></i> تظليل زجاج كامل</li>
                <li><i className="fas fa-check"></i> حماية الزجاج الأمامي</li>
                <li><i className="fas fa-check"></i> ضمان 3 سنوات</li>
                <li><i className="fas fa-check"></i> خدمة تركيب متنقلة</li>
              </ul>
              <a href="#" className="btn btn-outline">اختر الباقة</a>
            </div>
            
            <div className="offer-card featured">
              <div className="offer-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3 className="offer-title">باقة المباني المتكاملة</h3>
              <div className="offer-price">9,999 <span>ر.س</span></div>
              <ul className="offer-features">
                <li><i className="fas fa-check"></i> عزل حراري للواجهات</li>
                <li><i className="fas fa-check"></i> حماية ضد الكسر</li>
                <li><i className="fas fa-check"></i> تحليل طاقة شامل</li>
                <li><i className="fas fa-check"></i> صيانة دورية</li>
                <li><i className="fas fa-check"></i> ضمان 10 سنوات</li>
              </ul>
              <a href="#" className="btn btn-primary">اختر الباقة</a>
            </div>
            
            <div className="offer-card">
              <div className="offer-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="offer-title">باقة البلاتينيوم</h3>
              <div className="offer-price">4,999 <span>ر.س</span></div>
              <ul className="offer-features">
                <li><i className="fas fa-check"></i> تظليل سيارات فاخر</li>
                <li><i className="fas fa-check"></i> طلاء نانو سيراميك</li>
                <li><i className="fas fa-check"></i> حماية زجاج شاملة</li>
                <li><i className="fas fa-check"></i> صيانة سنوية</li>
                <li><i className="fas fa-check"></i> ضمان 5 سنوات</li>
              </ul>
              <a href="#" className="btn btn-outline">اختر الباقة</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* قسم اتصل بنا */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-title">
            <h2>اتصل بنا</h2>
            <p>يسعدنا تواصلك معنا، فريق الدعم جاهز لمساعدتك على مدار الساعة</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <label htmlFor="name">الاسم الكامل</label>
                  <input type="text" id="name" className="form-control" placeholder="ادخل اسمك الكامل" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <input type="email" id="email" className="form-control" placeholder="ادخل بريدك الإلكتروني" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">رقم الجوال</label>
                  <input type="tel" id="phone" className="form-control" placeholder="ادخل رقم جوالك" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">الموضوع</label>
                  <input type="text" id="subject" className="form-control" placeholder="موضوع الرسالة" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">الرسالة</label>
                  <textarea id="message" className="form-control" placeholder="اكتب رسالتك هنا..."></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">إرسال الرسالة</button>
              </form>
            </div>
            
            <div className="contact-info">
              <h3>معلومات التواصل</h3>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h4>العنوان</h4>
                    <p>شارع الملك سعود، الدمام، المملكة العربية السعودية</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h4>الهاتف</h4>
                    <p><a href="tel:+966591333313">+966 59 133 3313</a></p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h4>البريد الإلكتروني</h4>
                    <p><a href="mailto:Gcc@topshield.com">Gcc@topshield.com</a></p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-text">
                    <h4>ساعات العمل</h4>
                    <p>من السبت إلى الخميس: 8:00 - 11:30 صباحاً</p>
                    <p>ومن 4:00 - 9:30 مساءً</p>
                    <p>الجمعة: مغلق</p>
                  </div>
                </div>
              </div>
              
              <h3>تابعنا على</h3>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* التذييل */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>من نحن</h3>
              <ul className="footer-links">
                <li><a href="#"><i className="fas fa-chevron-left"></i> عن توبشيلد</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> قصتنا</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> رسالتنا</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> رؤيتنا</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> أهدافنا</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>الخدمات</h3>
              <ul className="footer-links">
                <li><a href="#"><i className="fas fa-chevron-left"></i> أفلام السيارات</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> أفلام المباني</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> أفلام الحماية من الانفجارات</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> النانو سيراميك</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> الطائرات / البحرية</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>الدعم والمساعدة</h3>
              <ul className="footer-links">
                <li><a href="#"><i className="fas fa-chevron-left"></i> بوابة العملاء</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> تواصل معنا</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> حجز موعد</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> تحليل الطاقة</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> الاقتراحات والشكاوى</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>المعرفة والامتيازات</h3>
              <ul className="footer-links">
                <li><a href="#"><i className="fas fa-chevron-left"></i> بوابة السفراء</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> طلب امتياز تجاري</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> معلومات الضمان</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> مركز العلامة التجارية</a></li>
                <li><a href="#"><i className="fas fa-chevron-left"></i> الفعاليات</a></li>
              </ul>
            </div>
            
            <div className="footer-column footer-newsletter">
              <h3>النشرة البريدية</h3>
              <p>اشترك في نشرتنا البريدية لتصلك أحدث العروض والأخبار</p>
              <form className="newsletter-form">
                <input type="email" placeholder="بريدك الإلكتروني" />
                <button type="submit"><i className="fas fa-paper-plane"></i></button>
              </form>
            </div>
          </div>
          
          <div className="copyright">
            <p>جميع الحقوق محفوظة &copy; 2023 TOPSHIELD LLC . تم التصميم والتطوير بكل ❤️</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;