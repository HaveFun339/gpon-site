import React, { useState, useEffect } from "react";
import "./Input.css";
import { sendtoTelegram } from "../../api/send-order.js";
import { useLocation } from 'react-router-dom';

const EmailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log only the EmailForm inputs
    console.log("EmailForm data:", { name, email, message });
  };

  return (
    <form
      className="email-form"
      onSubmit={handleSubmit}
      style={{ marginBottom: 16 }}
    >
      <input
        name="name"
        placeholder="Ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field styled-input"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field styled-input"
      />
      <textarea
        name="message"
        placeholder="Повідомлення"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input-field styled-input"
        rows={3}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}></div>
    </form>
  );
};

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

export const Input = ({ value }) => {
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
  const location = useLocation();

  // On mount, read query params (from map popup) and prefill form
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromPopup = params.get('fromPopup');
    if (fromPopup) {
      const name = params.get('name') || '';
      const phone = params.get('phone') || '';
      const street = params.get('street') || '';
      setForm(f => ({ ...f, name, phone, street }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sanitizePhone = (value) => {
    if (!value) return "";
    // remove all characters except digits and +
    let v = value.replace(/[^0-9+]/g, "");
    // remove any + that is not at the start
    v = v.replace(/\+(?=.+\+)/g, "");
    v = v.replace(/(?!^)\+/g, "");
    // ensure only one leading +
    if (v.indexOf('+') > 0) v = v.replace(/\+/g, '');
    return v;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const saveLocal = () => {
      try {
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
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
        localStorage.setItem("orders", JSON.stringify(orders));
        return order;
      } catch (err) {
        return null;
      }
    };

    const order = saveLocal();
    // log for debugging
    console.log("Form submitted", form, "order", order);

    // Send to Telegram
    const telegramText = `<b>Нова заявка:</b>\n👤 <b>Ім'я:</b> ${form.name}\n📧 <b>Email:</b> ${form.email}\n☎️ <b>Телефон:</b> ${form.phone}\n🏠 <b>Адреса:</b> вул. ${form.street}, будинок ${form.house}, квартира ${form.flat}\n📱 <b>GPON тариф:</b> ${form.tariff}\n📺 <b>IPTV тариф:</b> ${form.iptv || "Не обрано"}`;
    sendtoTelegram(telegramText);
    setForm({
      tariff: "GPON 100",
      iptv: "",
      name: "",
      email: "",
      phone: "",
      street: "",
      house: "",
      flat: "",
    });
    setIsQuick(false);
  };

  // Component render
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
            id="fromName"
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
            id="email"
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
            id="phone"
            name="phone"
            placeholder={value}
            value={form.phone}
            inputMode="tel"
            pattern="\+?[0-9]*"
            onChange={(e) => {
              const val = sanitizePhone(e.target.value);
              setForm({ ...form, phone: val });
            }}
            className="input-field styled-input"
            required
          />
          <hr className="input-hr" />
          <select
            id="street"
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
              id="house"
              name="house"
              placeholder="№ буд."
              value={form.house}
              onChange={handleChange}
              className="input-field input-half styled-input"
              required
            />
            <input
              type="text"
              id="flat"
              name="flat"
              placeholder="№ кв."
              value={form.flat}
              onChange={handleChange}
              className="input-field input-half styled-input"
              required
            />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button type="submit" className="input-btn">
              Відправити
            </button>
          </div>
        </form>
        <div className="input-img" />
      </div>
    </section>
  );
};
