import React, { useEffect, useState } from "react";
import { useInactivityRedirect } from "../hooks/useInactivityRedirect";
import ProductCard from "../components/Product/productCard";
import ModalCard from "../components/Product/modalCard";
import OrderCanvas from "../components/Order/orderCanvas";
import MenuProduct from "../components/Product/menuProduct";
import PromotionProduct from "../components/Product/promotionProduct";
import "../css/menuProduct.css";

function Home() {
  useInactivityRedirect("/");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  {
    /* Fetch de productos */
  }
  useEffect(() => {
    fetch("http://localhost:3000/producto")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  {
    /* Fetch de categorias */
  }
  useEffect(() => {
    fetch("http://localhost:3000/producto/categoria")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  /* Productos por categoria */

  const handleSelectCategory = async (idCategoria) => {
    try {
      setSelectedCategory(idCategoria);

      const response = await fetch(
        `http://localhost:3000/producto/categoria/${idCategoria}`,
      );

      const data = await response.json();

      setProducts(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  const handleResetCategory = async () => {
    try {
      setSelectedCategory(null);

      const response = await fetch("http://localhost:3000/producto");
      const data = await response.json();

      setProducts(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  {
    /*Producto seleccionado para el modal */
  }
  const handleSelectedProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/producto/${id}`);
      const product = await res.json();
      setSelectedProduct(product);
      setShowModal(true);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      <br />
      {/* Promoción del día */}
      <PromotionProduct />
      <br />
      {/* Menu de categorias */}
      <MenuProduct
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onResetCategory={handleResetCategory}
      />

      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-0">¿Qué quieres comer hoy?</h2>
        <div className="d-flex align-items-center gap-2">
          <span className="mb-0">
            <strong>Ordenar por</strong>
          </span>
          <select
            className="form-select form-select-sm w-auto"
            aria-label="Ordenar por"
          >
            <option value="1">Más Popular</option>
            <option value="2">Más Barato</option>
          </select>
        </div>
      </div>
        <br />
      {/* Ver del productos */}
      <div className="row g-3 justify-content-center w-100">
        {products.map((product) => (
          <div className="col-12 col-md-4" key={product.id_producto}>
            <ProductCard
              product={product}
              onClick={() => handleSelectedProduct(product.id_producto)}
            />
          </div>
        ))}
      </div>

      <br />
      {/* Modal del producto */}
      {showModal && selectedProduct && (
        <ModalCard
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Canvas de orden */}
      <button
        className="btn btn-primary position-relative"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
      >
        <i className="bi bi-basket2-fill"></i> Ver orden
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          0
        </span>
        <span className="visually-hidden">unread messages</span>
      </button>
      <OrderCanvas />
    </div>
  );
}

export default Home;
