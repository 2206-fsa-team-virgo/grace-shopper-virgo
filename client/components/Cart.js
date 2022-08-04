import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const Cart = (props) => {
  
  let history = useHistory();
  const { username } = props;
  
  const handleButton = () => {
    history.push('/products')
  };

  return (
    <div>
      <h3>A new New York</h3>
      <h5>Consistent NYCconversations at the click of a button</h5>
      <button onClick={handleButton}>Shop Now</button>
      <img src='https://hotemoji.com/images/dl/q/shocked-emoji-by-twitter.png'/>
      {products.map((product) => (
        <div>
          <div>Name: {product.name}</div>
          <div>Price: ${product.price}</div>
          <img src={product.img} />
        </div>
      ))}
      <div>{/*  Yellow bar with icons here! */}</div>
    </div>
  );
};

const Cart = () => {};

export default 