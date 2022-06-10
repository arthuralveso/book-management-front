import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import { Link, useHistory, useParams } from "react-router-dom";
import api from "../../services/api";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [photo, setPhoto] = useState("");

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      api.get(`/books/${id}`).then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setGenre(response.data.genre);
        setPhoto(response.data.photo);
      });
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title,
      author,
      genre,
      photo,
    };

    if (id === undefined) {
      await api.post("books", data);
      history.push("/books");
    } else {
      await api.put(`books/${id}`, data);
      history.push("/books");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <p>Cadastre um novo livro ou edite um já existente</p>
          <Link to="/books" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Titulo do Livro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            placeholder="Genero"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Link da foto"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
