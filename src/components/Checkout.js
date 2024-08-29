import React from 'react';
import { useStateValue } from '../StateProvider';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; // Import the CSS file

function Checkout() {
    const [{ basket }, dispatch] = useStateValue();
    const navigate = useNavigate();

    // Function to remove an item from the basket
    const removeFromBasket = (e, id) => {
        e.preventDefault();

        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        });
    };

    // Function to calculate the total price of items in the basket
    const getBasketTotal = (basket) =>
        basket?.reduce((amount, item) => item.price + amount, 0);

    // Function to format the currency
    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD'
        }).format(amount);

    return (
        <div className="container">
            <Navbar />
            <div className="main">
                <div className="shopping-cart">
                    <h2>Shopping Cart</h2>
                    {basket.map((item) => (
                        <div className="product" key={item.id}>
                            <div className="image">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="description">
                                <h4>{item.title}</h4>
                                <p>{formatCurrency(item.price)}</p>
                                <button onClick={(e) => removeFromBasket(e, item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="subtotal">
                    <p>
                        Subtotal ({basket.length} items): <strong>{formatCurrency(getBasketTotal(basket))}</strong>
                    </p>
                    <small>
                        <input type="checkbox" />
                        <span>This order contains a gift.</span>
                    </small>
                    <button onClick={() => navigate('/address')}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
