import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "../components/Product/productCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/producto")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="container">
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <div className="row g-3">
        {products.map((product) => (
          <div className="col-12 col-md-4" key={product.id_producto}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
