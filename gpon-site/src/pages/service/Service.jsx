import React from "react";
import "./Service.css";

const servicesData = [
  {
    name: "Авансовий платіж",
    price: "Згідно тарифу",
    description: "Внесення кошти на особистий рахунок в якості депозиту згідно тарифу.",
  },
  {
    name: "Виклик спеціаліста",
    price: "200 грн",
    description: "Діагностика та виявлення причини.",
  },
  {
    name: "Термінове підключення",
    price: "1000 грн*",
    description: "Доплата за термінове підключення (до 3 діб). *Для юридичних осіб, обговорюється окремо",
  },
  {
    name: "Зовнішня IP-адреса",
    price: "30 грн",
    description: "Надання білої статичної IP-адреси для домашніх користувачів",
  },
  {
    name: "Налаштування роутера",
    price: "200 грн",
    description: "Виклик спеціаліста для налаштування роутера",
  },
  {
    name: "Пробивання отворів",
    price: "30 грн",
    description: "Буріння отворів в цегляній або бетонній стіні",
  },
  {
    name: "Монтаж короба",
    price: "30 грн/м",
    description: "Монтаж короба",
  },
];

export const Service = () => {
  return (
    <section className="service-section">
      <h1 className="service-title">
        <span className="service-title-line"></span>
        Додаткові послуги
      </h1>
      <table className="service-table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Ціна</th>
            <th>Опис</th>
          </tr>
        </thead>
        <tbody>
          {servicesData.map((service, idx) => (
            <tr key={idx}>
              <td className="service-name">{service.name}</td>
              <td className="service-price">{service.price}</td>
              <td className="service-description">{service.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
