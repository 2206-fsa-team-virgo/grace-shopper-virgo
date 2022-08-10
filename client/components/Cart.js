import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const addCartItem = async (product) => {
  await axios.post(`/api/${{/*SOMETHING*/}}/`, product)
}

const deleteCartItem = async (id) => {
  await axios.delete(`/api/${{/*SOMETHING*/}}/:${id}`)
}

const updateCartItem = async (product) => {
  await axios.put(`/api/${{/*SOMETHING*/}}/:${id}`, product)
}





export const Cart = (props) => {
  const [stateCart, setStateCart] = useState({});

  let history = useHistory();
  // const { username } = props;
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log("cart", cart);
  let cartTotal = 0;

  useEffect(() => {
    setStateCart(cart);
  }, []);
  console.log("stateCart", stateCart);

  const computeCartTotal = () => {
    for (let id in cart) {
      let subtotal = parseFloat(cart[id].price) * cart[id].qty;
      cartTotal += subtotal;
    }
  };
  computeCartTotal();

  // updates both local storage & local state carts
  const updateCarts = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setStateCart(cart);
  };

  const incrementFromCart = (id) => {
    cart[id].qty++;
    updateCarts();
  };

  const decrementFromCart = (id) => {
    if (cart[id].qty > 0) {
      cart[id].qty--;
    }
    updateCarts();
  };

  const removeItemFromCart = (id) => {
    delete cart[id];
    updateCarts();
  };

  return (
    <div>
      <h2>Your Emoji Cart</h2>
      <button onClick={() => updateCarts}>Refresh Cart</button>
      {Object.values(cart).map((item, idx) => {
        let subtotal = parseFloat(item.price) * item.qty;

        let convertedPrice = Intl.NumberFormat("en-us", {
          style: "currency",
          currency: "USD",
        }).format(subtotal);

        return (
          <div key={idx}>
            <p>Name: {item.name}</p>
            <p>Quantity: {item.qty}</p>
            <p>Price: ${item.price}</p>
            <p>{item.desc}</p>
            <p>Subtotal: {convertedPrice}</p>
            <button onClick={() => incrementFromCart(item.id)}>+1</button>
            <button onClick={() => decrementFromCart(item.id)}>-1</button>
            <button onClick={() => removeItemFromCart(item.id)}>
              Remove from cart
            </button>
          </div>
        );
      })}
      <h2>Cart Total: ${cartTotal}</h2>
      <button onClick={() => history.push("/checkout")}>Checkout</button>
    </div>
  );
};
