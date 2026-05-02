# رفع الداش بورد أونلاين وربطه

## المهم
أنا لا أستطيع رفعه داخل حسابك بدون صلاحية دخول، لكن هذه الحزمة جاهزة للرفع على GitHub Pages أو Vercel.

## 1) إنشاء API موحد
- افتح https://script.google.com
- New Project
- انسخ كود `Unified_API_JSONP.gs`
- Deploy > New Deployment > Web App
- Execute as: Me
- Who has access: Anyone
- انسخ رابط /exec

## 2) ربط الداش بورد
افتح `index.html` وابحث عن:
const UNIFIED_API_URL = "PUT_UNIFIED_API_LINK_HERE";
ضع رابط /exec مكانها.

## 3) الرفع على GitHub Pages
- أنشئ Repository جديد باسم lana-dashboard
- ارفع `index.html`
- Settings > Pages
- Source: Deploy from branch
- Branch: main / root
- الرابط سيكون مثل:
https://USERNAME.github.io/lana-dashboard/

## 4) PowerPoint
ملف PowerPoint يحتوي زر لفتح الداش بورد. بعد ظهور رابط GitHub Pages، ضع الرابط داخل الزر أو ارسل لي الرابط لأجهز لك نسخة PPT بالرابط النهائي.
