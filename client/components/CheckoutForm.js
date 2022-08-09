import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h3>Checkout</h3>
        </div>
      </div>
      <div className="py-4">
        {/* <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card"> */}
        {/* <div className="card-header"> */}
        <h4>Basic Information</h4>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label>First Name</label>
              <input type="text" name="firstName" className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label>Last Name</label>
              <input type="text" name="lastName" className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label>Email Address</label>
              <input type="text" name="email" className="form-control" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-3">
              <label>Shipping Address</label>
              <textarea rows="3" className="form-control"></textarea>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group mb-3">
              <label>City</label>
              <input type="text" name="city" className="form-control" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group mb-3">
              <label>State</label>
              <input type="text" name="state" className="form-control" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group mb-3">
              <label>Zipcode</label>
              <input type="text" name="zipcode" className="form-control" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group text-end">
              <button type="button" className="btn btn-primary">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </div>
  );
};

export default Checkout;
