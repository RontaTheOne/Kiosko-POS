import React from "react";

function MenuProduct() {
  return (
    <div class="d-flex gap-3 overflow-auto py-2 category-menu">
      <button class="category-btn active">
        <div class="icon-box">
          <i class="fa-solid fa-burger"></i>
        </div>
        <span>Burgers</span>
      </button>

      <button class="category-btn">
        <div class="icon-box">
          <i class="fa-solid fa-bowl-food"></i>
        </div>
        <span>Bowls</span>
      </button>

      <button class="category-btn">
        <div class="icon-box">
          <i class="fa-solid fa-pizza-slice"></i>
        </div>
        <span>Pizzas</span>
      </button>

      <button class="category-btn">
        <div class="icon-box">
          <i class="fa-solid fa-ice-cream"></i>
        </div>
        <span>Postres</span>
      </button>

      <button class="category-btn">
        <div class="icon-box">
          <i class="fa-solid fa-martini-glass"></i>
        </div>
        <span>Bebidas</span>
      </button>

      <button class="category-btn">
        <div class="icon-box">
          <i class="fa-solid fa-cookie"></i>
        </div>
        <span>Sides</span>
      </button>
    </div>
  );
}
export default MenuProduct;
