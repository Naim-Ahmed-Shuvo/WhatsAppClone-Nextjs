import styled from "styled-components";
import Head from "next/head";
import { auth, provider } from "../firebase";

const login = () => {
    const signIn = () => {
      

        auth.signInWithPopup(provider)
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://i.pinimg.com/originals/42/98/c2/4298c2b5dc219063b79be38ca9b948b1.png" />
        <Button onClick={signIn}>Sign in with google</Button>
      </LoginContainer>
    </Container>
    // <div>Login</div>
  );
};

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const LoginContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;

const Button = styled.button``;
