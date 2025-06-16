// src/hooks/useAnimationEffects.js
import { useEffect } from 'react';

export const useAnimationEffects = (refs) => {
  useEffect(() => {
    const createSandstorm = () => {
      if (!refs.sandstormRef.current) return;
      
      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.classList.add('sand-particle');
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * -100}px`;
        particle.style.animationDuration = `${Math.random() * 8 + 3}s`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        refs.sandstormRef.current.appendChild(particle);
      }
    };

    const createSnowfall = () => {
      if (!refs.snowfallRef.current) return;
      
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
        refs.snowfallRef.current.appendChild(flake);
      }
    };

    const setupMobileMenu = () => {
      if (!refs.menuToggleRef.current || !refs.navLinksRef.current) return;
      
      refs.menuToggleRef.current.addEventListener('click', () => {
        refs.navLinksRef.current?.classList.toggle('active');
        const icon = refs.menuToggleRef.current?.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          refs.navLinksRef.current?.classList.remove('active');
          const icon = refs.menuToggleRef.current?.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        });
      });
    };

    const setupSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (!targetId) return;
          
          const targetElement = document.querySelector(targetId);
          if (!targetElement) return;
          
          window.scrollTo({
            top: targetElement.offsetTop - 90,
            behavior: 'smooth'
          });
        });
      });
    };

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
            refs.sandstormRef.current?.classList.add('active');
          } else {
            challengesSection?.classList.remove('active');
            refs.sandstormRef.current?.class极速赛车开奖官网
List.remove('active');
          }
        });
      }, observerOptions);
      
      const solutionsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            solutionsSection?.classList.add('active');
            refs.snowfallRef.current?.classList.add('active');
          } else {
            solutionsSection?.classList.remove('active');
            refs.snowfallRef.current?.classList.remove('active');
          }
        });
      }, observerOptions);
      
      const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            featuresSection?.classList.add('active');
            refs.glassAnimationRef.current?.classList.add('active');
          } else {
            featuresSection?.classList.remove('active');
            refs.glassAnimationRef.current?.classList.remove('active');
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
  }, [refs]);
};