import React, { useState } from "react";
import "./Medium.css";
import ConnectionFormSection from "../../components/connection-form-section/ConnectionFormSection.jsx";
import  Mapa  from "../map/Mapa.jsx";
import { Input } from "../input/Input.jsx";

const TariffCard = ({
  name,
  speed,
  oldPrice,
  currentPrice,
  monthlyPrice,
  monthlyPriceIp,
}) => {
  const [isIp, setIsIp] = useState(false);

  return (

    <div className="medium-card">
      <div className="medium-pad">

        <div className="medium-card-header">
          <span className="medium-card-title">{name}</span>
          <span className="medium-card-discount"></span>
        </div>
        <div className="medium-card-divider" />
        <div className="medium-card-row">
          <span>Швидкість</span>
          <span className="medium-card-accent">{speed}</span>
        </div>
        <div className="medium-card-row">
          <span>Зовнішній IP</span>
          <label className="medium-switch">
            <input
              type="checkbox"
              checked={isIp}
              onChange={() => setIsIp((prev) => !prev)}
            />
            <span className="medium-switch-slider" />
          </label>
        </div>
        <div className="medium-card-row">
          <span>Ціна</span>
          <span>
            <s>{oldPrice}</s>{" "}
            <span className="medium-card-accent">{currentPrice}</span>
          </span>
        </div>
        <div className="medium-card-row">
          <span>Підключення</span>
          <span>
            <s></s> <span className="medium-card-accent">1000 ₴</span>
          </span>
        </div>
        <div className="medium-card-price">
          {isIp ? monthlyPriceIp : monthlyPrice}
        </div>
        <div className="medium-card-desc">
          ONU входить у вартість підключення
        </div>
      </div>
      <button className="medium-card-btn" type="button">
        Підключити
      </button>
 
    </div>
  );
};

export const Medium = () => {
   const [value, setValue] = useState(`Телефон`);
   return (
  <section className="medium-section">
    <div className="medium-bg">
      <h1 className="medium-title">ІНТЕРНЕТ БЕЗ СВІТЛА*</h1>
      <div className="medium-cards">
        <TariffCard
          name="GPON 100"
          speed="100 Мбіт/с"
          oldPrice=""
          currentPrice="300 ₴"
          monthlyPrice="300 грн/міс**"
          monthlyPriceIp="330 грн/міс**"
        />
        <TariffCard
          name="GPON 1000"
          speed="1000 Мбіт/с"
          oldPrice=""
          currentPrice="400 ₴"
          monthlyPrice="400  грн/міс**"
          monthlyPriceIp="430 грн/міс**"
        />
      </div>
      <div className="medium-bottom-line" />
      <div className="medium-conditions">
        <div className="medium-conditions-inner">
          <div className="medium-conditions-text">
            <span style={{ fontSize: "15px" }}>
              *Автономна робота обладнання понад 72 години в період відключення
              електроенергії.
              <br />
              **-50% на три місяці інтернету GPON та підключення
            </span>
            <br />
            <span className="medium-conditions-title">Умови акції:</span>
            <ul>
              <li>
                акція діє тільки для нових абонентів і виключно для домашнього
                інтернету;
              </li>
              <li>
                при підключенні потрібно внести авансовий платіж у розмірі трьох
                акційних місяців;
              </li>
              <li>
                перші три місяці користування послугою тарифікуються -50%,
                наступні місяці за звичайним тарифом;
              </li>
              <li>
                знижка 50 % від вартості підключення з наданням оптичного
                терміналу ONU;
              </li>
              <li>
                акція не поширюється на підключення у квартирі, де вже є діючий
                або призупинений договір з GPON;
              </li>
              <li>
                під час тимчасового припинення користування послугами, дії
                акційної пропозиції не переносяться на наступні місяці;
              </li>
              <li>
                повідомити нас зручним для вас способом про участь в акції
                (зателефонувати на лінію тех підтримки, чи написати у
                месенджерах).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="medium-phone">
      <span className="medium-phone-icon" />
    </div>
    
    <Mapa value={value} />
    {/* <ConnectionFormSection /> */}
    <Input value={value} />
  </section>)
};

export default Medium;
