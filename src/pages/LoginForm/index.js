import React, { useContext, useState } from "react";
import "./styles.css";

import AppContext from "../../Context/AppContext";
import { useHistory } from "react-router-dom";

const emptyForm = () => {
  return { email: "", password: "" };
};

export default function LoginForm() {
  const history = useHistory();
  const { sessaoService } = useContext(AppContext);
  const [form, setForm] = useState(emptyForm());

  const setValor = (evento) => {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  };

  async function login(evt) {
    evt.preventDefault();
    try {
      sessaoService.login(form);

      setForm(emptyForm());
      history.push("/books");
    } catch (erro) {
      alert(erro);
    }
  }

  return (
    <div className="wrapper">
      <form onSubmit={(e) => login(e)} className="formulario">
        <label>Email:</label>{" "}
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={setValor}
        />
        <label>Senha:</label>{" "}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={setValor}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
