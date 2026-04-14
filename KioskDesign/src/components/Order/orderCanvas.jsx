import React from "react";

function OrderCanvas() {
  return (
    <div
      class="offcanvas offcanvas-bottom"
      tabindex="-1"
      id="offcanvasBottom"
      aria-labelledby="offcanvasBottomLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">
          Mi orden
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body small">
        <div className="text-center py-5">
          <h1>
            <i class="bi bi-basket2-fill"></i>
          </h1>
          <h5 className="text-muted">Su orden está vacía</h5>
          <p className="text-muted small">Agregue productos a su orden</p>

          <div className="card mb-3">
            <div className="card-body d-flex align-items-center gap-3">
              <img
                src="https://www.menuspararestaurantes.com/wp-content/uploads/2022/12/promociones-en-tu-restaurante-combos2.jpg"
                alt="Producto"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div className="flex-grow-1">
                <h6 className="card-title mb-1">Big King</h6>
                <p className="text-muted small mb-2">No onion, pickle</p>
                <div className="input-group" style={{ width: "140px" }}>
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value="1"
                  />
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-end">
                <span className="fw-bold fs-6 text-danger">$ 4.10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCanvas;
