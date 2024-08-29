import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from '../axios';
import { useStateValue } from "../StateProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
import './Payment.css'; // Import the CSS file

function Payment() {
  const [{ address, basket, user }, dispatch] = useStateValue();
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientSecret = async () => {
        try {
            const data = await axios.post("/payment/create", {
                amount: getBasketTotal(basket),
            });
            setClientSecret(data.data.clientSecret);
        } catch (error) {
            console.error("Error fetching client secret:", error);
        }
    };
    fetchClientSecret();
  }, [basket]);

  const confirmPayment = async (e) => {
    e.preventDefault();
    await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    .then((result) => {
      axios.post("/orders/add", {
        basket: basket,
        price: getBasketTotal(basket),
        email: user?.email,
        address: address,
      });
      dispatch({ type: "EMPTY_BASKET" });
      navigate("/");
    })
    .catch((err) => console.warn(err));
  };

  const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);

  const formatCurrency = (amount) => 
    new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);

  return (
    <div className="container">
      <Navbar />
      <div className="main">
        <div className="review-container">
          <h2>Review Your Order</h2>
          <div className="address-container">
            <h5>Shipping Address</h5>
            <div>
              <p>{address?.fullName}</p>
              <p>{address?.address}</p>
              <p>{address?.apt}</p>
              <p>{address?.postalcode}</p>
              <p>{address?.city}, {address?.province}</p>
              <p>Phone: {address?.phone}</p>
            </div>
          </div>

          <div className="payment-container">
            <h5>Payment Method</h5>
            <div>
              <p>Card Details</p>
              <CardElement />
            </div>
          </div>

          <div className="order-container">
            <h5>Your Order</h5>
            <div>
              {basket?.map((product) => (
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
        </div>
        <div className="subtotal">
          <p>
            Subtotal({basket.length} items): <strong>{formatCurrency(getBasketTotal(basket))}</strong>
          </p>
          <button onClick={confirmPayment}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
