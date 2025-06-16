
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      mobileNumber, 
      invoiceNumber,
      name 
    } = await req.json();

    if (!firstName || !lastName || !email || !password || !mobileNumber || !invoiceNumber) {
      let missingFields = [];
      if (!firstName) missingFields.push("الاسم الأول");
      if (!lastName) missingFields.push("الاسم الأخير/العائلة");
      if (!email) missingFields.push("البريد الإلكتروني");
      if (!password) missingFields.push("كلمة المرور");
      if (!mobileNumber) missingFields.push("رقم الجوال");
      if (!invoiceNumber) missingFields.push("رقم الفاتورة");
      return NextResponse.json({ message: `الحقول التالية مطلوبة: ${missingFields.join('، ')}` }, { status: 400 });
    }

    const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      return NextResponse.json({ message: 'مستخدم بهذا البريد الإلكتروني موجود بالفعل' }, { status: 409 });
    }

    const existingUserByMobile = await prisma.user.findUnique({ where: { mobileNumber } });
    if (existingUserByMobile) {
      return NextResponse.json({ message: 'مستخدم برقم الجوال هذا موجود بالفعل' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        firstName,
        lastName,
        mobileNumber,
        invoiceNumber,
        name: name || `${firstName} ${lastName}`.trim() || email, 
      },
    });

    const { hashedPassword: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error: any) {
    console.error('[REGISTER_API_ERROR]', error); 
    if (error.code === 'P2002') { 
      let field = 'حقل';
      const target = error.meta?.target as string[] | undefined;
      if (target?.includes('email')) field = 'البريد الإلكتروني';
      else if (target?.includes('mobileNumber')) field = 'رقم الجوال';
      else if (target?.includes('invoiceNumber')) field = 'رقم الفاتورة';
      return NextResponse.json({ message: `هذا ${field} مستخدم بالفعل.` }, { status: 409 });
    }
    // ✅ تم حذف كتلة 'PrismaClientValidationError' المسببة للخطأ
    return NextResponse.json({ message: 'حدث خطأ داخلي في الخادم' }, { status: 500 });
  }
}
