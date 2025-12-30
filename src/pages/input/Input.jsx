import React, { useState } from "react";
import "./Input.css";
import { send as emailjsSend } from '@emailjs/browser';


const streets = [
  "Юрія Іллєнка",
  "Парково-Сирецька",
  "Дегтярівська",
  "Новоукраїнська",
  "Степана Руданського",
  "Антона Цедіка",
  "Чистяківська",
  "Рене Декарта",
  "Червонозаводський",
  "Кулібіна",
  "Берестейський", 
  "Стрийська",
  "Галаганівська",
  "Велика Васильківська",
  "Німецька",
  "Іоанна Павла II",
  "Новопечерський",
  "Нижньоюрківська",
  "Татарський",
  "Олексія Бездольного",
  "Ескаваторна",
  "Андрія Абломасова",
  "Комбінатна",
  "Євгена Маланюка",
  "Флоренції",
  "Митрополита Андрея Шептицького",
  "Тютюнника",
  "Академіка Філатова",
  "Саперне Поле",
  "Єжи Гедройця",
  "Ованеса Туманяна",
  "Євгена Сверстюка",
  "Євгена Коновальця",
  "Василя Тютюнника",
  "Багговутівська",
  "Миколи Мурашка",
  "Платона Майбороди",
  "Половецька",
  "Отто Шмідта",
  "Печенізька",
  "Татарська",
  "Підгірна",
  "Лук'янівська",
  "Герцена",
  "Академіка Ромоданова",
  "Макарівська",
  "Деревлянська",
];

const iptvTariffs = [
  { value: "", label: "Виберіть IPTV тариф" },
  { value: "Легка", label: "Легка" },
  { value: "Оптимальний", label: "Оптимальний" },
  { value: "Максимальний", label: "Максимальний" },
  { value: "Спорт", label: "Спорт" },
  { value: "Кіно+", label: "Кіно+" },
];

export const Input = () => {
  const [form, setForm] = useState({
    tariff: "GPON 100",
    iptv: "",
    name: "",
    email: "",
    phone: "",
    street: "",
    house: "",
    flat: "",
  });
  const [isQuick, setIsQuick] = useState(false);
  
  // Prefill from URL query params (e.g. /input?street=Юрія+Іллєнка&name=Ivan)
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pre = {};
      if (params.get('name')) pre.name = params.get('name');
      if (params.get('phone')) pre.phone = params.get('phone');
      if (params.get('street')) pre.street = params.get('street');
      if (params.get('fromPopup')) setIsQuick(true);
      if (Object.keys(pre).length) setForm(f => ({ ...f, ...pre }));
    } catch (e) {
      // ignore
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If user came from popup (quick flow) require only name, phone, street
    const requiredFields = isQuick
      ? ["name", "phone", "street"]
      : ["name", "email", "phone", "street", "house", "flat"];

    for (const field of requiredFields) {
      if (!form[field] || !form[field].toString().trim()) {
        alert("Будь ласка, заповніть всі обов'язкові поля!");
        return;
      }
    }

    // persist order locally (placeholder for real backend)
    const saveLocal = () => {
      try {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const id = `ORD-${Date.now()}`;
        const order = {
          id,
          tariff: form.tariff,
          iptv: form.iptv,
          name: form.name,
          email: form.email,
          phone: form.phone,
          street: form.street,
          house: form.house,
          flat: form.flat,
          quick: !!isQuick,
          createdAt: new Date().toISOString(),
        };
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        return order;
      } catch (err) {
        return null;
      }
    };

    const order = saveLocal();

    // Send email via EmailJS. You must set your EmailJS `serviceId`, `templateId`, and `userId`.
    // The template should accept variables used below (name, phone, email, street, house, flat, tariff, iptv, orderId, recipients)
    // Try client-side EmailJS first (if configured via VITE variables), then serverless API, then mailto fallback
    const mailFallback = (orderObj) => {
      const to = import.meta.env.VITE_CONTACT_EMAILS || '';
      const subject = encodeURIComponent(`Заявка на підключення ${orderObj ? orderObj.id : ''}`);
      const bodyLines = [
        `Ім'я: ${form.name}`,
        `Телефон: ${form.phone}`,
        `Email: ${form.email || ''}`,
        `Вулиця: ${form.street}`,
        `Будинок: ${form.house || ''}`,
        `Квартира: ${form.flat || ''}`,
        `Тариф: ${form.tariff}`,
        `IPTV: ${form.iptv}`,
        `Номер заявки: ${orderObj ? orderObj.id : ''}`,
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      try { navigator.clipboard && navigator.clipboard.writeText(bodyLines.join('\n')); } catch (e) {}
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      alert('Автоматична відправка email не налаштована. Текст заявки скопійовано в буфер обміну і відкрито поштовий клієнт.');
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name: form.name,
      phone: form.phone,
      email: form.email || '',
      street: form.street,
      house: form.house || '',
      flat: form.flat || '',
      tariff: form.tariff,
      iptv: form.iptv,
      orderId: order ? order.id : null,
      recipients: import.meta.env.VITE_CONTACT_EMAILS || '',
    };

    if (serviceId && templateId && publicKey) {
      emailjsSend(serviceId, templateId, templateParams, publicKey)
        .then(() => {
          alert(`Заявку прийнято. Номер заявки: ${order ? order.id : 'N/A'}`);
          if (isQuick) setForm({ ...form, email: '', house: '', flat: '' });
        })
        .catch(() => {
          // fallback to serverless then mailto
          fetch('/api/send-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: form.name,
              phone: form.phone,
              email: form.email || '',
              street: form.street,
              house: form.house || '',
              flat: form.flat || '',
              tariff: form.tariff,
              iptv: form.iptv,
              orderId: order ? order.id : null,
            }),
          }).then(async (res) => {
            if (res.ok) {
              alert(`Заявку прийнято. Номер заявки: ${order ? order.id : 'N/A'}`);
              if (isQuick) setForm({ ...form, email: '', house: '', flat: '' });
            } else {
              mailFallback(order);
            }
          }).catch(() => {
            mailFallback(order);
          });
        });
      return;
    }

    // If EmailJS client not configured, fall back to serverless endpoint
    fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email || '',
        street: form.street,
        house: form.house || '',
        flat: form.flat || '',
        tariff: form.tariff,
        iptv: form.iptv,
        orderId: order ? order.id : null,
      }),
    }).then(async (res) => {
      if (res.ok) {
        alert(`Заявку прийнято. Номер заявки: ${order ? order.id : 'N/A'}`);
        if (isQuick) setForm({ ...form, email: '', house: '', flat: '' });
      } else {
        // fallback
        mailFallback(order);
      }
    }).catch(() => {
      mailFallback(order);
    });
  };

  return (
    <section className="input-section">
      <h1 className="input-title">
        <span className="input-title-line"></span> Подати заявку
      </h1>
      <div className="input-wrapper">
        <form className="input-form" onSubmit={handleSubmit}>
          <select
            name="tariff"
            value={form.tariff}
            onChange={handleChange}
            className="input-select styled-select"
            required
          >
            <option value="GPON 100">GPON 100</option>
            <option value="GPON 1000">GPON 1000</option>
          </select>
          <hr className="input-hr" />
          <select
            name="iptv"
            value={form.iptv}
            onChange={handleChange}
            className="input-select styled-select"
            required
          >
            {iptvTariffs.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <hr className="input-hr" />
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            value={form.name}
            onChange={handleChange}
            className="input-field styled-input"
            required
          />
          <hr className="input-hr" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input-field styled-input"
            required
          />
          <hr className="input-hr" />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9+\-\s()]/g, "");
              setForm({ ...form, phone: val });
            }}
            className="input-field styled-input"
            required
          />
          <hr className="input-hr" />
          <select
            name="street"
            value={form.street}
            onChange={handleChange}
            className="input-select styled-select"
            required
          >
            <option value="">Вулиця</option>
            {streets.map((street) => (
              <option key={street} value={street}>{`вул. ${street}`}</option>
            ))}
          </select>
          <hr className="input-hr" />
          <div className="input-row">
            <input
              type="text"
              name="house"
              placeholder="№ буд."
              value={form.house}
              onChange={handleChange}
              className="input-field input-half styled-input"
              required
            />
            <input
              type="text"
              name="flat"
              placeholder="№ кв."
              value={form.flat}
              onChange={handleChange}
              className="input-field input-half styled-input"
              required
            />
          </div>
          <button type="submit" className="input-btn">
            Підключити
          </button>
        </form>
        <div className="input-img" />
      </div>
    </section>
  );
};
