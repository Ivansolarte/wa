import React from "react";
import { ButtonClassic } from "../../elements/button/buttonClassic";
import { InputClassic } from "../../elements/input/inputClassic";
import { HandleChange } from "../../utils/handleChange";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();//variables globales con Zustam
  const { form, handleChangeText } = HandleChange({ email: "", password: "" });
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
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Iniciar session
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Correo electrónico
            </label>
            <div className="mt-2">
              <InputClassic
                name={"email"}
                value={form.email}
                onChange={handleChangeText}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Contraseña
            </label>
            <div className="mt-2">
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
