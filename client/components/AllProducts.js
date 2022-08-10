import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import EmojiDisplay from "../shared/EmojiDisplay";

const addCartItem = async (item) => {
  await axios.post(`/api/orders/`, item);
};

export const AllProducts = (props) => {
  const dispatch = useDispatch();
  //Grabbing the products from the redux store
  const products = useSelector((state) => state.products);
  const isLoggedIn = !!useSelector((reduxState) => reduxState.auth.id);

  //This useEffect hook acts like a 'Component did Mount'
  useEffect(() => {
    //Dispatching the proucts to the readux store
    dispatch(fetchProducts());
  }, []);

  const saveLocalCart = (item) => {
    let cart;
    if (localStorage.getItem("cart") === null) {
      //If no local storage present, create a cart
      cart = {};
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    //If there is, parse the local storage string, and assign cart to parsed string (which is now the cart obj)
    cart = JSON.parse(localStorage.getItem("cart"));
    let updatedCart = { ...cart };
    let keys = Object.keys(updatedCart);

    if (!keys.includes(item.id.toString())) {
      const itemObj = {
        id: item.id,
        qty: 0,
        name: item.name,
        desc: item.desc,
        price: item.price,
        onSale: item.onSale,
      };

      updatedCart[item.id] = itemObj;
    }

    updatedCart[item.id].qty++;

    //Update the cart on the web's local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (isLoggedIn) addCartItem(updatedCart[item.id]);
  };

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
            return (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <EmojiDisplay {...product} />
                </Link>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <div>Price: ${parseFloat(product.price).toFixed(2)}</div>
                <button onClick={() => saveLocalCart(product)}>
                  Add to cart
                </button>
              </div>
            );
          })
        )
      }
    </div>
  );
};

export default AllProducts;
