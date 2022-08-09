import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { fetchProducts } from "../store/products";
import EmojiDisplay from "../shared/EmojiDisplay";

export const Home = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  //Grabbing the products from the redux store
  const products = useSelector((state) => state.products);

  useEffect(() => {
    //Dispatching the proucts to the readux store
    dispatch(fetchProducts());
  }, []);

  const handleButton = () => {
    history.push("/products");
  };

  return (
    <div>
      <h3>Emoji Emporium</h3>
      <h5>
        The ONLY ecommerce shop {"(probably)"} where you can buy what's already
        on your phone!
      </h5>
      <EmojiDisplay {...products[1079]} />
      <button onClick={handleButton}>Shop Now</button>
      <h5>Featured Products</h5>
      <div>{/*  Yellow bar with icons here! */}</div>
      {
        //This ternary vv checks to see if the component mounted
        //If it didn't, it will wait to load the data with a 'Loading...' until it does
        products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          //We're using product.slice for beta since 2.6k entries is a lot
          products.slice(0, 6).map((product) => {
            return (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <EmojiDisplay {...product} />
                </Link>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <div>Price: ${parseFloat(product.price).toFixed(2)}</div>
              </div>
            );
          })
        )
      }
    </div>
  );
};

export default Home;
