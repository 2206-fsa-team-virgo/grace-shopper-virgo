import { useSelector } from "react-redux";

const isLoggedIn = !!useSelector((reduxState) => reduxState.auth.id);
const addCartItem = async (item) => {
  await axios.post(`/api/orders/`, item);
};

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
      onSale: item.onSale
    };

    updatedCart[item.id] = itemObj;
  }

  updatedCart[item.id].qty++;

  //Update the cart on the web's local storage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  if (isLoggedIn) addCartItem(updatedCart[item.id]);
};

export default saveLocalCart;
