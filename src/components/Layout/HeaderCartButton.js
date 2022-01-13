import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../context/CartContext';
import { useContext, useEffect, useState } from 'react';

export default function HeaderCartButton(props) {
  const [buttonBump, setButtonBump] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((prev, curr) => {
    console.log(cartCtx.items);
    return prev + curr.amount;
  }, 0);

  const { items } = cartCtx;

  const btnClass = `${classes.button} ${buttonBump ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) return;

    setButtonBump(true);

    const bumpTimer = setTimeout(() => {
      setButtonBump(false);
    }, 300);

    return () => {
      clearTimeout(bumpTimer);
    };
  }, [items]);

  return (
    <button type={props.type} className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
      {props.children}
    </button>
  );
}
