
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { updateProductQuantity, removeProduct   } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  background-color: #e9e8e4;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;

`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const TopTexts = styled.div`
font-family: "Titillium Web", sans-serif;
font-weight: 700;
font-style: normal;
 
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
  

`;

const Info = styled.div`
  flex: 3;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;

`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  button {
    margin: 0 5px; 
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);



  const handleQuantity = (id, type) => {
    const product = cart.products.find((p) => p._id === id);
    if (product) {
      if (type === "dec" && product.quantity > 1) {
        dispatch(updateProductQuantity({ id, quantity: product.quantity - 1 }));
      } else if (type === "inc") {
        dispatch(updateProductQuantity({ id, quantity: product.quantity + 1 }));
      }
    }
  };

  const handleDelete = (id) => {
    dispatch(removeProduct({ id }));
  };


  return (
    <Container>
      <Navbar />
  
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/products/women">
          <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ButtonContainer>
                  <button onClick={() => handleQuantity(product._id, "inc")}>➕</button>
                  <ProductAmount>{product.quantity}</ProductAmount>
                    <button onClick={() => handleQuantity(product._id, "dec")}>➖</button>
                    <button onClick={() => handleDelete(product._id)}>❌</button> 
                    </ButtonContainer>
                  </ProductAmountContainer>
                  <ProductPrice>
                  $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="SnapFoot"
              image="https://i.postimg.cc/sfTXmw6H/removal-ai-efd5ee34-3e1a-4242-8788-902cb0bd2a9b-yalamber-limbu-ds2zidnxwgk-unsplash.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;