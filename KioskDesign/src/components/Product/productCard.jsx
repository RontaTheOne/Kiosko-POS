import React from "react";
import { getProductImage } from "../../utils/productImages";

function ProductCard({ product, onClick }) {
  return (
    <div
      className="card product-card h-100 text-center position-relative"
    >
      <button
        className="btn btn-danger btn-sm position-absolute"
        style={{
          top: "10px",
          right: "10px",
          width: "50px",
          height: "50px",
          padding: 0,
          borderRadius: "8px",
          zIndex: 2,
        }}
        onClick={onClick}
      >
        <i className="bi bi-plus-lg"></i>
      </button>

      <img
        src={getProductImage(product.nombre)}
        className="card-img-top"
        alt={product.nombre}
        style={{
          height: "200px",
          objectFit: "contain",
          width: "100%",
          padding: "10px",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h2 className="card-title">{product.nombre}</h2>

        <h5 className="card-text fw-bold text-warning mt-auto">
          $ {parseFloat(product.precio_base)}
        </h5>
      </div>
    </div>
  );
}

export default ProductCard;
