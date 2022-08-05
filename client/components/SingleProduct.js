import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";

// const product = {
//   name: "happy",
//   price: 1.99,
//   img: "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/smiling-face-with-open-mouth.png",
// };

/**
 * COMPONENT -- translating this from AllProducts
 */
export const SingleProduct = () => {
  const product = useSelector((reduxState) => reduxState.product);
  const dispatch = useDispatch();

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
      <h3>{product.name}</h3>
      <div>
        <img src={product.img} />
        <div>Price: ${product.price}</div>
        <button onClick={caller}>Add to cart</button>
      </div>
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
