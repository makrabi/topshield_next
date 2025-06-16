document.addEventListener('DOMContentLoaded', () => {

    // --- منطق تغيير خلفية الشريط العلوي عند التمرير ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- منطق الرسوم المتحركة عند التمرير (IntersectionObserver) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- منطق قسم "عيش التجربة" التفاعلي ---
    const runDemoBtn = document.getElementById('runDemoBtn');
    const shieldToggle = document.getElementById('shieldToggle');
    const rock = document.getElementById('rock');
    const crack = document.getElementById('crack');
    const shieldEffect = document.getElementById('shieldEffect');
    const shieldStatus = document.getElementById('shieldStatus');
    let isDemoRunning = false;

    if (runDemoBtn && shieldToggle && rock && crack && shieldEffect && shieldStatus) {
        
        const updateShieldStatus = () => {
            const isShieldActive = shieldToggle.checked;
            shieldStatus.classList.remove('protected', 'unprotected');
            if(isShieldActive) {
                shieldStatus.textContent = "كليرتي شيلد مُفعّل";
                shieldStatus.classList.add('protected');
            } else {
                shieldStatus.textContent = "بدون حماية";
                shieldStatus.classList.add('unprotected');
            }
        };

        // تحديث الحالة الأولية عند تحميل الصفحة
        updateShieldStatus();

        runDemoBtn.addEventListener('click', () => {
            if (isDemoRunning) return;
            isDemoRunning = true;
            runDemoBtn.disabled = true;

            // إعادة تعيين الحالة
            crack.style.transform = 'translate(-50%, -50%) scale(0)';
            crack.style.opacity = '0';
            rock.style.animation = 'none';
            void rock.offsetWidth; // Force reflow to restart animation

            const isShieldActive = shieldToggle.checked;

            if (isShieldActive) {
                shieldEffect.classList.add('active');
                rock.style.animation = 'rock-bounce 1.5s ease-out forwards';
                setTimeout(() => shieldEffect.classList.remove('active'), 1500);
            } else {
                rock.style.animation = 'rock-hit 1s ease-in forwards';
                setTimeout(() => {
                    crack.style.transform = 'translate(-50%, -50%) scale(1)';
                    crack.style.opacity = '1';
                }, 950);
            }

            setTimeout(() => {
                isDemoRunning = false;
                runDemoBtn.disabled = false;
            }, 2000);
        });

        shieldToggle.addEventListener('change', updateShieldStatus);
    }
});