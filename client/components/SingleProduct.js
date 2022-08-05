import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/singleProduct";

/**
 * COMPONENT -- translating this from AllProducts
 */
const SingleProduct = (props) => {
  const product = useSelector((reduxState) => reduxState.product);
  const dispatch = useDispatch();

  // load the proper product when component mounts
  useEffect(() => {
    dispatch(fetchProduct(props.match.params.productId));
    console.log("Props-->", props);
  }, []);

  // should we consolidate this SaveLocalCart function somewhere?
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

  const caller = () => {
    saveLocalCart(product);
  };

  return (
    <div>
      {typeof product === "undefined" ? (
        <p>Loading</p>
      ) : (
        <div>
          <h3>{product.name}</h3>
          <h3>{product.desc}</h3>
          <div>
            <img src={product.img} />
            <div>Price: ${parseFloat(product.price).toFixed(2)}</div>
            <button onClick={() => saveLocalCart(product)}>Add to cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };

// export default connect(mapState)(SingleProduct);
export default SingleProduct;
