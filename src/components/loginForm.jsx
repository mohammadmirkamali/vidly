import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import GoogleLogin from "react-google-login";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  responseGoogle = response => {
    const data = { ...this.state.data };
    try {
      data.username = response.w3.U3;
      data.password = response.w3.Eea;
      this.setState({ data });
      this.doSubmit();
    } catch (ex) {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "2rem",
          textAlign: "center",
          width: "30rem",
          minHeight: "25rem",
          borderRadius: "10%",
          borderStyle: "groove",
          padding: "2rem"
        }}
      >
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <div style={{ paddingTop: 20 }}>
          <GoogleLogin
            clientId="1039984301719-6aaiv6258glfiofndpec07dhr5afvei8.apps.googleusercontent.com"
            buttonText="Login with Gmail"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    );
  }
}

export default LoginForm;
