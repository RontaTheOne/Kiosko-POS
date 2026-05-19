import React from "react";

function MenuProduct({ categories, selectedCategory, onSelectCategory, onResetCategory }) {
  return (
    <div className="menu-product">
      <div className="category-menu d-flex gap-3 overflow-auto py-2">
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
              <i className="fa-solid fa-burger"></i>
            </div>

            <span>{cat.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default MenuProduct;
