import { useInactivityRedirect } from "../hooks/useInactivityRedirect.js";
import { useProducts } from "../hooks/useProduct.js";
import ProductCard from "../components/Product/productCard";
import ModalCard from "../components/Product/modalCard";
import OrderCanvas from "../components/Order/orderCanvas";
import MenuProduct from "../components/Product/menuProduct";
import PromotionProduct from "../components/Product/promotionProduct";
import CartSummary from "../components/Order/cartSummary";

function Home() {
  useInactivityRedirect("/");
  const { 
    products,
    categories,
    selectedCategory,
    selectedProduct,
    showModal,
    categoryIcons,
    loadProducts,
    setSelectedCategory,
    setShowModal,
    filterByCategory,
    handleSelectedProduct,
  } = useProducts();

  const handleSelectCategory = async (idCategoria) => {
    setSelectedCategory(idCategoria);
    await filterByCategory(idCategoria);
  };

  const handleResetCategory = async () => {
    setSelectedCategory(null);
    await loadProducts();
  };

  return (
    <div className="home-page">
      <nav className="navbar bg-body-tertiary justify-content-center">
        <div className="container">
          <div className="navbar-brand mx-auto text-danger fw-bold fs-3">
            Kiosk App
          </div>
        </div>
      </nav>
      <div className="container my-4">
        {/* Promoción del día */}
        <PromotionProduct />
        <br />
        {/* Menu de categorias */}
        <MenuProduct
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onResetCategory={handleResetCategory}
          categoryIcons={categoryIcons}
        />
        {/* Título y ordenamiento */}
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">¿Qué quieres comer hoy?</h1>
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
      </div>
        <br />
      {/*Resumen del carrito */}
        <CartSummary />
      {/* Canvas de orden */}
        <OrderCanvas />
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
