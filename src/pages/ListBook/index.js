import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import "./styles.css";

import api from "../../services/api";

export default function ListBook() {
  const [books, setBooks] = useState([]);
  async function handleDelete(book) {
    try {
      await api.delete(`/books/${book._id}`);

      setBooks(books.filter((currentBook) => currentBook._id !== book._id));
    } catch (err) {
      alert("Erro ao deletar, tente novamente");
    }
  }

  useEffect(() => {
    api.get("/books").then((response) => {
      setBooks(response.data);
    });
  });

  return (
    <div className="container">
      <header>
        <h1>Gerenciador de Livros</h1>

        <Link className="button" to="/create">
          Cadastrar novo jogo
        </Link>
      </header>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <img src={book.photo} alt="bookPhoto" />
            <strong>{book.title}</strong>
            <div>
              <Link to={`/details/${book._id}`}>
                <FiPlusCircle size={50} color="#3F88C5" />
              </Link>
              <button
                onClick={() => {
                  handleDelete(book);
                }}
              >
                <FiTrash2 size={50} color="#D72638" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
