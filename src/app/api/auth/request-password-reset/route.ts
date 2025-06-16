// ✅ الكود الكامل والصحيح لملف: src/app/api/auth/request-password-reset/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // ✅ تم تصحيح المسار هنا
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'البريد الإلكتروني مطلوب وصيغته غير صحيحة.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = new Date(Date.now() + 3600000); // صلاحية ساعة واحدة

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: resetToken,
          passwordResetTokenExpiry: tokenExpiry,
        },
      });

      const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587", 10),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        secure: parseInt(process.env.EMAIL_SERVER_PORT || "587", 10) === 465,
      });

      const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME || 'فريق TOPSHIELD'}" <${process.env.EMAIL_FROM || 'noreply@topshield.com'}>`,
        to: user.email,
        subject: 'طلب إعادة تعيين كلمة المرور - TOPSHIELD',
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; text-align: right; line-height: 1.6;">
            <p>مرحباً ${user.name || user.email},</p>
            <p>لقد طلبت إعادة تعيين كلمة المرور لحسابك في بوابة عملاء TOPSHIELD.</p>
            <p>يرجى الضغط على الرابط التالي لتعيين كلمة مرور جديدة:</p>
            <p><a href="${resetUrl}" style="color: #0070f3; text-decoration: none; font-weight: bold; padding: 10px 15px; background-color: #e6f2ff; border-radius: 5px;">إعادة تعيين كلمة المرور</a></p>
            <p>(إذا لم يعمل الرابط، يرجى نسخه ولصقه في شريط عنوان المتصفح: ${resetUrl})</p>
            <p>إذا لم تطلب هذا، يرجى تجاهل هذه الرسالة.</p>
            <p>صلاحية هذا الرابط ساعة واحدة.</p>
            <br>
            <p>شكرًا لك,</p>
            <p>فريق TOPSHIELD</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('[EMAIL_SEND_ERROR] Failed to send password reset email:', emailError);
      }
    }

    return NextResponse.json({ message: 'إذا كان بريدك الإلكتروني مسجلاً لدينا، ستتلقى تعليمات إعادة تعيين كلمة المرور قريبًا.' }, { status: 200 });

  } catch (error) {
    console.error('[REQUEST_PASSWORD_RESET_API_ERROR]', error);
    return NextResponse.json({ message: 'حدث خطأ داخلي في الخادم.' }, { status: 500 });
  }
}