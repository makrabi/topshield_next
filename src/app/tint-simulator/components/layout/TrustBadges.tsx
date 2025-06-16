// components/TrustBadges.tsx
export default function TrustBadges() {
  const badges = [
    { icon: 'fas fa-truck', text: 'شحن سريع' },
    { icon: 'fas fa-shield-alt', text: 'ضمان 10 سنوات' },
    { icon: 'fas fa-lock', text: 'دفع آمن' },
    { icon: 'fas fa-headset', text: 'دعم فني 24/7' },
  ];

  return (
    <div className="trust-badges flex justify-center gap-2 my-8 flex-wrap">
      {badges.map((badge, index) => (
        <div key={index} className="trust-badge flex items-center gap-2 bg-ts-gray-100 px-3 py-2 rounded-full font-medium">
          <i className={`${badge.icon} text-ts-gold`}></i>
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
}