'use client';

import React from 'react';
import AppointmentForm from './components/AppointmentForm';

export default function AppointmentsPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-ts-gold">حجز موعد</h1>
      <AppointmentForm />
    </main>
  );
}
