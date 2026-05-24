import React from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import "../assets/style/orderType.css";

function OrderType() {
  const { setTipoOrden } = useCart();
  const navigate = useNavigate();

  const handleOrderType = (type) => {
    setTipoOrden(type);
    navigate("/Home");
  };

  return (
    <div
      className="order-type-screen"
      style={{ backgroundColor: "#fafafa ", minHeight: "100vh" }}
    >
      <div className="container-fluid py-2 text-center">
        <br />
        <h1>¿Cómo quieres ordenar?</h1>
        <p className="lead mb-4">Elige tu tipo de orden para continuar.</p>
        <div className="row justify-content-center g-4">       
          {/* COMER AQUI */}
          <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center">
            <div className="order-card order-card--eat" onClick={() => handleOrderType("comer_aqui")}>
              <div className="order-card__icon">
                <i className="bi bi-fork-knife"></i>
              </div>

              <div className="order-card__line"></div>

              <h2 className="order-card__title">Comer aquí</h2>

              <p className="order-card__description">
                Relájate y disfruta del ambiente de la mejor comida de la ciudad.
              </p>
            </div>
          </div>

          {/* PARA LLEVAR */}
          <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center">
            <div className="order-card " onClick={() => handleOrderType("llevar")}>
              <div className="order-card__icon">
                <i className="bi bi-bag-fill"></i>
              </div>

              <div className="order-card__line"></div>

              <h2 className="order-card__title">Para llevar</h2>

              <p className="order-card__description">
                Delicias gourmet para llevar la experiencia a tu hogar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderType;
