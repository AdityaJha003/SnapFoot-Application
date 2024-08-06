
import styled from "styled-components";
// import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  background-color: #e9e8e4;

`;

const Left = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 0.5;
  padding: 20px;

`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 30%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 0.5;
  padding: 20px;


`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 30%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>SnapFoot</Logo>
        <Desc>
         
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
           
          </SocialIcon>
          <SocialIcon color="E4405F">
          
          </SocialIcon>
          <SocialIcon color="55ACEE">
           
          </SocialIcon>
          <SocialIcon color="E60023">
            
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          {/* <Room style={{marginRight:"10px"}}/> 622 Ashok vihar , INDIA 122017 */}
        </ContactItem>
        <ContactItem>
          {/* <Phone style={{marginRight:"10px"}}/> +91 9818326480 */}
        </ContactItem>
        <ContactItem>
          {/* <MailOutline style={{marginRight:"10px"}} /> contact@midnight.dev */}
        </ContactItem>
        
      </Right>
    </Container>
  );
};

export default Footer;