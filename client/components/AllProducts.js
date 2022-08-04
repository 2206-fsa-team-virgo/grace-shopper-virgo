import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


const products = [
  {
    name: 'happy',
    price: 0,
    img: 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/smiling-face-with-open-mouth.png'
  },
  {
    name: 'cool',
    price: 100,
    img: 'https://www.shareicon.net/data/256x256/2016/10/25/847496_cool_512x512.png'
  },
  {
    name: 'angry',
    price: 1000,
    img: 'https://i.pinimg.com/originals/7c/9a/54/7c9a542a8c6916086b76599352da840b.png'
  },
  {
    name: 'sad',
    price: 299,
    img: 'https://cdn.iconscout.com/icon/free/png-256/sad-emoji-17-894764.png'
  },
  {
    name: 'nervous',
    price: 500,
    img: 'https://nwamotherlode.com/wp-content/uploads/2017/03/worried-nervous-emoji.png'
  },
  // {
  //   name: 'squid',
  //   price: 8800,
  //   img: 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/squid.png'
  // },
];

/**
 * COMPONENT
 */
export const AllProducts = (props) => {

  const saveLocalCart = (item) => {
    let cart;
    if (localStorage.getItem("cart") === null) {
      cart = [];
    } else {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push(item)
    localStorage.setItem("cart", JSON.stringify(cart))
  };
  return (
    <div>
      <h3>Shop Emojis!</h3>
      {products.map((product) => (
        <div>
          <img src={product.img} />
          <div>Name: {product.name}</div>
          <div>Price: ${product.price / 100}</div>
          <button onClick={saveLocalCart(product)}>Add to cart</button>
        </div>
      ))}
      <div>{/*  Yellow bar with icons here! */}</div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username
  };
};

export default connect(mapState)(AllProducts);
