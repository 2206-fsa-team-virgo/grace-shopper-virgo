import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
/**
 * COMPONENT
 */
export const AllProducts = (props) => {
  const dispatch = useDispatch();
  //Grabbing the products from the redux store
  const products = useSelector((state) => state.products);

  //This useEffect hook acts like a 'Component did Mount'
  useEffect(() => {
    //Dispatching the proucts to the readux store
    dispatch(fetchProducts());
  }, []);

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
    cart.push(item);
    //Update the cart on the web's local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <div>
      <h3>Shop Emojis!</h3>
      <button onClick={propsbutton}>Props</button>
      {
        //This ternary vv checks to see if the component mounted
        //If it didn't, it will wait to load the data with a 'Loading...' until it does
        products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          //We're using product.slice for beta since 2.6k is a lot
          products.slice(0, 100).map((product) => {
            const caller = () => {
              saveLocalCart(product);
            };
            return (
              <div key={product.id}>
                <img src={product.img} />
                <div>Name: {product.name}</div>
                <div>Price: ${product.price}</div>
                <button onClick={caller}>Add to cart</button>
              </div>
            );
          })
        )
      }
      <div>{/*  Yellow bar with icons here! */}</div>
    </div>
  );
};

export default AllProducts;
