import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchProducts } from "../store/products";

export const Cart = (props) => {
  let history = useHistory();
  const { username } = props;
  let cart = JSON.parse(localStorage.getItem("cart"));

  const saveLocalCart = (item) => {
    // let cart;
    // if (localStorage.getItem("cart") === null) {
    //   cart = [];
    if (cart.length === 0) {
      cart.push(item);
    } else {
      let res = cart.find((product) => product.id === item.id);
      if (res === undefined) {
        cart.push(item);
      }
      // cart = JSON.parse(localStorage.getItem("cart"));
    }
    // cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const removeItemFromCart = (itemRemoved) => {
    let temp = cart.filter((item) => item.id != itemRemoved);
    localStorage.setItem("cart", JSON.stringify(temp));
  };

  function updateQuantity(item, quantity) {
    for (let product of cart) {
      if (item.id === product.id) {
        item.quantity = quantity;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <div>
      <h3>A new New York</h3>
      <button onClick={saveLocalCart("Happy Emoji")}>Shop Now</button>
      {/* <h5>Consistent NYCconversations at the click of a button</h5>
      <img src="https://hotemoji.com/images/dl/q/shocked-emoji-by-twitter.png" />
      {products.map((product) => (
        <div>
          <div>Name: {product.name}</div>
          <div>Price: ${product.price}</div>
          <img src={product.img} />
        </div>
      ))}
      <div> Yellow bar with icons here!</div> */}
    </div>
  );
};
