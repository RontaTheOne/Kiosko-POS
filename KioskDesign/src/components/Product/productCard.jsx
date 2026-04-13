import React from "react";

function ProductCard({ product, onClick }) {
  return (
      <div className="card product-card h-100 text-center" onClick={onClick}>
        {/* Imagen opcional (puedes reemplazarla si luego tienes imágenes reales) */}
        <img
          src={product.image || "https://via.placeholder.com/300x200"}
          className="card-img-top"
          alt={product.nombre}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.nombre}</h5>

          <p className="card-text fw-bold">
            $ {parseFloat(product.precio_base)}
          </p>
        </div>
      </div>
  );
}

export default ProductCard;
