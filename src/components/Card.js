import React from "react";
import "./Card.css"; // Import the CSS file
import Rating from '@mui/material/Rating';
import { useStateValue } from "../StateProvider";

function Card({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  console.log("basket >>>>", basket);

  const addToBasket = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        price,
        image,
        rating,
      },
    });
  };

  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt="" />
      </div>
      <div className="card__description">
        <h5>{title}</h5>
        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
        <p>$ {price}</p>
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Card;
