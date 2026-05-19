import React, { useEffect, useState } from "react";
import { useInactivityRedirect } from "../hooks/useInactivityRedirect";
import ProductCard from "../components/Product/productCard";
import ModalCard from "../components/Product/modalCard";
import OrderCanvas from "../components/Order/orderCanvas";
import MenuProduct from "../components/Product/menuProduct";

function Home() {
  useInactivityRedirect("/");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
   {/* Fetch de productos */}
  useEffect(() => {
    fetch("http://localhost:3000/producto")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  {/* Fetch de categorias */}
  useEffect(() => {
  fetch("http://localhost:3000/producto/categoria")
    .then((res) => res.json())
    .then((data) => setCategories(data))
    .catch((err) =>
      console.error("Error:", err)
    );

}, []);

    {/* Productos por categoria */}
   const handleSelectCategory = async (idCategoria) => {

  try {

    const response = await fetch(
      `http://localhost:3000/producto/categoria/${idCategoria}`
    );

    const data = await response.json();

    setProducts(data);

  } catch (err) {

    console.error(
      "Error al obtener productos:",
      err
    );

  }

};

   {/*Producto seleccionado para el modal */}
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
    <div className="container d-flex flex-column align-items-center">
      <br />
      <h1 className="text-center">Home</h1>
        {/* Menu de categorias */}
        <MenuProduct />

      <div className="d-flex justify-content-center w-100 mb-3">
        <div className="btn-group" role="group" aria-label="Categorías">
          <button type="button" className="btn btn-outline-secondary" onClick={() => {
            fetch("http://localhost:3000/producto")
              .then((res) => res.json())
              .then((data) => setProducts(data))
              .catch((err) => console.error("Error:", err));
          }}>Todas</button>
          {categories.map((cat) => (
            <button
              key={cat.id_categoria}
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleSelectCategory(cat.id_categoria)}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center">Welcome to the Home page!</p>
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
      <button className="btn btn-primary position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
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
