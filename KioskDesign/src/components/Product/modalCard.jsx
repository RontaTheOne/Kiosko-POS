import React from "react";

function ModalCard({ product, onClose, onAdd }) {
  if (!product) return null;

  return (
    <div className="modal fade show d-block text-center" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>{product.nombre}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <img
              src={product.image || "https://via.placeholder.com/300x200"}
              alt={product.nombre}
              className="img-fluid mb-3"
            />
            <p><strong>Descripción:</strong> {product.descripcion}</p>
            <p><strong>Precio Base:</strong> ${parseFloat(product.precio_base).toFixed(2)}</p>
            <p><strong>Categoría:</strong> {product.id_categoria}</p>
          </div>

          <div className="modal-footer d-flex justify-content-center">
            <button type="button" className="btn btn-primary" onClick={onAdd}>
              Agregar al carrito
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ModalCard;