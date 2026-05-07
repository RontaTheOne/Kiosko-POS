import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout() {

  const navigate = useNavigate();
  const location = useLocation();

  // ORDEN DESDE NAVEGACIÓN O SESSION STORAGE
  const [order] = useState(() => {
    if (location.state && location.state.order) {
      return location.state.order;
    }
    const stored = sessionStorage.getItem("order");
    return stored ? JSON.parse(stored) : null;
  });

  // 🔥 MÉTODOS DE PAGO
  const [methods, setMethods] = useState([]);

  // 🔥 GUARDAR ORDEN EN SESSION
  useEffect(() => {

    if (order) {

      sessionStorage.setItem(
        "order",
        JSON.stringify(order)
      );
    }

  }, [order]);

  // 🔥 TRAER MÉTODOS DE PAGO
  useEffect(() => {

    fetch("http://localhost:3000/metodo-pago")
      .then(res => res.json())
      .then(data => setMethods(data))
      .catch(error => console.error(error));

  }, []);

  // 💳 CREAR PAGO
  const handlePayment = async (method) => {

    // protección
    if (!order) return;

    try {

      const res = await fetch(
        `http://localhost:3000/pago/${order.id_orden}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            id_metodo_pago:
              method.id_metodo_pago,

            monto:
              order.total

          })
        }
      );

      const data = await res.json();

      console.log(data);

      // 💵 EFECTIVO
      if (data.nombre === "efectivo") {

        navigate(
          `/pago/efectivo/${data.pago.id_pago}`
        );
      }

    } catch (error) {

      console.error(
        "Error procesando pago:",
        error
      );
    }
  };

  // SIN ORDEN
  if (!order) {

    return (
      <div className="container text-center mt-5">

        <div
          className="spinner-border text-danger"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <h5 className="mt-3">
          No hay orden activa
        </h5>

      </div>
    );
  }

  return (

    <div className="container">

      <br />
      <br />

      <div className="card shadow">

        <div className="card-body">
          <h3 className="text-center mb-4">
            Resumen de tu orden
          </h3>

          {/* 🆔 ORDEN */}
          <div className="d-flex justify-content-between mb-2">

            <span>
              Orden
            </span>

            <strong>
              #{order.id_orden}
            </strong>

          </div>

          {/* 📦 ESTADO */}
          <div className="d-flex justify-content-between mb-2">

            <span>
              Estado
            </span>

            <span className="badge text-bg-warning">

              {order.estado || "pendiente"}

            </span>

          </div>

          <hr />

          {/* 💰 TOTAL */}
          <div className="d-flex justify-content-between mb-3">

            <span>
              Total a pagar:
            </span>

            <strong>
             {Number(order.total).toLocaleString("es-CO")} COP
            </strong>

          </div>

          {/* 💳 MÉTODOS */}
          <div className="text-center">

            <h5 className="mb-3">
              Select Payment Method
            </h5>

            <div className="d-flex gap-2 justify-content-center">

              {methods.map(method => (

                <button
                  key={method.id_metodo_pago}
                  className="btn btn-primary"
                  onClick={() =>
                    handlePayment(method)
                  }
                >
                  {method.nombre}
                </button>

              ))}

            </div>
          </div>

          {/* 🔙 REGRESAR */}
          <button
            className="btn btn-secondary w-100 mt-4"
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>

        </div>
      </div>
    </div>
  );
}

export default Checkout;