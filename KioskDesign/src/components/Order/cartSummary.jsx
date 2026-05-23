import React from "react";
import { useCart } from "../../context/cartContext";
import { useHandlePay } from "../../hooks/handlePay.js";
import "../../assets/style/cartSummary.css";

function CartSummary() {
  const { cart} = useCart();
  const { handlePay } = useHandlePay();
  const subtotal = cart.reduce(
  (acc, product) =>
    acc + product.precio_unitario * product.quantity,
  0
);

const iva = subtotal * 0.19;
const total = subtotal + iva;

const totalProducts = cart.reduce(
  (acc, product) => acc + product.quantity,
  0
);
  return (
    <div className="cart-summary-bar">
      <div className="cart-bar d-flex align-items-center justify-content-between px-4">
        {/* Total */}
        <div className="total-section">
          <small className="text-muted d-block">Total</small>
          <span className="fw-bold fs-5">${total.toFixed(2)}</span>
        </div>

        {/* Carrito*/}
        <button
          type="button"
          className="cart-wrapper position-relative d-flex align-items-center justify-content-center"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
        >
          <i className="bi bi-cart-fill cart-icon"></i>
          {/* Badge */}
          <span className="cart-badge">{totalProducts}</span>
        </button>

        {/* Botón pagar */}
        <button className="btn btn-danger pay-btn" onClick={handlePay}>
          Pagar
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
