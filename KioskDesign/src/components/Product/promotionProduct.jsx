import React from "react";
import "../../assets/style/promotionProduct.css";
import promoImage from "../../assets/img/promo.png"; // Asegúrate de tener esta imagen en tu proyecto

function PromotionProduct() {
  return (
    <div className="card promotion-card text-bg-dark">
      <img
        src={promoImage}
        className="card-img"
        alt="Promoción"
      />

      {/* Overlay */}
      <div className="card-overlay"></div>

      {/* Contenido */}
      <div className="card-img-overlay promotion-content">
        <span className="badge text-bg-danger px-3 py-2">
          Oferta del día
        </span>

        <h2 className="card-title mt-3">
          Combo para 2 personas
        </h2>

        <p className="card-text">
          Disfruta de 2 Hamburguesas, papas grandes y refresco
          por un precio especial.
        </p>

        <a href="#" className="btn btn-light text-danger fw-semibold">
          Lo quiero!
        </a>
      </div>
    </div>
  );
}

export default PromotionProduct;

