import React from "react";
import { useNavigate } from "react-router-dom";
import { useInactivityRedirect } from "../../hooks/useInactivityRedirect";
import { useCart } from "../../context/cartContext";

function OrderCanvas() {
  const { cart, incrementQuantity, decrementQuantity, clearCart, removeFromCart, tipoOrden } = useCart();
  const navigate = useNavigate();

  useInactivityRedirect("/");

  const orderLabel =
    tipoOrden === "comer_aqui"
      ? "Comer aquí"
      : tipoOrden === "llevar" || tipoOrden === "para_llevar"
      ? "Para llevar"
      : tipoOrden;

  const orderIcon = tipoOrden === "comer_aqui" ? "bi bi-fork-knife" : "bi bi-bag-fill";

  const subtotal = cart.reduce((acc, product) => acc + product.precio_unitario * product.quantity, 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const handlePay = async () => {
    try {
      const response = await fetch("http://localhost:3000/orden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tipo_orden: tipoOrden,
          productos: cart.map(p => ({
            id_producto: p.id_producto,
            cantidad: p.quantity,

          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      clearCart();
      console.log(cart);

      const productCount = cart.reduce(
        (acc, product) => acc + (Number(product.quantity) || 0),
        0
      );

      navigate(`/Pago`, 
        { 
          state: { 
            order: { ...data, productCount }
           } 
      });

    } catch (error) {
      console.error(error);
      console.log(cart);
      alert("Error en el proceso de pago");
    }
  };

  return (
    <div
      className="offcanvas offcanvas-bottom"
      tabIndex="-1"
      id="offcanvasBottom"
      style={{ height: "auto", maxHeight: "80vh" }}
    >
      <div className="offcanvas-header d-flex align-items-center justify-content-between gap-3">
        <div>
          <h1 className="offcanvas-title">Mi orden</h1>
          <div className="d-flex align-items-center gap-2 mt-1">
            <i className={orderIcon}></i>
            <span className={`badge ${tipoOrden === "comer_aqui" ? "bg-danger text-white" : "bg-danger text-white"} text-uppercase py-2 px-3 fs-7 fw-semibold`}>
              {orderLabel}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>

      <div className="offcanvas-body small">

        {/* Orden vacía */}
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <h1><i className="bi bi-basket2-fill"></i></h1>
            <h5 className="text-muted">Su orden está vacía</h5>
            <p className="text-muted small">Agregue productos a su orden</p>
          </div>
        ) : (

          /* Orden dinamica */
          cart.map(product => (
            <div className="card mb-3" key={product.id_producto}>
              <div className="card-body d-flex align-items-center gap-3">

                <img
                  src={product.image || "https://via.placeholder.com/100"}
                  alt={product.nombre}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <div className="flex-grow-1">
                  <h6 className="card-title mb-1">{product.nombre}</h6>

                  <div className="input-group" style={{ width: "140px" }}>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => decrementQuantity(product.id_producto)}
                    >
                      −
                    </button>

                    <input
                      type="text"
                      className="form-control text-center"
                      value={product.quantity}
                      readOnly
                    />

                    <button
                      className="btn btn-outline-success"
                      onClick={() => incrementQuantity(product.id_producto)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-end">
                  <span className="fw-bold fs-6 text-danger">
                    $ {(product.precio_unitario * product.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="text-end">
                   <button type="button" className="btn btn-outline-danger" onClick={() => removeFromCart(product)}>
                    <i className="bi bi-trash3-fill lg"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* PRODUCTOS */}
        {cart.length > 0 && (
          <>
            <div className="d-flex justify-content-between mt-3">
              <span className="text-muted">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span className="text-muted">IVA</span>
              <span>${iva.toFixed(2)}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mt-3">
              <h4>Total</h4>
              <span className="fw-bold fs-5">${total.toFixed(2)}</span>
            </div>

            <div className="text-center mt-4 d-flex gap-3 justify-content-center">
              <button
                className="btn btn-outline-danger"
                onClick={handlePay}
              >
                Pagar
              </button>

              <button
                className="btn btn-outline-secondary"
                onClick={clearCart}
              >
                Vaciar
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default OrderCanvas;