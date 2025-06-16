document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const elements = {
        // Landing page elements
        mobileMenuButton: document.getElementById('mobile-menu-button'),
        mobileMenu: document.getElementById('mobile-menu'),
        cartCount: document.getElementById('cart-count'),
        productsGrid: document.getElementById('products-grid'),
        alertContainer: document.getElementById('alert-container'),
        
        // Simulator elements
        simulator: document.getElementById('simulator'),
        vehicleOptions: document.getElementById('vehicle-options'),
        tintOptions: document.getElementById('tint-options'),
        previewImage: document.getElementById('preview-image'),
        tintOverlay: document.getElementById('tint-overlay'),
        rearQuarterSection: document.getElementById('rear-quarter-glass-section'),
        sunroofTintWrapper: document.getElementById('sunroof-tint-wrapper'),
        detailedSelects: document.querySelectorAll('#simulator .vlt-select'),
        priceSection: document.getElementById('price-section'),
        totalPrice: document.getElementById('total-price'),
        addToCartBtn: document.getElementById('add-to-cart-btn'),
        buyNowBtn: document.getElementById('buy-now-btn'),
    };

    // --- State & Configuration ---
    let selectionState = {
        vehicleType: null,
        previewTint: 0.05,
        parts: {
            windshield_vlt: null,
            front_doors_vlt: null,
            rear_doors_vlt: null,
            rear_quarter_vlt: null,
            rear_window_vlt: null,
            sunroof_type: 'none',
            sunroof_vlt: null,
        }
    };

    const basePrices = {
        'رياضية': 800, 'سيدان': 700,
        'عائلية/دفع رباعي': 950, 'شاحنة': 900
    };
    
    let cartItems = 0;

    // --- Main Functions ---

    const updateUI = () => {
        // Update cart counter in header
        elements.cartCount.textContent = cartItems;
        elements.cartCount.classList.toggle('hidden', cartItems === 0);

        // --- Update simulator UI only if it exists on the page ---
        if (!elements.simulator) return;

        document.querySelectorAll('#simulator .vehicle-option').forEach(el => {
            el.classList.toggle('selected', el.dataset.vehicleType === selectionState.vehicleType);
        });
        
        if (selectionState.vehicleType) {
            const selectedVehicleEl = document.querySelector(`#simulator .vehicle-option[data-vehicle-type="${selectionState.vehicleType}"]`);
            if(selectedVehicleEl) elements.previewImage.src = selectedVehicleEl.dataset.previewImage;
        } else {
             elements.previewImage.src = 'https://placehold.co/800x500/cccccc/333?text=اختر+سيارة+للمعاينة&font=cairo';
        }

        const overlayOpacity = 1 - selectionState.previewTint;
        elements.tintOverlay.style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity.toFixed(2)})`;
        document.querySelectorAll('#simulator .tint-button').forEach(el => {
           el.classList.toggle('selected', parseFloat(el.dataset.vlt) === selectionState.previewTint);
        });

        elements.detailedSelects.forEach(select => {
            const partName = select.name;
            if (selectionState.parts.hasOwnProperty(partName)) {
                select.value = selectionState.parts[partName] || '';
            }
            updateDescription(select);
        });

        elements.rearQuarterSection.classList.toggle('hidden', selectionState.vehicleType !== 'عائلية/دفع رباعي');
        if (selectionState.vehicleType !== 'عائلية/دفع رباعي') {
            selectionState.parts.rear_quarter_vlt = null;
        }

        const sunroofType = selectionState.parts.sunroof_type;
        elements.sunroofTintWrapper.classList.toggle('hidden', !sunroofType || sunroofType === 'none');

        checkCompletionAndPrice();
    };
    
    const selectVehicle = (vehicleType) => {
        if (selectionState.vehicleType === vehicleType) return;
        
        selectionState.vehicleType = vehicleType;
        Object.keys(selectionState.parts).forEach(key => { selectionState.parts[key] = null; });
        selectionState.parts.sunroof_type = 'none';
        
        saveState();
        updateUI();
    };

    const selectPreviewTint = (vlt) => {
        selectionState.previewTint = vlt;
        saveState();
        updateUI();
    };

    const updateDescription = (selectElement) => {
        // Find the correct description display, which is a sibling to the parent div
        const descriptionDisplay = selectElement.closest('.flex').nextElementSibling;
        if (!descriptionDisplay || !descriptionDisplay.classList.contains('vlt-description-display')) return;
        
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const description = selectedOption ? selectedOption.dataset.description : "";
        descriptionDisplay.textContent = description;
        descriptionDisplay.classList.toggle('visible', !!description && selectElement.value !== "");
    };
    
    const calculatePrice = () => {
        if (!selectionState.vehicleType) return null;
        let totalPrice = basePrices[selectionState.vehicleType];
        
        const sunroofSelect = document.querySelector('#simulator select[name="sunroof_type"]');
        const selectedSunroofOption = sunroofSelect.options[sunroofSelect.selectedIndex];
        totalPrice += Number(selectedSunroofOption.dataset.price) || 0;
        
        return totalPrice;
    };
    
    const checkCompletionAndPrice = () => {
        let isComplete = !!selectionState.vehicleType;
        
        const requiredParts = ['windshield_vlt', 'front_doors_vlt', 'rear_doors_vlt', 'rear_window_vlt'];
        if (selectionState.vehicleType === 'عائلية/دفع رباعي') {
            requiredParts.push('rear_quarter_vlt');
        }
        if (selectionState.parts.sunroof_type && selectionState.parts.sunroof_type !== 'none') {
            requiredParts.push('sunroof_vlt');
        }

        for (const part of requiredParts) {
            if (!selectionState.parts[part]) {
                isComplete = false;
                break;
            }
        }
        
        elements.priceSection.classList.toggle('hidden', !isComplete);
        if(isComplete) {
            elements.totalPrice.textContent = `${calculatePrice()} ريال`;
        }
    };
    
    const showAlert = (message, type = 'success') => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert-message alert-${type}`;
        alertDiv.textContent = message;
        elements.alertContainer.innerHTML = '';
        elements.alertContainer.appendChild(alertDiv);
        elements.alertContainer.classList.remove('opacity-0', '-translate-y-10');
        setTimeout(() => {
            elements.alertContainer.classList.add('opacity-0', '-translate-y-10');
        }, 3000);
    };

    const addToCart = (productName) => {
        cartItems++;
        localStorage.setItem('topshieldCartItems', cartItems);
        updateUI();
        showAlert(`تمت إضافة "${productName}" إلى السلة!`, 'success');
    };

    const saveState = () => {
        localStorage.setItem('topshieldSelection', JSON.stringify(selectionState));
    };

    const loadState = () => {
        const savedState = localStorage.getItem('topshieldSelection');
        if (savedState) {
            selectionState = JSON.parse(savedState);
        }
        cartItems = parseInt(localStorage.getItem('topshieldCartItems') || '0', 10);
    };
    
    // --- Event Handlers ---
    elements.mobileMenuButton.addEventListener('click', () => {
        elements.mobileMenu.classList.toggle('hidden');
    });

    if (elements.productsGrid) {
        elements.productsGrid.addEventListener('click', (e) => {
            if (e.target.matches('.add-to-cart-btn-card')) {
                const card = e.target.closest('.product-card');
                const productName = card.querySelector('h3').textContent;
                addToCart(productName);
            }
        });
    }
    
    if (elements.simulator) {
        elements.vehicleOptions.addEventListener('click', (e) => {
            const target = e.target.closest('.vehicle-option');
            if (target) selectVehicle(target.dataset.vehicleType);
        });

        elements.tintOptions.addEventListener('click', (e) => {
            const target = e.target.closest('.tint-button');
            if (target) selectPreviewTint(parseFloat(target.dataset.vlt));
        });

        elements.detailedSelects.forEach(select => {
            select.addEventListener('change', () => {
                const partName = select.name;
                selectionState.parts[partName] = select.value || null;

                if(partName === 'sunroof_type' && select.value === 'none') {
                    selectionState.parts.sunroof_vlt = null;
                }
                
                saveState();
                updateUI();
            });
        });

        elements.addToCartBtn.addEventListener('click', () => {
            addToCart(`تخصيص ${selectionState.vehicleType}`);
        });

        elements.buyNowBtn.addEventListener('click', () => {
            showAlert('جاري تحويلك إلى صفحة الدفع...', 'success');
        });
    }

    // --- Initialization ---
    loadState();
    updateUI();
});