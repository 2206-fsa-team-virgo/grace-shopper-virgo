import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchProducts } from "../store/products";
import saveLocalCart from "../shared/saveLocalCart";

export const Cart = (props) => {
  let history = useHistory();
  const { username } = props;
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log("cart", cart);

  const updateLocalStorageCart = () =>
    localStorage.setItem("cart", JSON.stringify(cart));

  const incrementFromCart = (id) => {
    cart[id].qty++;
    updateLocalStorageCart();
  };

  const decrementFromCart = (id) => {
    if (cart[id].qty >= 0) {
      cart[id].qty--;
    }
    updateLocalStorageCart();
  };

  const removeItemFromCart = (id) => {
    delete cart[id];
    updateLocalStorageCart();
  };

  return (
    <div>
      <h3>A new New York</h3>
      <button onClick={() => updateLocalStorageCart}>Refresh Cart</button>
      {/* {products.map((product) => (
        <div>
          <div>Name: {product.name}</div>
          <div>Price: ${product.price}</div>
          <img src={product.img} />
        </div>
      ))} */}
    </div>
  );
};
