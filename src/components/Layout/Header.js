import React from 'react';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import mealImage from '../assets/meals.jpg';

export default function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>MealSteal</h1>
        <HeaderCartButton onClick={props.onToggleCart}></HeaderCartButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealImage} alt="A table full of food" />
      </div>
    </React.Fragment>
  );
}
