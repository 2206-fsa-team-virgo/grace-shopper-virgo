import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Header = () => {
  // const isLoggedIn = !!useSelector((reduxState) => reduxState.auth.id);
  const isLoggedIn = false;
  const dispatch = useDispatch();

  const handleClick = () => {
    return dispatch(logout());
  };

  return (
    <header class="site-header">
      <div class="site-header_wrapper">
        <img
          class="logo"
          src="https://www.emoji.com/wp-content/uploads/2019/09/emoji_logo_2021.png"
        />
        {/* should we create a shared button? */}
        <nav class="nav">
          {isLoggedIn ? (
            <button class="logOut" href="#" onClick={handleClick}>
              Log out
            </button>
          ) : (
            <>
              <button class="signUp">Sign up</button>
              <button class="logIn">Log in</button>
            </>
          )}

          <img
            class="viewCart"
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
