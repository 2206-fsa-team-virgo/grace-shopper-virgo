import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";

const Header = () => {
  const isLoggedIn = !!useSelector((reduxState) => reduxState.auth.id);
  // const isLoggedIn = false;
  const dispatch = useDispatch();
  const handleClick = () => {
    return dispatch(logout());
  };

  return (
    <header className="site-header">
      <div className="site-header_wrapper">
        {/* <a href=""> */}
        <Link to="/">
          <img
            className="logo"
            src="https://www.emoji.com/wp-content/uploads/2019/09/emoji_logo_2021.png"
          />
        </Link>
        <Link to="/products">All</Link>
        {/* </a> */}
        {/* should we create a shared button? */}
        <nav className="nav">
          {isLoggedIn ? (
            <div>
              <Link to="/checkout">Checkout</Link>
              <button className="logOut" href="#" onClick={handleClick}>
                Log out
              </button>
              <p> Hi</p>
            </div>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </>
          )}
          <Link to="/cart">
            <img
              className="viewCart"
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
