import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import GoogleLogin from "react-google-login";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  responseGoogle = response => {
    try {
      const data = { ...this.state.data };
      data.name = response.w3.ig;
      data.username = response.w3.U3;
      data.password = response.w3.Eea;
      this.setState({ data });
      this.doSubmit();
    } catch (ex) {
      console.log(ex);
    }
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
        <div style={{ paddingTop: 20 }}>
          <GoogleLogin
            clientId="1039984301719-6aaiv6258glfiofndpec07dhr5afvei8.apps.googleusercontent.com"
            buttonText="Register with Gmail"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    );
  }
}

export default RegisterForm;
