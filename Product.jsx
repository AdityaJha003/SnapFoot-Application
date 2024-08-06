
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { publicRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { addProduct,updateProductQuantity  } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";
const KEY =process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  background-color: #e9e8e4;
  
`;

const ImgContainer = styled.div`

  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
 
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  
`;

const Title = styled.h1`
margin-top:30%;
  font-weight: 200;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
  
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  border-radius: 1.5rem; 
  padding: 5px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const FilterSizeOption = styled.option`
border-radius: 1.5rem; 
font-family: "Titillium Web", sans-serif;
font-weight: 700;
font-style: normal;`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
  
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Button = styled.button`
border-radius: 1.5rem; 
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location=useLocation();
  const id = location.pathname.split("/")[2];
  const [product,setProduct]= useState({});
  const[quantity,setQuantity]=useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product._id) {
      dispatch(updateProductQuantity({ id: product._id, quantity }));
    }
  }, [quantity, dispatch, product._id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      if (quantity > 1) setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  };

  return (
    <Container>
      <Navbar />

      <Wrapper>
        <ImgContainer>
          <Image src={product.url} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Link to = 'https://try.deepar.ai/foot/nike-air-jordan-miles-morales'><button>Virtual try-on</button></Link><br/>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="pink" />
              <FilterColor color="blue" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize  onChange={(e) => setSize(e.target.value)}>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <button onClick={()=>handleQuantity("dec")}>➖</button>
              <Amount>{quantity}</Amount>
              <button onClick={()=>handleQuantity("inc")}>➕</button>
            </AmountContainer>
            <Link to={"/cart"} >
            <Button onClick={handleClick} >ADD TO CART</Button>
            </Link>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;