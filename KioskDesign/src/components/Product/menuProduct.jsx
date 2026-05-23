import React from "react";
import "../../assets/style/menuProduct.css";
function MenuProduct({ categories,categoryIcons, selectedCategory, onSelectCategory, onResetCategory }) {
  return (
    <div className="menu-product d-flex align-items-center">
      <div className="category-menu d-flex
      flex-nowrap
      gap-3
      overflow-auto
      py-2
      px-2
      justify-content-md-center
      justify-content-start
      align-items-center">
        <button
          type="button"
          className={`category-btn ${selectedCategory === null ? "active" : ""}`}
          onClick={onResetCategory}
        >
          <div className="icon-box">
            <i className="fa-solid fa-utensils"></i>
          </div>

          <span>Todos</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id_categoria}
            type="button"
            className={`category-btn ${
              selectedCategory === cat.id_categoria ? "active" : ""
            }`}
            onClick={() => onSelectCategory(cat.id_categoria)}
          >
            <div className="icon-box">
              <i className={'fa-solid ' + (categoryIcons[cat.nombre.toLowerCase()] || "fa-solid fa-utensils")}>
              </i>
            </div>

            <span>{cat.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default MenuProduct;
