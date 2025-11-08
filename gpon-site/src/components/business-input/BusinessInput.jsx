
import React, { useState } from "react";
// import from "./input.css";


const bizTariffs = [
    { value: "Biz 600", label: "Biz 600" },
    { value: "Biz 850", label: "Biz 850" },
    { value: "Biz 1200", label: "Biz 1200" },
    { value: "Biz 2200", label: "Biz 2200" }
];

const iptvTariffs = [
    { value: "", label: "Виберіть IPTV тариф" },
    { value: "Базовий", label: "Базовий" },
    { value: "Розширений", label: "Розширений" },
    { value: "Максимальний", label: "Максимальний" }
];

export const BusinessInput = () => {
    const [form, setForm] = useState({
        tariff: bizTariffs[0].value,
        iptv: "",
        name: "",
        email: "",
        phone: "",
        street: "",
        house: "",
        office: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = ["name", "email", "phone", "street", "house", "office"];
        for (const field of requiredFields) {
            if (!form[field].trim()) {
                alert("Будь ласка, заповніть всі поля коректно!");
                return;
            }
        }
        
        console.log("Бізнес-заявка відправлена:", form);
        alert("Бізнес-заявка відправлена!");
    };

    return (

        <section className="input-section"> 
    
             <h1 className="input-title">
                <span className="input-title-line"></span> Подати бізнес-заявку
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
                        {bizTariffs.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
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
                            <option key={t.value} value={t.value} disabled={t.value === ""}>{t.label}</option>
                        ))}
                    </select>
                    
                    <hr className="input-hr" />
                    
         
                    <input type="text" name="name" placeholder="Ім'я" value={form.name} onChange={handleChange} className="input-field styled-input" required />
                    <hr className="input-hr" />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input-field styled-input" required />
                    <hr className="input-hr" />
                    <input type="tel" name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} className="input-field styled-input" required />
                    
                    <hr className="input-hr" />
                
                    <input type="text" name="street" placeholder="Вулиця" value={form.street} onChange={handleChange} className="input-field styled-input" required />
                    <hr className="input-hr" />
                    
             
                    <div className="input-row">
                        <input
                            type="text"
                            name="house"
                            placeholder="№ будинку"
                            value={form.house}
                            onChange={handleChange}
                            className="input-field input-half styled-input"
                            required
                        />
                        <input
                            type="text"
                            name="office"
                            placeholder="№ оф."
                            value={form.office}
                            onChange={handleChange}
                            className="input-field input-half styled-input"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="input-btn">
                        Підключити
                    </button>
                </form>

                <div className="input-img" 
                 
                     /* style={{ 
                        backgroundImage: `url(${process.env.PUBLIC_URL}/path/to/business-image.jpg)`
                     }} */
                />
            </div>
        </section>
    );
};