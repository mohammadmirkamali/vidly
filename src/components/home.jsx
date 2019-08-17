import React, { Component } from "react";
import logo1 from "./img/logo1.png";
import "../sass/main.scss";

class Home extends Component {
  state = {};
  render() {
    return (
      <header className="header">
        <div className="header__logo-box">
          <img src={logo1} alt="logo" className="header__logo" />
        </div>

        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">VidlyApp</span>
            <span className="heading-primary--sub">create by mohammad!</span>
          </h1>

          <a href="#" className="btn1 btn1--white btn1--animated">
            See My App
          </a>
        </div>
      </header>
    );
  }
}

export default Home;
