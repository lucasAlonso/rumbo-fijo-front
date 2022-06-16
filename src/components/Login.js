import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";

function Login() {
  const MySwal = withReactContent(Swal);
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (email === "" || password === "") {
      MySwal.fire("Error", "Los campos no pueden estar vacios!", "error");
      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      MySwal.fire("Error", "email invalido!", "error");
      return;
    }

    axios
      .post("http://localhost:4000/api/users/login", { email, password })
      .then((res) => {
        MySwal.fire("Ingreso Correcto", "Login Correcto", "success");
        const token = res.data.token;
        sessionStorage.setItem("token", token);
      })
      .catch(function (error) {
        console.log(error.response.status); // 401
        if (error.response.status == 401) {
          MySwal.fire("Error", "pass invalido!", "error");
        }
        if (error.response.status == 500) {
          MySwal.fire("Error", "Usuario inexistente!", "error");
        } else {
          MySwal.fire("Error", "Error!", "error");
        }
      });
  };
  /// stylers
  const Container = styled.div`
    height: 100vh;
    width: 100wh;

    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const LoginContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 600px;
    max-width: 400px;
    font-family: "Rajdhani", sans-serif;
    border-radius: 10px;
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
    backdrop-filter: blur(10px);
  `;

  const Title = styled.div`
    text-align: center;
    font-family: "Secular One", sans-serif;
    padding: 1.25rem;
    width: 100%;
  `;
  const Form = styled.form`
    display: flex;
    text-align: center;
    flex-flow: column wrap;
    align-items: center;
    width: 100%;
  `;
  const Label = styled.label`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-flow: column wrap;
  `;

  const Input = styled.input`
    padding: 0.5rem;
    margin-bottom: 1.5rem;
  `;
  const Mark = styled.p`
    color: red;
    display: inline;
    width: 100%;
  `;

  const Button = styled.button.attrs()`
     {
      box-shadow: inset 0px 1px 3px 0px #91b8b3;
      background: linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
      background-color: #768d87;
      border-radius: 5px;
      border: 1px solid #566963;
      display: inline-block;
      cursor: pointer;
      color: #ffffff;
      font-family: Arial;
      font-size: 15px;
      font-weight: bold;
      padding: 11px 23px;
      text-decoration: none;
      text-shadow: 0px -1px 0px #2b665e;
    }
    &:hover {
      background: linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
      background-color: #6c7c7c;
    }
    &:active {
      position: relative;
      top: 1px;
    }
  `;

  return (
    <Container>
      <LoginContainer>
        <Title>
          <h2>Welcome back to RumboFijo</h2>
          the surveying administration app
        </Title>
        <Form onSubmit={submitHandler}>
          <Label>
            <span>
              <Mark>*</Mark>Correo Electronico
            </span>
            <br />
            <Input
              className="form-control"
              type="email"
              name="email"
              placeholder="Correo Electronico"
            />
          </Label>
          <br />
          <Label>
            <span>
              <Mark>*</Mark>Password
            </span>
            <br />
            <Input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
            />
          </Label>
          <br />
          <Button className="" type="submit">
            Ingresar
          </Button>
        </Form>
      </LoginContainer>
    </Container>
  );
}

export default Login;
