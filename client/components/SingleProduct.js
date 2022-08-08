import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import saveLocalCart from "../saveLocalCart";

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

export default SingleProduct;
