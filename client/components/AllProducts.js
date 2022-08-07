import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import saveLocalCart from "../saveLocalCart";

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

  return (
    <div>
      <h3>Shop Emojis!</h3>
      {
        //This ternary vv checks to see if the component mounted
        //If it didn't, it will wait to load the data with a 'Loading...' until it does
        products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          //We're using product.slice for beta since 2.6k entries is a lot
          products.slice(0, 100).map((product) => {
            const caller = () => {
              saveLocalCart(product);
            };
            return (
              <div key={product.id}>
                <img src={product.img} />
                <div>Name: {product.name}</div>
                <div>Price: ${parseFloat(product.price).toFixed(2)}</div>
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
