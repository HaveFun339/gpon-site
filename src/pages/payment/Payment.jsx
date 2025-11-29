import React from "react";
import "./Payment.css";

export const Payment = () => {
  const paymentLinks = {
    easypayOnline: "https://easypay.ua/ua/catalog/internet/netmaster",
    monobankOnline: "https://monobank.ua",
    privatbankOnline: "https://next.privat24.ua/payments/form/%7B%22token%22:%2216becff6731d0877ca6919d918e751fa0lbs8o7a%22%7D?lang",
    easypayTerminal: "https://easypay.ua",
    ibox: "https://ibox.ua",
    privatbankTerminal: "https://privatbank.ua/map",
  };

  const handlePaymentClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <section className="payment-section">
      <h1 className="payment-title">
        <span className="payment-title-line"></span>
        Способи оплати
      </h1>

      {/* Онлайн оплата */}
      <div className="payment-category">
        <h2 className="payment-subtitle">ОПЛАТА ОНЛАЙН</h2>
        <div className="payment-methods">
          <button 
            className="payment-card" 
            onClick={() => handlePaymentClick(paymentLinks.easypayOnline)}
            title="Перейти на сайт EasyPay"
          >
            <img src="/easypay.png" alt="EasyPay" />
          </button>
          <button 
            className="payment-card" 
            onClick={() => handlePaymentClick(paymentLinks.monobankOnline)}
            title="Перейти на сайт Monobank"
          >
            <img src="/monobank.png" alt="Monobank" />
          </button>
          <button 
            className="payment-card" 
            onClick={() => handlePaymentClick(paymentLinks.privatbankOnline)}
            title="Перейти на сайт ПриватБанк"
          >
            <img src="/privat.png" alt="ПриватБанк" />
          </button>
        </div>
      </div>

      {/* Оплата в терміналах */}
      <div className="payment-category">
        <h2 className="payment-subtitle">ОПЛАТА В ТЕРМІНАЛАХ</h2>
        <div className="payment-methods">
          <button 
            className="payment-card" 
            onClick={() => handlePaymentClick(paymentLinks.easypayTerminal)}
            title="Перейти на сайт EasyPay"
          >
            <img src="/easypay.png" alt="EasyPay" />
          </button>
          <button 
            className="payment-card" 
            onClick={() => handlePaymentClick(paymentLinks.ibox)}
            title="Перейти на сайт IBOX"
          >
            <img src="/ibox.png" alt="IBOX" />
          </button>
          <button 
            className="payment-card" 
            onClick={() => handlePaymentClick(paymentLinks.privatbankTerminal)}
            title="Перейти на сайт ПриватБанк"
          >
            <img src="/privat.png" alt="ПриватБанк" />
          </button>
        </div>
      </div>

      {/* Оплата в банку */}
      <div className="payment-category">
        <h2 className="payment-subtitle">ОПЛАТА В БАНКУ</h2>
        <div className="payment-details">
          <p>
            Поповнення рахунку через відділення банку або онлайн.<br />
            При оплаті необхідно вказати ПІБ, номер договору та адресу платника.
          </p>
          <div className="payment-requisites">
            <p><strong>Реквізити для оплати:</strong></p>
            <p>Отримувач: ТОВ "Джимон"</p>
            <p>ЄДРПОУ: 44933178</p>
            <p>IBAN: UA283052990000026000201622627</p>
            <p>Банк: АТ КБ "ПРИВАТБАНК"</p>
          </div>
        </div>
      </div>
    </section>
  );
};

