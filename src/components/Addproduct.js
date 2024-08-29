import React, { useState } from 'react';
import axios from '../axios';
import './Addproduct.css'; // Import the CSS file

function Addproduct() {
    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);

    const addProduct = (e) => {
        e.preventDefault();

        axios
        .post("/products/add", { title, imageURL, price, rating })
        .then(() => {
          setTitle("");
          setImageURL("");
          setPrice(0);
          setRating(0);
        })
        .catch((error) => alert(error.message));
    };

    return (
        <div className="container">
            <div className="logo">
                <img src="./amazon_logo.png" alt="Amazon Logo" />
            </div>

            <form className="form-container" onSubmit={addProduct}>
                <h3>Add Products</h3>
                <div className="input-container">
                    <p>Title</p>
                    <input
                        type='text'
                        placeholder='Enter the Product Name'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="input-container">
                    <p>ImageUrl</p>
                    <input
                        type='text'
                        placeholder='Enter the Image URL'
                        onChange={(e) => setImageURL(e.target.value)}
                        value={imageURL}
                    />
                </div>
                <div className="input-container">
                    <p>Price</p>
                    <input
                        type='text'
                        placeholder='Enter the Products Price'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>
                <div className="input-container">
                    <p>Rating</p>
                    <input
                        type='text'
                        placeholder='Rating out of 5'
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                    />
                </div>
                <button className="button" type='submit'>Add Product</button>
            </form>
        </div>
    );
}

export default Addproduct;
