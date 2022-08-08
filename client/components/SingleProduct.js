import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import saveLocalCart from "../saveLocalCart";
import emoji from "react-easy-emoji";

/**
 * COMPONENT -- translating this from AllProducts
 */
const SingleProduct = (props) => {
  const product = useSelector((reduxState) => reduxState.product);
  const dispatch = useDispatch();

  // load the proper product when component mounts
  useEffect(() => {
    dispatch(fetchProduct(props.match.params.productId));
  }, []);

  let emojiForDisplay = product.desc || "";
  console.log("emojiForDisplay", emojiForDisplay);

  function svgEmoji(input) {
    return emoji(input, {
      baseUrl: "https://twemoji.maxcdn.com/2/svg/",
      ext: ".svg",
      size: "",
      props: { style: { height: "100%", width: "100%" } },
    });
  }

  let displayEmoji = svgEmoji(emojiForDisplay)[0];

  console.log("displayEmoji", displayEmoji);

  const emojiContainerStyles = {
    height: "20em",
    width: "20em",
  };

  return (
    <div>
      {typeof product === "undefined" ? (
        <p>Loading</p>
      ) : (
        <div>
          <h3>{product.name}</h3>
          <div style={emojiContainerStyles}>{displayEmoji}</div>
          <div>
            {/* <img src={product.img} /> */}
            <div>Price: ${parseFloat(product.price).toFixed(2)}</div>
            <button onClick={() => saveLocalCart(product)}>Add to cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
