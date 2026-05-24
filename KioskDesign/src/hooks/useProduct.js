import { useState, useEffect } from "react";
import {getProducts,getProductById,getCategories,getProductsByCategory} from "../services/productService";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const categoryIcons = {
    acompañantes: "fa-solid fa-drumstick-bite",
    bebidas: "fa-solid fa-glass-water",
    "comidas rápidas": "fa-solid fa-burger",
    postres: "fa-solid fa-ice-cream",
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterByCategory = async (idCategoria) => {
    try {
      const data = await getProductsByCategory(idCategoria);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectedProduct = async (id) => {
    try {
      const product = await getProductById(id);

      setSelectedProduct(product);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };
/* =========================
  Carga inicial de productos y categorías
========================= */
  useEffect(() => {
    const fetchData = async () => {
      await loadProducts();
      await loadCategories();
    };

    fetchData();
  }, []);

  return {
    products,
    categories,
    selectedCategory,
    selectedProduct,
    showModal,
    categoryIcons,

    loadProducts,
    loadCategories,

    setSelectedCategory,
    setShowModal,

    filterByCategory,
    handleSelectedProduct,
  };
}
