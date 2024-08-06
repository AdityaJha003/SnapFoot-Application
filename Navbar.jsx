
import React from "react";
import styled from "styled-components";
// import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
background-color: #e9e8e4;
  padding:10px;
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  

`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 15px;
  cursor: pointer;
  font-weight: bold;

  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;

`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;

`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
flex: 1;
display: flex;
margin-left: 865px;


`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

    font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;

`;

const Navbar = () => {

  const quantity = useSelector(state=>state.cart.quantity)
  return (
    
    <Container>
      <Wrapper>
        <Left>
        <Link to="/">
          <Language>SnapFoot</Language>
        </Link>

        </Left>
        <Center>
          
          <Logo>
          <SearchContainer>
            <Input placeholder="🔍 Search" />
          </SearchContainer>
          </Logo>
        </Center>
        <Right>
          <MenuItem>💗 MY FAVOURITES</MenuItem>
          <Link to="/login">
          <MenuItem>🔖SIGN IN</MenuItem>
          </Link>
          <Link to="/cart">
          <MenuItem>🛒 CART
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
    
  );
};

export default Navbar;