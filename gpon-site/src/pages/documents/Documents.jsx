import React from "react";
import "./Documents.css";

const documentsData = [
  {
    id: 1,
    title: "Публічний договір ТОВ \"Джипон\"",
    link: "https://gpon.com.ua/document/%D0%9F%D1%83%D0%B1%D0%BB%D1%96%D1%87%D0%BD%D0%B8%D0%B9_%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D1%96%D1%80.pdf",
  },
  {
    id: 2,
    title: "Публічний договір ТОВ \"СІНЕТ ІСП\"",
    link: "https://gpon.com.ua/document/%D0%9F%D1%83%D0%B1%D0%BB%D1%96%D1%87%D0%BD%D0%B8%D0%B9_%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D1%96%D1%80_%D0%A2%D0%9E%D0%92_%D0%A1%D0%86%D0%9D%D0%95%D0%A2_%D0%86%D0%A1%D0%9F.pdf",
  },
];

export const Documents = () => {
  return (
    <section className="documents-section">
      <h1 className="documents-title">
        <span className="documents-title-line"></span>
        Документи
      </h1>
      <div className="documents-list">
        {documentsData.map((doc) => (
          <a
            key={doc.id}
            href={doc.link}
            target="_blank"
            rel="noopener noreferrer"
            className="document-item"
            title={`Відкрити ${doc.title}`}
          >
            <span className="document-text">{doc.title}</span>
            <span className="document-icon">📄</span>
          </a>
        ))}
      </div>
    </section>
  );
};
