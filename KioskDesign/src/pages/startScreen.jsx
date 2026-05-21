import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../public/img/backgroundStart.jpeg";
import "../css/startScreen.css";

function StartScreen() {
  return (
    <div
      className="start-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="start-content">

        <div className="d-grid gap-2">
          <Link to="/Tipo_Orden" className="btn btn-danger">
            Empezar
          </Link>
        </div>

        <small className="small mt-2">
          <i className="bi bi-hand-index-thumb-fill"></i> Presiona “Empezar”
          para iniciar el pedido
        </small>
      </div>
    </div>
  );
}
export default StartScreen;
