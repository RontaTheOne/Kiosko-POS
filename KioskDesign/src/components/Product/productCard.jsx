import React from "react";

function ProductCard({ product, onClick }) {
  return (
      <div className="card product-card h-100 text-center" 
        onClick={onClick}
      >
        {/* Imagen opcional (puedes reemplazarla si luego tienes imágenes reales) */}
        <img
          src={"https://s7d1.scene7.com/is/image/mcdonalds/DC_202201_0007-005_QuarterPounderwithCheese_1564x1564-1:nutrition-calculator-tile"}
          className="card-img-top"
          alt={product.nombre}
          style={{ height: "200px", objectFit: "contain", width: "100%", padding: "10px" }}
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
