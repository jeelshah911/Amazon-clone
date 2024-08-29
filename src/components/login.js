import React , {useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useStateValue } from "../StateProvider";

  function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [{}, dispatch] = useStateValue();

    const login = (e) => {
      e.preventDefault();

      axios
        .post("/auth/login", { email, password })
        .then((res) => {
          if (!res.data.error) {
            dispatch({
              type: "SET_USER",
              user: res.data,
            });

            localStorage.setItem("user", JSON.stringify(res.data));

            navigate("/");
          } else if (res.data.error) {
            alert(res.data.error);
          }
        })
        .catch((err) => console.warn(err));
    };
  return (



    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="./amazon_logo.png" alt="Amazon Logo" />
      </Logo>

      <FormContainer>
        <h3>Sign in</h3>
        <InputContainer>
          <p>Email</p>
          <input type='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}
            value={email}  />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}
            value={password} />
        </InputContainer>
        <Button type="submit" onClick={login}>Login</Button>
        <InFoText>
        By continuing you agree to Amazon's <span>Conditions of Use</span> and <span>
        privacy Notice</span>.
      </InFoText>
      </FormContainer>
      <NewToAmazonText>New to Amazon?</NewToAmazonText>
      <SignUpButton onClick={() => navigate("/signup")}>Create a Amazon Account</SignUpButton>

    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 450px; /* Fixed syntax */
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  width: 120px;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 350px;
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Shadow effect */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-items: center;
  height:450px;
  padding: 20px;

  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    text-align:left;
    margin-bottom: 20px; /* Increased margin for spacing */
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px; /* Space between input fields */

  p {
    font-size: 17px; /* Adjusted font size */
    font-weight: 600;
    margin-bottom: 5px;
    text-align: left; /* Ensure text is aligned to the left */
  }

  input {
    width: 100%; /* Full width of the container */
    height: 40px; /* Increased height for better usability */
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
    box-sizing: border-box; /* Ensure padding is included in the width */
    font-size: 16px;
    transition: border-color 0.3s;

    &:hover {
      border-color: orange;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: none;
  background-color: #f0c14b;
  color: #111;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 400;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e3a814;
  }
`;

const InFoText = styled.p`
    font-size:13px;
    width:100%;
    word-wrap: normal;
    margin-top: 20px;

    span{
    color:#426bc0;

    }
    `;

const NewToAmazonText = styled.p`
    color: #333; /* Light black color */
    font-size: 14px;
    margin-bottom: none; /* Reduced margin for less space below */
    position: relative;
    padding-bottom: 5px;
  `;

const SignUpButton = styled.button`
    width: 25%; /* Full width of the container */
    height: 40px; /* Increased height for better usability */
    margin-top: none;
    padding: 10px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;

`;



export default Login;
