import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // استقبال البيانات التي تم إرسالها من النموذج
    const data = await request.json();

    // طباعة البيانات في الطرفية (Terminal) للتأكد من وصولها
    console.log('New appointment data received:', data);

    // هنا يمكنك إضافة الكود الخاص بحفظ البيانات في قاعدة البيانات
    // ...

    // إرجاع رسالة نجاح إلى واجهة المستخدم
    return NextResponse.json(
      { message: 'Appointment booked successfully!', data },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    // إرجاع رسالة خطأ في حال حدوث مشكلة
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}