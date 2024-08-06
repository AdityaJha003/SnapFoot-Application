import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; 

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
  width: 40%;
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
  flex-wrap: wrap;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
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
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-style: normal;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreateClick = () => {
    const { name, lastName, username, email, password, confirmPassword } = formData;

    if (name && lastName && username && email && password && confirmPassword) {
      
      navigate('/login');
    } else {
      
      alert('Please fill all the fields.');
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input 
            name="name" 
            placeholder="name" 
            value={formData.name}
            onChange={handleChange}
          />
          <Input 
            name="lastName" 
            placeholder="last name" 
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input 
            name="username" 
            placeholder="username" 
            value={formData.username}
            onChange={handleChange}
          />
          <Input 
            name="email" 
            placeholder="email" 
            value={formData.email}
            onChange={handleChange}
          />
          <Input 
            name="password" 
            type="password"
            placeholder="password" 
            value={formData.password}
            onChange={handleChange}
          />
          <Input 
            name="confirmPassword" 
            type="password"
            placeholder="confirm password" 
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          
          <Button type="button" onClick={handleCreateClick}>CREATE</Button>
         
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;