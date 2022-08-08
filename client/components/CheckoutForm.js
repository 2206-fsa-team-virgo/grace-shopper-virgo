import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let totalPrice = 0;
  //   const handlePrice = (item) => {
  //     let itemTotal = item.price * item.quantity;
  //     totalPrice += itemTotal;
  //     return itemTotal;
  //   };
  return (
    <div>
      {/* <div className="py-3 bg-warning">
        <div class="container"> */}
      <h3>Checkout</h3>
      {/* </div>
      </div> */}
      {/* <div className="py-4"> */}
      <h4>Basic Information</h4>
      {/* </div> */}
      {/* <div className="card-body"> */}
      <div className="row">
        {/* <div className="col-md-6">
          <div className="form-group mb-3"> */}
        <label>First Name</label>
        <input type="text" name="firstName" className="form-control" />
        {/* </div>
        </div> */}
        {/* <div className="col-md-6">
          <div className="form-group mb-3"> */}
        <label>Last Name</label>
        <input type="text" name="lastName" className="form-control" />
        {/* </div>
        </div> */}
        {/* <div className="col-md-6">
          <div className="form-group mb-3"> */}
        <label>Email Address</label>
        <input type="text" name="email" className="form-control" />
        {/* </div>
        </div> */}
        {/* <div className="col-md-12">
          <div className="form-group mb-3"> */}
        <label>Shipping Address</label>
        <textarea rows="3" className="form-control"></textarea>
        {/* </div>
        </div> */}
        {/* <div className="col-md-4">
          <div className="form-group mb-3"> */}
        <label>City</label>
        <input type="text" name="city" className="form-control" />
        {/* </div>
        </div> */}
        {/* <div className="col-md-4">
          <div className="form-group mb-3"> */}
        <label>State</label>
        <input type="text" name="state" className="form-control" />
        {/* </div>
        </div> */}
        {/* <div className="col-md-4">
          <div className="form-group mb-3"> */}
        <label>Zipcode</label>
        <input type="text" name="zipcode" className="form-control" />
        {/* </div>
        </div> */}
        {/* <div className="py-4"> */}
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
        {/* </div> */}
        {/* <div className="col-md-12">
          <div className="form-group text-end"> */}
        <button type="button" className="btn btn-primary">
          Checkout
        </button>
        {/* </div>
        </div>
      </div> */}
        <div className="cart">
          <div>
            {cart.map((item, idx) => {
              const numPrice = Number(item.numPrice);
              console.log(item);
              console.log(idx);
              return (
                <div key={idx}>
                  <p>{item.price}</p>
                  <p>{item.price * item.quantity}</p>
                </div>
              );
            })}
          </div>
          {/* <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                // const numPrice = parseFloat(item.price).toFixed(2)
                const numPrice = Number(item.price);
                // totalPrice += numPrice * item.quantity;
                console.log(typeof numPrice);
                console.log(item.price * 2);

                return (
                  <tr key={item.id}>
                    <td>{item.desc}</td>
                    {<td>{numPrice}</td>}
                    {<td>{item.quantity}</td>}
                    <td>{numPrice * item.quantity}</td>
                  </tr>
                );
              })}
              <tr>
                <td>Final Total:</td>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
