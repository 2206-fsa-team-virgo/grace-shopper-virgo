import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchProduct } from "../store/singleProduct";
import EmojiDisplay from "../shared/EmojiDisplay";
import useRouter from "../shared/useRouter";

const addCartItem = async (item) => {
  await axios.post(`/api/orders/`, item);
};

/**
 * COMPONENT -- translating this from AllProducts
 */
const SingleProduct = (props) => {
  const product = useSelector((reduxState) => reduxState.product);
  const isLoggedIn = !!useSelector((reduxState) => reduxState.auth.id);
  const dispatch = useDispatch();
  const router = useRouter();

  // load the proper product when component mounts
  useEffect(() => {
    dispatch(fetchProduct(props.match.params.productId));
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
      {typeof product === "undefined" ? (
        <p>Loading</p>
      ) : (
        <div>
          <h3>{product.name}</h3>
          <EmojiDisplay {...product} />
          <div>
            <div>Price: ${parseFloat(product.price).toFixed(2)}</div>
            <button onClick={() => saveLocalCart(product)}>Add to cart</button>
            <button onClick={(e) => router.push("/cart")}>View Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
