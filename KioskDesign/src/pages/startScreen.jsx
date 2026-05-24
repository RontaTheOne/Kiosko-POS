import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/img/backgroundStart.png";
import food1 from "../assets/img/food1.png";
import food2 from "../assets/img/food2.png";
import "../assets/style/startScreen.css";

function StartScreen() {
  const foods = [food1, food2];
  const [currentFood, setCurrentFood] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFood((prev) => (prev + 1) % foods.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [foods.length]);

  return (
    <div
      className="start-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="food-slider">
        {foods.map((food, index) => (
          <img
            key={index}
            src={food}
            alt="Food"
            className={`food-image ${
              index === currentFood ? "active" : ""
            }`}
          />
        ))}
      </div>
      <div className="start-content">

        <div className="d-grid gap-2">
          <Link to="/Tipo_Orden" className="btn btn-danger">
            Empezar
          </Link>
        </div>

        <small className="small-start-screen mt-2">
          <i className="bi bi-hand-index-thumb-fill"></i> Presiona “Empezar”
          para iniciar el pedido
        </small>
      </div>
    </div>
  );
}
export default StartScreen;
