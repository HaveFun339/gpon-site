import React from 'react'
import './Devices.css'

const devicesSample = [
  {
    id: 1,
    name: 'Абонентський термінал EPON/GPON',
    img: '/images/dev1.webp',
    lines: [
      '1 грн входить у вартість стандартного підключення.',
      '500 грн — стандартна вартість',
    ],
    specs: [
      'Інтерфейс: 1 х SC/UPC EPON, 1x10/100/1000Base-T',
      'Живлення, В: 12',
    ],
  },
  {
    id: 2,
    name: 'Абонентський термінал ONU POE XPON',
    img: '/images/dev2.webp',
    lines: [
      '200 грн при стандартному підключенні.',
      '750 грн — стандартна вартість',
    ],
    specs: [
      'Підтримка швидкості вихідного каналу: 2,448 Гбіт/с',
      'Підтримка швидкості висхідного каналу: 1,244 Гбіт/с',
      'Живлення, В: 220',
    ],
  },
]

export default function Devices() {
  return (
    <section className="devices-section">
      <div className="devices-inner">
        <h1 className="devices-title">Пристрої</h1>

        <div className="devices-grid">
          {devicesSample.map((d) => (
            <article key={d.id} className={`device-card`}> 
              <div className="device-img-wrap">
                <img src={d.img} alt={d.name} className="device-img" />
              </div>
              <div className="device-body">
                <h3 className="device-name">{d.name}</h3>
                {d.lines && d.lines.map((ln, i) => (
                  <p key={i} className="device-desc">{ln}</p>
                ))}
                {d.specs && (
                  <div className="device-specs">
                    <ul>
                      {d.specs.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
