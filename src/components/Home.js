import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from './Navbar';
import Card from "./Card";
import axios from "../axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from API
        const response = await axios.get("/products/get");

        // Assuming the response structure is { data: [...] }
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Navbar />
      <Banner>
        <img src="./banner.jpg" alt="Banner" />
        <img src="./mobile_banner.jpg" alt="Mobile Banner" />
      </Banner>

      <Main>
        {/* Ensure products is an array */}
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product._id} // Adding key for list items
              id={product._id}
              image={product.imageURL}
              price={product.price}
              rating={product.rating}
              title={product.title}
            />
          ))
        ) : (
          <p>No products available</p>
        )}

        <Card
          id={"1"}
          image={"https://m.media-amazon.com/images/I/51fM0CKG+HL._AC_SX342_SY445_.jpg"}
          price={510}
          rating={4.5}
          title={"Playstation 5 console"}
        />
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: rgb(234, 237, 237);
  max-width: 1600px;
  margin: auto;
  height: fit-content;
`;

const Banner = styled.div`
  width: 100%;
  img {
    width: 100%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 2),
      rgba(0, 0, 0, 0.95),
      rgba(0, 0, 0, 0.85),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0)
    );

    &:nth-child(2) {
      display: none;
    }

    @media only screen and (max-width: 767px) {
      &:nth-child(1) {
        display: none;
      }

      &:nth-child(2) {
        display: block;
        -webkit-mask-image: none;
      }
    }
  }
`;

const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  width: 100%;

  grid-auto-rows: 420px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 20px;

  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }

  /* Tablets */
  @media only screen and (min-width: 767px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }

  @media only screen and (min-width: 767px) {
    margin-top: -130px;
    padding: 10px 0px;
  }
`;

export default Home;
