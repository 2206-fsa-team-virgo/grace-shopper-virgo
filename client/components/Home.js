import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


const products = [
  {
    name: 'happy chat',
    price: 0,
    img: 'http://www.clker.com/cliparts/V/U/s/u/2/a/chat-hi.png'
  },
  {
    name: 'awesome chat',
    price: 100,
    img: 'http://www.clker.com/cliparts/V/U/s/u/2/a/chat-hi.png'
  }
];

/**
 * COMPONENT
 */
export const Home = (props) => {
  let history = useHistory();
  const { username } = props;
  
  const handleButton = () => {
    history.push('/allProducts')
  };

  return (
    <div>
      <h3>A new New York</h3>
      <h5>Consistent NYCconversations at the click of a button</h5>
      <button onClick={handleButton}>Shop Now</button>
      <img src='https://hotemoji.com/images/dl/q/shocked-emoji-by-twitter.png'/>
      {/* Would like to maybe make this a button */}
      {products.map((product) => (
        <div>
          <div>Name: {product.name}</div>
          <div>Price: ${product.price}</div>
          <img src={product.img} />
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

export default connect(mapState)(Home);
