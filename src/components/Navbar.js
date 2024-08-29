import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import {useNavigate} from 'react-router-dom';

function Navbar() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch({
      type: "SET_USER",
      user: null,
    });

    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Container>
      <Inner>
        <Logo onClick={()=>navigate('/')}>
          <img src="./amazon_logo1.png" alt="Amazon Logo" />
        </Logo>
        <SearchBar onClick={()=>navigate('/addproduct')}>
          <input type='text' placeholder='Search Amazon' />
          <SearchIcon onClick={() => navigate('/addproduct')}>
            <img src="./searchIcon.png" alt="" />
          </SearchIcon>
        </SearchBar>
        <RightContainer>
          <NavButton onClick={user ? () => signOut() : () => navigate("/login")}>
            <p>Hello,</p>
            <p>{user ? user?.fullName : "Guest"}</p>
          </NavButton>
          <NavButton onClick={() => navigate("/orders")}>
            <p>Return</p>
            <p>& Orders</p>
          </NavButton>
          <BasketButton onClick={()=>navigate('/checkout')}>
            <img src="./basket-icon.png" alt="Basket Logo" />
            <p>{basket?.length}</p>
          </BasketButton>
        </RightContainer>
      </Inner>
      <MobileSearchBar onClick={()=>navigate('/checkout')}>
        <input type='text' placeholder='Search Amazon' />
        <SearchIcon onClick={()=>navigate('/addproduct')}>
          <img src="./searchIcon.png" alt="Search" />
        </SearchIcon>
      </MobileSearchBar>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  background-color: #131921;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 767px) {
    height: 120px;
    flex-direction: column;
  }
`;

const Inner = styled.div`
  width: 98%;
  align-items: center;
  display: flex;

  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  margin-left: 18px;

  img {
    width: 100px;
    margin-top: 10px;
  }
`;

const SearchBar = styled.div`
  height: 35px;
  flex: 1;
  margin: 0px 15px;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    height: 100%;
    flex: 1;
    border: none;
    border-radius: 5px 0px 0px 5px;
    padding: 0 10px;
  }

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const SearchIcon = styled.div`
  background-color: #febd69;
  height: 100%;
  width: 45px;
  border-radius: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 22px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  height: 100%;
  padding: 5px 15px;
`;

const NavButton = styled.div`
  color: #fff;
  padding: 5px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 15px;

  p {
    margin: 0;
    &:nth-child(1) {
      font-size: 12px;
    }

    &:nth-child(2) {
      font-size: 14px;
      font-weight: 650;
    }
  }
`;

const BasketButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 85%;

  img {
    width: 30px;
    margin-right: 10px;
  }

  p {
    color: #FFA500;
    font-weight: 600;
    font-size: 18px;
  }
`;

const MobileSearchBar = styled.div`
  height: 35px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;

    &::placeholder {
      padding-left: 10px;
    }
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

export default Navbar;
