import React from "react";

function ProductCard({ product }) {
  return (
    <div className="card product-card" style={{ width: "18rem" }}>
      <img src={product.image} className="card-img-top" alt={product.name} />

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>

        <p className="card-text">${product.price.toFixed(2)}</p>

        <button className="btn btn-primary">Agregar</button>
      </div>
    </div>
  );
}

export default ProductCard;
