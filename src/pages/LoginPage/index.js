import React, { useContext, useState } from "react";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/General/Spinner";
import UserContext from "../../context/UserContext";
const LoginPage = (props) => {
  const ctx = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const changeEmail = (e) => {
    const newEmail = e.target.value;
    setForm((formBefore) => ({
      email: newEmail,
      password: formBefore.password,
    }));
  };
  const changePassword = (e) => {
    const newPassword = e.target.value;
    setForm((formBefore) => ({
      email: formBefore.email,
      password: newPassword,
    }));
  };
  const login = () => {
    ctx.loginUser(form.email, form.password);
  };

  return (
    <div className={css.LoginPage}>
      {ctx.state.userId && <Redirect to="/orders" />}
      <input
        onChange={changeEmail}
        name="email"
        type="text"
        placeholder="Имайл хаяг"
      />
      <input
        onChange={changePassword}
        name="password"
        type="password"
        placeholder="Нууц үг"
      />
      {ctx.state.logginIn && <Spinner />}
      {ctx.error && <p>{ctx.error}</p>}
      {ctx.state.error && (
        <div style={{ color: "red" }}>
          {ctx.state.errorCode === 400 && "Нууц үг буруу байна!!!"}
        </div>
      )}
      <Button text="Логин" ButtonType="Success" daragdsan={login} />
    </div>
  );
};

export default LoginPage;
