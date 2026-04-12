import React from "react";

function ProductCard({ product }) {
  return (
      <div className="card product-card h-100">
        {/* Imagen opcional (puedes reemplazarla si luego tienes imágenes reales) */}
        <img
          src={product.image || "https://via.placeholder.com/300x200"}
          className="card-img-top"
          alt={product.nombre}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.nombre}</h5>

          <p className="card-text text-muted">{product.descripcion}</p>

          <p className="card-text fw-bold">
            $ {parseFloat(product.precio_base)}
          </p>

          <button className="btn btn-primary w-100 mt-auto">Agregar</button>
        </div>
      </div>
  );
}

export default ProductCard;
