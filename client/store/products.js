import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";

const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get("/api/products");
    dispatch(_setProducts(products));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
