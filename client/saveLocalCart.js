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

export default saveLocalCart