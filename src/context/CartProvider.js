import CartContext from './CartContext';
import { useReducer } from 'react';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_CART_ITEM':
      let updatedItems;
      if (state.items.find(item => item.id === action.item.id)) {
        updatedItems = state.items.map(item =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + action.item.amount }
            : item
        );
      } else {
        updatedItems = [...state.items, action.item];
      }
      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };

    case 'DECREMENT_CART_ITEM':
      const findRemovedItemIndex = state.items.findIndex(
        item => item.id === action.id
      );
      const foundItem = state.items[findRemovedItemIndex];
      const newTotal = state.totalAmount - foundItem.price;
      let updatedCart;
      if (foundItem.amount === 1) {
        updatedCart = state.items.filter(item => item.id !== action.id);
      } else {
        const updatedItem = { ...foundItem, amount: foundItem.amount - 1 };
        updatedCart = [...state.items];
        updatedCart[findRemovedItemIndex] = updatedItem;
      }
      return {
        items: updatedCart,
        totalAmount: newTotal,
      };

    default:
      return defaultCartState;
  }
};
const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = item => {
    dispatchCartAction({ type: 'INCREMENT_CART_ITEM', item: item });
  };

  const removeItemFromCart = id => {
    dispatchCartAction({ type: 'DECREMENT_CART_ITEM', id: id });
  };

  const cart = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cart}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
