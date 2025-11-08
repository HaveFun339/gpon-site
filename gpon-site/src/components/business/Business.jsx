
import React from "react";
import "./Business.css";

export const Business = () => {

    
    return (
        <section className="business-section">
            <h1 className="business-title">
                <span className="business-title-line"></span>
                Тарифи для юридичних осіб
            </h1>
            <table className="business-table">
                <thead>
                    <tr>
                        <th>Тариф</th>
                        <th>Ціна</th>
                        <th>Швидкість Україна</th>
                        <th>Швидкість світ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Biz 600</td>
                        <td>600 грн/міс</td>
                        <td>100 Мбіт/с</td>
                        <td>20 Мбіт/с</td>
                    </tr>
                    <tr>
                        <td>Biz 850</td>
                        <td>850 грн/міс</td>
                        <td>100 Мбіт/с</td>
                        <td>30 Мбіт/с</td>
                    </tr>
                    <tr>
                        <td>Biz 1200</td>
                        <td>1200 грн/міс</td>
                        <td>100 Мбіт/с</td>
                        <td>50 Мбіт/с</td>
                    </tr>
                    <tr>
                        <td>Biz 2200</td>
                        <td>2200 грн/міс</td>
                        <td>100 Мбіт/с</td>
                        <td>100 Мбіт/с</td>
                    </tr>
                </tbody>
            </table>
            <div className="business-note">
                *Ціни вказані з ПДВ
            </div>

        </section>
    );
};