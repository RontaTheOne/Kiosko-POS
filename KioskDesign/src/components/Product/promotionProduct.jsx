import React from "react";

function PromotionProduct() {
  return (
    <div
      className="card text-bg-dark w-100 h-50"
      style={{
        width: "100%",
        height: "250px",
        overflow: "hidden",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9K_xiI4RpILq4Jd-80k7_VkfCg-nvyhWnA&s"
        className="card-img"
        alt="Promoción"
        style={{ height: "250px", width: "100%", objectFit: "cover" }}
      />
      <div className="card-img-overlay p-4">
        <span className="badge text-bg-danger p-2">Oferta del dia</span>
        <h2 className="card-title">Combo para 2 personas</h2>
        <p className="card-text">
          Disfruta de 2 Hamburguesas, papas grandes y refresco por un precio
          especial.
        </p>
        <a href="#" className="btn btn-light text-danger">
          Lo quiero!
        </a>
      </div>
    </div>
  );
}

export default PromotionProduct;

