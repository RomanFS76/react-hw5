import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  const navLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={navLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
