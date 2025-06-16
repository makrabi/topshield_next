import cv2
import numpy as np

# 1. تحميل الصورة الأصلية
img = cv2.imread('original_car.jpg', cv2.IMREAD_UNCHANGED)

# 2. إنشاء قناع للزجاج (عدل الإحداثيات حسب صورتك)
glass_mask = np.zeros(img.shape[:2], dtype=np.uint8)
glass_coords = [
    [(120,85), (390,200)],    # زجاج أمامي
    [(130,310), (380,380)],   # زجاج خلفي
    [(85,105), (115,290)],    # نافذة يسار
    [(395,105), (425,290)]    # نافذة يمين
]

for coord in glass_coords:
    cv2.rectangle(glass_mask, coord[0], coord[1], 255, -1)

# 3. إنشاء صورة الهيكل (Base Image)
base_img = img.copy()
base_img[glass_mask == 255] = [0,0,0,0]  # جعل الزجاج شفاف

# 4. إنشاء صورة الزجاج (Overlay Image)
glass_img = np.zeros_like(img)
glass_img[glass_mask == 255] = img[glass_mask == 255]

# 5. حفظ الصور
cv2.imwrite('base.png', base_img)
cv2.imwrite('glass.png', glass_img)