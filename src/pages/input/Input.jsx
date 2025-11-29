import React, { useState } from "react";
import "./Input.css";


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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "email",
      "phone",
      "street",
      "house",
      "flat",
    ];
    for (const field of requiredFields) {
      if (!form[field].trim()) {
        alert("Будь ласка, заповніть всі поля коректно!");
        return;
      }
    }
    alert("Заявка відправлена!");
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
