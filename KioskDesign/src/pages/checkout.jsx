import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

function Checkout() {
  // Estado para métodos de pago
  const [methods, setMethods] = useState([]);
  // Hook de navegación
  const navigate = useNavigate();

  {/* Fetch de métodos de pago */}
  useEffect(() => {
    fetch("http://localhost:3000/metodo-pago")
      .then (res => res.json())
      .then (data => setMethods(data))
  }, []);

  return (
    <div className="container">
      <br /><br />
      <div className="card shadow mb-4 mt-4">
        <div className="card-body">
          <h5 className="card-title text-center">Order Summary</h5>
          <div className="d-flex justify-content-between mb-2">
            <span>Status</span>
            <span class="badge text-bg-warning">Warning</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Quantity</span>
            <strong>1</strong>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-3">
            <span>Total Amount:</span>
            <strong>USD 300.00</strong>
          </div>

          <div className="text-center align-items-center">
            <h6 className="mb-2">Select Payment Method</h6>
            <div className="d-flex gap-2 justify-content-center mb-3">
              {methods.map((method) => (
                <button
                  key={method.id_metodo_pago}
                  className="btn btn-primary"
                  type="button"
                >
                  {method.nombre}
                </button>
              ))}
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
