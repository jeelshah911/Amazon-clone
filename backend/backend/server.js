const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Products = require('./Products');
const stripe = require('stripe')('sk_test_51PsAKtHCgoJJlBMbMN2RRsL1neAVMAEJutgTPUWTMubUC7xLCt9S8eLJaWz3iu0mshSVhe5plInLuT2fLO25PkLS00GHS62WGJ');
const Orders = require("./Orders");
const Users = require("./Users");
const bcrypt = require("bcryptjs");
const app = express();

const port = process.env.PORT || 8000;
console.log('Starting server...');

require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });  // Removed useCreateIndex
const connection = mongoose.connection;

// API Routes
app.get("/", (req, res) => res.status(200).send("Home Page"));

// API to add products
app.post("/products/add", async (req, res) => {
    const productDetail = req.body;

    console.log("Product Detail >>>>", productDetail);

    try {
        const data = await Products.create(productDetail);
        res.status(201).send(data);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).send({ error: err.message });
    }
});

app.get("/products/get", async (req, res) => {
    try {
        const data = await Products.find();
        res.status(200).send(data);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send({ error: err.message });
    }
});

// API for SIGNUP
app.post("/auth/signup", async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        const encrypt_password = await bcrypt.hash(password, 10);

        const userDetail = {
          email: email,
          password: encrypt_password,
          fullName: fullName,
        };

        const user_exist = await Users.findOne({ email: email });

        if (user_exist) {
          res.send({ message: "The Email is already in use !" });
        } else {
          const result = await Users.create(userDetail);
          res.send({ message: "User Created Successfully" });
        }
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).send({ error: err.message });
    }
});

// API for LOGIN
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDetail = await Users.findOne({ email: email });

        if (userDetail) {
          if (await bcrypt.compare(password, userDetail.password)) {
            res.send(userDetail);
          } else {
            res.send({ error: "Invalid Password" });
          }
        } else {
          res.send({ error: "User does not exist" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ error: err.message });
    }
});

// API for payment
app.post("/payment/create", async (req, res) => {
    const total = req.body.amount;
    console.log("Payment Request received for this amount (CAD):", total);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100, // Convert amount to cents
            currency: 'cad',
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: error.message });
    }
});

// API to add orders
app.post("/orders/add", async (req, res) => {
    const { basket, price, email, address } = req.body;

    // Log the received data
    console.log('Received order data:', { basket, price, email, address });

    const orderDetail = {
        products: basket,
        price: price,
        address: address,
        email: email,
    };

    try {
        const result = await Orders.create(orderDetail);
        console.log("Order added to database >> ", result);
        res.status(201).send(result);
    } catch (err) {
        console.error('Error adding order:', err);
        res.status(500).send({ error: err.message });
    }
});

// API to get orders
app.post("/orders/get", async (req, res) => {
    const email = req.body.email;

    try {
        const userOrders = await Orders.find({ email: email });
        res.status(200).send(userOrders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send({ error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
