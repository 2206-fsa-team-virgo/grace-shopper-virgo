import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import { Cart } from "./components/Cart";
import { me } from "./store";
import { LoginPage, SignupPage } from "./components/AuthPage";
import Checkout from "./components/CheckoutForm";
import SingleProduct from "./components/SingleProduct";
import ThankYou from "./components/ThankYouPage";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const isLoggedIn = true;

    return (
      <div>
        {/* {isLoggedIn ? ( */}
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Route path="/products" component={AllProducts} />{" "}
          <Route path="/checkout" component={Checkout} />
          <Route path="/cart" component={Cart} />
          <Route path="/thankyou" component={ThankYou} />
          {/* <Redirect to="/home" /> */}
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Switch>
        {/* )} */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
