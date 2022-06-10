/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import api from "../services/api";

const AppContext = React.createContext();

export function AppProvider({ children }) {
  const [books, setBooks] = useState([]);

  const [logado, setLogado] = useState(false);
  const [role, setRole] = useState(null);
  const [usuario, setUsuario] = useState({});

  async function login(form) {
    try {
      let dados = await api.post("/session", form);
      let token = dados.data.token;
      setRole(dados.data.role);
      setUsuario(dados.data.user);
      setLogado(true);

      sessionStorage.setItem("TOKEN", token);
      sessionStorage.setItem("ROLE", role);
      sessionStorage.setItem("USUARIO", JSON.stringify(dados.data.user));
    } catch (erro) {
      let dados = erro.response.data;
      logout();
      throw dados.erro;
    }
  }

  const logout = () => {
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("ROLE");
    sessionStorage.removeItem("USUARIO");
    setLogado(false);
    setRole(null);
    setUsuario(null);
  };

  return (
    <AppContext.Provider
      value={{
        produtosService: {
          books,
          setBooks,
        },
        sessaoService: { login, logout, logado, role, usuario },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
