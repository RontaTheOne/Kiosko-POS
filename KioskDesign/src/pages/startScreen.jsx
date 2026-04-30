import React from "react";
import { Link } from "react-router-dom";

function StartScreen() {
  return (
    <div className="container">
        <div className="align-items-center justify-content-center d-flex flex-column">
        <br />
        <h1>Bienvenido a Kiosk App</h1>
        <p className="lead mb-4">
          Haz tu pedido en segundos. Elige tú comida, personaliza y paga.
        </p>
        <Link to="/OrderType" className="btn btn-outline-primary">
          Empezar
        </Link>

        <small className="d-block mt-4 text-secondary">
          <i class="bi bi-hand-index-thumb-fill"></i> Presiona “Empezar” para
          continuar
        </small>
        </div>
    </div>
  );
}
export default StartScreen;