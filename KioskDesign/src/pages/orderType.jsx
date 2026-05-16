import React from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

function OrderType() {
  const { setTipoOrden } = useCart(); 
  const navigate = useNavigate();

  const handleOrderType = (type) => {
    setTipoOrden(type);
    navigate("/Home");
  };

  return (
    <div className="container">
      <div className="align-items-center justify-content-center d-flex flex-column">
         <br />
            <h1>¿Cómo quieres ordenar?</h1>
            <p className="lead mb-4">
              Elige tu tipo de orden para continuar.
            </p>     
        <div className="d-flex gap-3">  
          <button className="btn btn-outline-danger" onClick={() => handleOrderType("llevar")}>
            Para llevar
          </button>

          <button className="btn btn-outline-danger" onClick={() => handleOrderType("comer_aqui")}>
            Comer aquí
          </button>
        </div>
         <small className="d-block mt-4 text-secondary">
            <i class="bi bi-hand-index-thumb-fill"></i> Presiona una opción para continuar
          </small>

      </div>
    </div>
  );
}

export default OrderType;