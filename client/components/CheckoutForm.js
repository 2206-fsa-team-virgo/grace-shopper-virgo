import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  let history = useHistory();
  let totalPrice = 0;
  const handleClick = () => {
    history.push("/thankyou");
    cart = {};
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <div>
      <h3>Checkout</h3>

      <h4>Basic Information</h4>

      <div className="row">
        <label>First Name</label>
        <input type="text" name="firstName" className="form-control" />

        <label>Last Name</label>
        <input type="text" name="lastName" className="form-control" />

        <label>Email Address</label>
        <input type="text" name="email" className="form-control" />

        <label>Shipping Address</label>
        <textarea rows="3" className="form-control"></textarea>

        <label>City</label>
        <input type="text" name="city" className="form-control" />

        <label>State</label>
        <input type="text" name="state" className="form-control" />

        <label>Zipcode</label>
        <input type="text" name="zipcode" className="form-control" />

        <h4>Payment Information</h4>
        <div>
          <label>Card Number</label>
          <input
            id="ccn"
            type="tel"
            inputMode="numeric"
            pattern="[0-9\s]{13,19}"
            autoComplete="cc-number"
            maxLength="19"
            placeholder="xxxx xxxx xxxx xxxx"
          />
          <label>Expiration</label>
          <input
            className="inputCard"
            name="expiry"
            id="expiry"
            type="month"
            required
          />
          <label>CVC</label>
          <input type="tel" maxLength="4" />
          <label>Zipcode</label>
          <input type="text" maxLength="5" />
        </div>

        <button onClick={handleClick}>Place Order</button>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(cart).map((item, idx) => {
              let subtotal = parseFloat(item.price) * item.qty;
              let convertedPrice = Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(subtotal);
              totalPrice += subtotal;
              return (
                <tr key={idx}>
                  <td>{item.desc}</td>
                  <td>${item.price}</td>
                  <td>{item.qty}</td>
                  <td>{convertedPrice}</td>
                </tr>
              );
            })}
            <tr>
              <td>Final Total:</td>
              <td>${totalPrice}.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Checkout;
