import React from "react";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="alert alert-info mt-4" role="alert">
        <h4 className="alert-heading">Checkout Page</h4>
        <p>This is where you can review your order and proceed to payment.</p>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          <h5 className="card-title">Order Summary</h5>
          <div className="d-flex justify-content-between mb-2">
            <span>Product</span>
            <strong>Sample Product</strong>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Quantity</span>
            <strong>1</strong>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-3">
            <span>Total Amount:</span>
            <strong>AED 300.00</strong>
          </div>

          <div className="text-center align-items-center">
            <h6 className="mb-2">Select Payment Method</h6>
            <div className="d-flex gap-2 justify-content-center mb-3">
              <button className="btn btn-primary" type="button">
                Efectivo
              </button>
              <button className="btn btn-primary" type="button">
                Tarjeta
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary w-100"
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
