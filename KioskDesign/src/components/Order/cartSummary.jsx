import React from "react";
import { useCart } from "../../context/cartContext";
import "../../css/cartSummary.css";

function CartSummary() {
  const { cart} = useCart();
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
        <div to="/checkout" className="btn btn-danger pay-btn">
          Pagar
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
