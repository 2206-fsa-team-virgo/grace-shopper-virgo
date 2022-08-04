import React from 'react';
import { connect } from 'react-redux';

const product =
  {
    name: 'happy',
    price: 0,
    img: 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/smiling-face-with-open-mouth.png'
  },;

/**
 * COMPONENT -- translating this from AllProducts
 */
export const SingleProduct = (props) => {

  const saveLocalCart = (item) => {
    let cart;
    if (localStorage.getItem("cart") === null) {
      //If no local storage present, create a cart
      cart = [];
    } else {
      //If there is, parse the local storage string, and assign cart to parsed string (which is now the cart array)
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    //Push the item onto the server (our computers) cart array
    cart.push(item)
    //Update the cart on the web's local storage
    localStorage.setItem("cart", JSON.stringify(cart))
  };
  return (
    <div>
      <h3>{product.name}</h3>
      {products.map((product) => {
        const caller = () => {
          saveLocalCart(product)
        }
        return (
        <div>
          <img src={product.img} />
          <div>Name: {product.name}</div>
          <div>Price: ${product.price / 100}</div>
          <button onClick={caller}>Add to cart</button>
        </div>
      )})}
      <div>{/*  Yellow bar with icons here! */}</div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username
  };
};

export default connect(mapState)(SingleProduct);
