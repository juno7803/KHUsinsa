import React from "react";
import "./Main.scss";
import khuLogo from "../../assets/icons/khu-logo.png";

function Main() {
  return (
    <>
      <div className="main">
        <img src={khuLogo} />
      </div>
      <h1 className="main__title">
        KHUSINSA : Inventory Management System
      </h1>
    </>
  );
}

export default Main;
