import React from 'react'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import styled from 'styled-components';
import Login from './components/login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Addproduct from './components/Addproduct';
import Orders from './components/Orders'
import Address from './components/Address';

const promise = loadStripe('pk_test_51PsAKtHCgoJJlBMbONcswbdnLlzWCx9epqjo1tadhK3UDX2oIb0CQnfCsmeX28LsP8tno6Tt0sSBtfrf0avJCDqP00sfcypBx5')
function App() {



  return (
    <Router>
    <Container>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path = "/signUp" element = {<SignUp/>}/>
        <Route path = "/address" element = {<Address/>}/>
        <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />

        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/orders" element={<Orders />} />
        </Routes>
    </Container>
    </Router>
  );
}
const Container = styled.div`
width: 100vw;
`;

export default App;
