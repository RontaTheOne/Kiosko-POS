import { useCheckout } from "../hooks/useCheckout.js";
import ModalPaymentCard from "../components/payment/modalPaymentCard";
import "../assets/style/checkout.css";

function Checkout() {
  const { 
    order,
    methods,
    totalProducts,
    processingCard,
    paymentStatus, 
    handlePayment, 
    setPaymentStatus,
    navigate
  } = useCheckout();

   if (!order) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-danger" />

        <h5 className="mt-3">
          No hay orden activa
        </h5>
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
