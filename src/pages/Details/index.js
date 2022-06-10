import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function Details() {
  const [detail, setDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    api.get(`/books/${id}`).then((response) => {
      console.log(response.data);
      setDetail(response.data);
    });
  }, [id]);

  return (
    <div className="detail-container">
      <header>
        <Link className="arrow" to="/books">
          <FiArrowLeftCircle size={50} color="#3F88C5" />
        </Link>
        <Link className="button" to={`/details/edit/${id}`}>
          Editar livro
        </Link>
      </header>
      <div className="content">
        <section className="image">
          <img src={detail.photo} alt="" />
        </section>
        <section className="information">
          <strong>Nome:</strong>
          <p>{detail.title}</p>

          <strong>Autor:</strong>
          <p>{detail.author}</p>

          <strong>Genero:</strong>
          <p>{detail.genre}</p>
        </section>
      </div>
    </div>
  );
}
