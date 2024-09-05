import React from "react";
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";


const NotFoundPage = () => {
  return (
    <div>
      <Link className={css.goHome} to="/">Go Home</Link>
      <p className={css.noPage}>Not Found Page</p>
    </div>
  );
};

export default NotFoundPage;
