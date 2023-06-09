import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.squarespace-cdn.com/content/v1/6123ebd79384bb18e8325908/dd8eea1e-3f01-45e5-a9b8-ba1172f00930/Portafolio1.jpg?format=500w")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: blue;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Links = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {

  return (
    <Container>
      <Wrapper>
        <Title>Iniciar Sesión</Title>
        <Form>
          <Input
            placeholder="Nombre de usuario"
          />
          <Input
            placeholder="contraseña"
            type="password"
          />
          <Button>
            Acceder
          </Button>
          <Link to ="/register">Crea una cuenta nueva</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
