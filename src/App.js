import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './context/CartProvider';

function App() {
  const [cartModal, setCartModal] = useState(false);

  const toggleCartModal = () => {
    setCartModal(prevState => {
      return !prevState;
    });
  };

  return (
    <CartProvider>
      {cartModal && <Cart onClose={toggleCartModal} />}
      <Header onToggleCart={toggleCartModal} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
