import axios from "../axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useStateValue } from "../StateProvider";
import './Orders.css';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .post("/orders/get", { email: user.email })
      .then((res) => setOrders(res.data));
  }, [user.email]); // Add user.email as a dependency

  return (
    <div className="container">
      <Navbar />
      <div className="main">
        <div className="order-container">
          <h2>Your Orders</h2>
          {orders.map((order) => (
            <div className="order-detail" key={order.id}>
              <div className="address-component">
                <h4>Shipping Address</h4>
                <div>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.flat}</p>
                  <p>{order.address.area}</p>
                  <p>
                    {order.address.city} {order.address.state}
                  </p>
                  <p>Phone : {order.address.phone}</p>
                </div>
              </div>
              <div className="order-basket">
                <h4>Order</h4>
                <p>
                  Subtotal : ₹ <span>{order.price}</span>
                </p>
                {order.products.map((product) => (
                  <div className="product" key={product.id}>
                    <div className="image">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="description">
                      <h4>{product.title}</h4>
                      <p>$ {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
