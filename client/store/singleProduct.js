import axios from "axios";

// ACTION TYPES
const SET_PRODUCT = "SET_PRODUCT";

// ACTION CREATORS
export const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});

// THUNKS
export const fetchProduct = (productId) => {
  return async function (dispatch) {
    try {
      const { data: product } = await axios.get(`/api/products/${productId}`);
      return dispatch(setProduct(product));
    } catch (err) {
      console.error("could not fetch product", err);
    }
  };
};

// REDUCER

export default function singleProductReducer(product = {}, action) {
  switch (action.type) {
    case SET_PRODUCT: {
      return action.product;
    }
    default:
      return product;
  }
}
