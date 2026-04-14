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
             <h1><i class="bi bi-basket2-fill"></i></h1 >
          <h5 className="text-muted">Su orden está vacía</h5>
          <p className="text-muted small">Agregue productos a su orden</p>
        </div>
      </div>
    </div>
  );
}

export default OrderCanvas;
