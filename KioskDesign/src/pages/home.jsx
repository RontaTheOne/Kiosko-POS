import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "../components/Product/productCard";
import ModalCard from "../components/Product/modalCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
   {/* Fetch de productos */}
  useEffect(() => {
    fetch("http://localhost:3000/producto")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

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
    <div className="container">
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      {/* Ver del productos */}
      <div className="row g-3">
        {products.map((product) => (
          <div className="col-12 col-md-4" key={product.id_producto}>
            <ProductCard 
              product={product} 
              onClick={() => handleSelectedProduct(product.id_producto)}
             />
          </div>
        ))}
      </div>

      {/* Modal del producto */}
      {showModal && selectedProduct && (
        <ModalCard
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Home;
