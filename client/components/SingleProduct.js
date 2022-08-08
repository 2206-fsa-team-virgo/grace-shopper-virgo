import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import saveLocalCart from "../shared/saveLocalCart";
import EmojiDisplay from "../shared/EmojiDisplay";
import useRouter from "../shared/useRouter";

/**
 * COMPONENT -- translating this from AllProducts
 */
const SingleProduct = (props) => {
  const product = useSelector((reduxState) => reduxState.product);
  const dispatch = useDispatch();
  const router = useRouter();

  // load the proper product when component mounts
  useEffect(() => {
    dispatch(fetchProduct(props.match.params.productId));
  }, []);

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
