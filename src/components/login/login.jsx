import React from "react";
import { ButtonClassic } from "../../elements/button/buttonClassic";
import { InputClassic } from "../../elements/input/inputClassic";
import { HandleChange } from "../../utils/handleChange";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();//variables globales con Zustam
  const { form, handleChangeText } = HandleChange({ email: "admin", password: "123" });
  const onsubmit = () => {
    if (form.email == "admin" && form.password == "123") {
      sessionStorage.setItem(
        "token",
        "sd45s4d54sad4s54sa5s4d5as454d4asdwefds54g5f4h"
      );
      login();
      navigate("/");
      return
    }
    alert("Credenciales incorrectas")
  };
  return (
    <div className="login-wrapper">
  <div className="login-container">
    <h2 className="login-title">Iniciar sesión</h2>
  </div>
  <div className="login-form">
    <div className="login-space">
      <div>
        <label className="login-label">Correo electrónico</label>
        <div className="login-input-wrapper">
          <InputClassic
            name={"email"}
            value={form.email}
            onChange={handleChangeText}
          />
        </div>
      </div>
      <div>
        <label className="login-label">Contraseña</label>
        <div className="login-input-wrapper">
          <InputClassic
            name={"password"}
            value={form.password}
            onChange={handleChangeText}
          />
        </div>
      </div>
      <div>
        <ButtonClassic title={"Enviar"} onClick={onsubmit} />
      </div>
    </div>
  </div>
</div>

  );
};
