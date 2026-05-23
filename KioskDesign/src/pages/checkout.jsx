import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalPaymentCard from "../components/payment/modalPaymentCard";
import { downloadInvoice } from "../utils/downloadInvoice";
import "../assets/style/checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const location = useLocation();

  // orden
  const [order] = useState(() => {
    if (location.state && location.state.order) {
      return location.state.order;
    }

    const stored = sessionStorage.getItem("order");

    return stored ? JSON.parse(stored) : null;
  });

  // métodos
  const [methods, setMethods] = useState([]);

  const totalProducts =
    order?.productCount ||
    order?.totalProductos ||
    order?.detalles?.reduce(
      (sum, item) => sum + (Number(item.cantidad) || 0),
      0,
    ) ||
    0;

  // loading tarjeta
  const [processingCard, setProcessingCard] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // guardar orden
  useEffect(() => {
    if (order) {
      sessionStorage.setItem("order", JSON.stringify(order));
    }
  }, [order]);

  // métodos de pago
  useEffect(() => {
    fetch("http://localhost:3000/metodo-pago")
      .then((res) => res.json())
      .then((data) => setMethods(data))
      .catch((error) => console.error(error));
  }, []);

  // delay
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  // crear pago
  const handlePayment = async (method) => {
    if (!order) return;

    try {
      // crear pago
      const res = await fetch(`http://localhost:3000/pago/${order.id_orden}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id_metodo_pago: method.id_metodo_pago,

          monto: order.total,
        }),
      });

      const data = await res.json();

      console.log(data);

      // efectivo
      if (data.nombre === "efectivo") {
        navigate(`/pago/efectivo/${data.pago.id_pago}`);
      }

      // tarjeta
      if (data.nombre === "tarjeta") {
        setProcessingCard(true);
        setPaymentStatus(null);

        // simulación datafono
        await delay(2500);

        const paymentRes = await fetch(
          `http://localhost:3000/pago/tarjeta/${data.pago.id_pago}`,
          {
            method: "PUT",
          },
        );

        const paymentData = await paymentRes.json();

        console.log(paymentData);

        setProcessingCard(false);

        if (paymentData.success) {
          setPaymentStatus({
            success: true,
            title: "Pago aprobado por el banco",
            description: "Su pago ha sido autorizado exitosamente.",
          });

          await downloadInvoice(order.id_orden);
        } else {
          setPaymentStatus({
            success: false,
            title: "Pago rechazado",
            description:
              "El banco no pudo autorizar el pago. Intente con otra tarjeta o método.",
          });
        }
      }
    } catch (error) {
      console.error("Error procesando pago:", error);
    }
  };

  // sin orden
  if (!order) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-danger" role="status" />

        <h5 className="mt-3">No hay orden activa</h5>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-3 p-md-4">
          {/* Título */}
          <h3 className="text-center fw-bold mb-4">Resumen de la Orden</h3>

          {/* Información */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary">Orden</span>

            <strong>#{order.id_orden}</strong>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary">Estado</span>

            <span className="badge bg-danger px-3 py-2 rounded-pill">
              {order.estado}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary">Productos</span>

            <strong>{totalProducts}</strong>
          </div>

          <hr />

          {/* Total */}
          <div className="bg-light rounded-4 p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Monto Total</span>

              <strong className="fs-3 text-danger">{order.total} COP</strong>
            </div>
          </div>

          {/* Métodos */}
          <div className="text-center">
            <h5 className="fw-semibold mb-4">Seleccionar Método de Pago</h5>

            <div className="row g-3 justify-content-center">
              {methods.map((method) => (
                <div
                  key={method.id_metodo_pago}
                  className="col-6 col-md-4 col-lg-3"
                >
                  <button
                    className="btn 
                      bg-danger
                      text-dark
                      w-100
                      h-100
                      d-flex
                      flex-column
                      justify-content-center
                      align-items-center
                      rounded-4
                      shadow-sm
                      p-3
                      payment-btn
                    "
                    disabled={processingCard}
                    onClick={() => handlePayment(method)}
                  >
                    <i
                      className={`
                        ${
                          method.nombre === "tarjeta"
                            ? "fa-solid fa-credit-card"
                            : method.nombre === "efectivo"
                            ? "fa-solid fa-money-bill-1"
                            : "fa-solid fa-money-bill-1"
                        }
                        payment-icon
                      `}
                    ></i>
                    <span className="fw-semibold text-light">{method.nombre}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Regresar */}
          <div className="mt-4">
            <button
              className="
            btn 
            btn-outline-danger 
            w-100 
            py-3 
            rounded-4
            fw-semibold
          "
              disabled={processingCard}
              onClick={() => navigate(-1)}
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
      {/* modal datafono */}
      {(processingCard || paymentStatus) && (
        <ModalPaymentCard
          processingCard={processingCard}
          paymentStatus={paymentStatus}
          onClose={() => setPaymentStatus(null)}
          onFinish={() => navigate("/")}
        />
      )}
    </div>
  );
}

export default Checkout;
