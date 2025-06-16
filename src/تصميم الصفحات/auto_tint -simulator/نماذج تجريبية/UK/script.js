// الانتظار حتى يتم تحميل محتوى الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {

    // --- تعريف العناصر الأساسية ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.close-modal-btn');
    const overlay = document.getElementById('overlay');
    const shadeOptionButtons = document.querySelectorAll('.shade-option');
    const upgradeCheckbox = document.getElementById('upgrade-checkbox');
    const priceElement = document.getElementById('product-price');
    const addToBasketButton = document.getElementById('add-to-basket-btn');

    // تعريف الأسعار
    const BASE_PRICE = 58.99;
    const UPGRADE_COST = 12.50;

    // --- وظائف النوافذ المنبثقة (Modals) ---
    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    overlay.addEventListener('click', () => {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(closeModal);
    });

    // --- وظيفة اختيار درجة التظليل ---
    shadeOptionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetValueId = button.dataset.targetValue;
            const selectedValue = button.dataset.value;
            
            const targetElement = document.getElementById(targetValueId);
            if(targetElement) {
                targetElement.textContent = selectedValue;
            }

            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    // --- وظيفة تحديث السعر ---
    function updatePrice() {
        let currentPrice = BASE_PRICE;
        if (upgradeCheckbox.checked) {
            currentPrice += UPGRADE_COST;
        }
        priceElement.textContent = `£${currentPrice.toFixed(2)}`;
    }
    upgradeCheckbox.addEventListener('change', updatePrice);
    
    // --- وظائف الكمية ---
    const decreaseQtyBtn = document.getElementById('decrease-qty');
    const increaseQtyBtn = document.getElementById('increase-qty');
    const qtyInput = document.getElementById('quantity');
    
    decreaseQtyBtn.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        if (currentValue > 1) {
            qtyInput.value = currentValue - 1;
        }
    });

    increaseQtyBtn.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    });

    // --- وظيفة زر "أضف إلى السلة" ---
    addToBasketButton.addEventListener('click', () => {
        const selectedData = {
            product: "تويوتا لاند كروزر - 2007 إلى 2012",
            windshieldTint: document.getElementById('windshield-value').textContent,
            frontDoorsTint: document.getElementById('front-doors-value').textContent,
            sideDoorsTint: document.getElementById('side-doors-value').textContent,
            rearSidesTint: document.getElementById('rear-sides-value').textContent,
            rearWindowTint: document.getElementById('rear-window-value').textContent,
            sunroofTint: document.getElementById('sunroof-value').textContent,
            quantity: parseInt(qtyInput.value),
            isUpgraded: upgradeCheckbox.checked,
            finalPrice: priceElement.textContent
        };

        console.log("البيانات التي سيتم إضافتها للسلة:", selectedData);
        
        const alertMessage = `
تمت إضافة المنتج للسلة بالتفاصيل التالية:
------------------------------------
- الزجاج الأمامي: ${selectedData.windshieldTint}
- البابين الاماميين: ${selectedData.frontDoorsTint}
- البابين الجانبيين: ${selectedData.sideDoorsTint}
- الجوانب الخلفية: ${selectedData.rearSidesTint}
- الزجاج الخلفي: ${selectedData.rearWindowTint}
- فتحة السقف: ${selectedData.sunroofTint}
------------------------------------
- السعر النهائي: ${selectedData.finalPrice}
        `;
        alert(alertMessage);
    });
});