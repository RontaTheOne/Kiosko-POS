import React from "react";
import ProductCard from "../components/Product/productCard";

function Home() {
  return (
    <div className="container">
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <div className="row g-3">
        <ProductCard
          product={{
            nombre: "Coca-Cola",
            descripcion: "Bebida gaseosa 400ml",
            precio_base: "3500.00",
          }}
        />
        <ProductCard
          product={{
            nombre: "Hamburguesa clásica",
            descripcion: "Hamburguesa con carne de res y vegetales",
            precio_base: "2000.00",
          }}
        />
        <ProductCard
          product={{
            nombre: "Helado de vainilla",
            descripcion: "Helado cremoso sabor vainilla en cono",
            precio_base: "5000.00",
          }}
        />
      </div>
    </div>
  );
}

export default Home;
