import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e9e8e4;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #e9e8e4;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Omi = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;




const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          <br/>
          <Omi>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <br/>
          <br/>
          <Link to="/register">CREATE A NEW ACCOUNT</Link>
          </Omi>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;