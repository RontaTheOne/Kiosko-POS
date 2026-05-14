import React, {useEffect,useState} from "react";
import {useNavigate,useLocation} from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  // orden
  const [order] = useState(() => {

    if (
      location.state &&
      location.state.order
    ) {

      return location.state.order;
    }

    const stored =
      sessionStorage.getItem("order");

    return stored
      ? JSON.parse(stored)
      : null;
  });

  // métodos
  const [methods, setMethods] =
    useState([]);

  // guardar orden
  useEffect(() => {

    if (order) {

      sessionStorage.setItem(
        "order",
        JSON.stringify(order)
      );
    }

  }, [order]);

  // métodos de pago
  useEffect(() => {

    fetch(
      "http://localhost:3000/metodo-pago"
    )
      .then(res => res.json())
      .then(data => setMethods(data))
      .catch(error =>
        console.error(error)
      );

  }, []);

  // 💳 crear pago
  const handlePayment =
    async (method) => {

      if (!order) return;

      try {

        const res = await fetch(
          `http://localhost:3000/pago/${order.id_orden}`,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              id_metodo_pago:
                method.id_metodo_pago,

              monto:
                order.total

            })
          }
        );

        const data =
          await res.json();

        console.log(data);

        // efectivo
        if (
          data.nombre === "efectivo"
        ) {

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

  // sin orden
  if (!order) {

    return (

      <div className="container text-center mt-5">

        <div
          className="spinner-border text-danger"
          role="status"
        />

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
            Order Summary
          </h3>

          <div className="d-flex justify-content-between mb-2">

            <span>Orden</span>

            <strong>
              #{order.id_orden}
            </strong>

          </div>

          <div className="d-flex justify-content-between mb-2">

            <span>Estado</span>

            <span className="badge text-bg-warning">

              {order.estado}

            </span>

          </div>

          <hr />

          <div className="d-flex justify-content-between mb-3">

            <span>Total Amount:</span>

            <strong>
              {order.total} COP
            </strong>

          </div>

          {/* métodos */}
          <div className="text-center">

            <h5 className="mb-3">
              Select Payment Method
            </h5>

            <div className="d-flex gap-2 justify-content-center">

              {methods.map(method => (

                <button
                  key={
                    method.id_metodo_pago
                  }

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