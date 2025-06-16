// src/App.jsx
import React from 'react';
import CustomerInfoSection from './components/CustomerInfoSection'; // تأكد من المسار الصحيح

function App() {
  // حالة وهمية لـ formData و handleChange و setFormData
  // في تطبيقك الحقيقي، ستأتي هذه البيانات من state management أو context
  const [formData, setFormData] = React.useState({
    customerType: 'individual',
    individualFullName: '',
    individualMobile: '',
    individualPhone: '',
    individualEmail: '',
    individualAddressFull: '',
    individualAddressCity: '',
    individualAddressPostalCode: '',
    companyName: '',
    companyTaxNumber: '',
    companyCRNumber: '',
    companyEmail: '',
    companyPhoneNumber: '',
    companyWebsite: '',
    companyAddressCity: '',
    companyAddressPostalCode: '',
    companyAuthPersonName: '',
    companyAuthPersonMobile: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="App">
      <CustomerInfoSection 
        formData={formData} 
        handleChange={handleChange} 
        setFormData={setFormData} 
      />
    </div>
  );
}

export default App;