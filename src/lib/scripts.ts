// lib/scripts.ts (مثال)
export function createVisualEffect(parentElement: HTMLElement | null, particleClass: string, count: number, options: any = {}) {
  if (!parentElement || parentElement.children.length > 0) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add(particleClass);
    // تطبيق الأنماط الديناميكية بناءً على options
    // particle.style.width = ...
    // ...
    parentElement.appendChild(particle);
  }
}

// يمكن أن يكون لديك خطاف مخصص لـ IntersectionObserver
// useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react';

interface ObserverOptions extends IntersectionObserverInit {}

export function useIntersectionObserver(options: ObserverOptions = { threshold: 0.3 }) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting) {
                    elementRef.current?.classList.add('active');
                    // أي منطق إضافي عند التقاطع
                } else {
                    elementRef.current?.classList.remove('active');
                    // أي منطق إضافي عند عدم التقاطع
                }
            },
            options
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    return { elementRef, isIntersecting };
}