import "./Header.css";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { menuList } from "./constants.js";


export const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <span href="#">GPON</span>
        </div>
        <div className="contact-info">
          <div className="phone">
            <strong>044 22 77 888</strong>
          </div>
          <button className="callback-btn">Замовити виклик</button>
        </div>
      </div>
      <nav className="main-nav">
        <ul className="nav-list">
          {menuList.map((menuItem) => (
            <li key={menuItem.link}>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={menuItem.link}
              >
                {menuItem.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href="https://stat.netmaster.kiev.ua/cgi-bin/stat.pl"
          target="_blank"
          className="personal-cabinet"
        >
          <span className="icon"></span> Особистий кабінет
        </a>
      </nav>
    </header>
  );
};
