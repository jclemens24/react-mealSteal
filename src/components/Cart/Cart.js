import classes from './Cart.module.css';
import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../context/CartContext';
import CartItem from './CartItem';

export default function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${Math.abs(cartCtx.totalAmount.toFixed(2))}`;
  const cartHasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    console.log(item);
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onClose} className={classes['button--alt']}>
            Close
          </button>
          {cartHasItems && <button className={classes.button}>Order</button>}
        </div>
      </div>
    </Modal>
  );
}
