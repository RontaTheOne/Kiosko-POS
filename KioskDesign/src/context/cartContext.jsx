import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // Agregar un producto al carrito
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Eliminar un producto del carrito
  const removeFromCart = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
  };

    // Incrementar la cantidad de un producto en el carrito
    const incrementQuantity = (item) => {
      setCart((prevCart) =>
        prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    };

    // Decrementar la cantidad de un producto en el carrito
    const decrementQuantity = (item) => {
      setCart((prevCart) =>
        prevCart.map((i) =>
            i.id === item.id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    };

    // Limpiar el carrito
    const clearCart = () => {
      setCart([]);
    };

    return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
