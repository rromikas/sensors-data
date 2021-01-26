import React, { useState } from "react";
import { GetSecureCookie } from "api";
import { setCookie as storeCookieInBrowser } from "helpers";
import styled from "styled-components";
import { Flipped, spring } from "react-flip-toolkit";

const EmailInput = styled.input`
  color: ${(props) => props.theme.main};
  font-size: 38px;
  background: transparent;
  outline: 0;
  display: block;
  border: none;
  margin-bottom: 75px;
  padding: 0;
  width: 100%;
  text-align: center;
  ::placeholder {
    text-align: center;
  }
`;

const Button = styled.button`
  max-width: 270px;
  width: 100%;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  background: ${(props) => props.theme.main};
  color: ${(props) => props.theme.secondary};
  cursor: pointer;
  border-radius: 34px;
  outline: 0;
  border: none;
  transition: background 0.2s;
  &:hover {
    background: #052833;
  }
  &:active {
    background: #041b23;
  }
`;

const FormContainer = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  background: white;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 35px;
  font-size: 38px;
  line-height: 40px;
  text-align: center;
  max-width: 350px;
  color: ${(props) => props.theme.main};
`;

const RequestEmailForm = ({ setCookie }) => {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    GetSecureCookie(email);
    storeCookieInBrowser("secure-sensors-cookie", email, 30);
    setCookie(email);
  };

  return (
    <Flipped
      flipId="emailForm"
      onExit={(el, index, removeElement) => {
        spring({
          onUpdate: (val) => {
            el.style.opacity = 1 - val;
          },
          onComplete: removeElement,
        });
      }}
    >
      <FormContainer>
        <form style={{ maxWidth: 400, textAlign: "center", padding: 20 }} onSubmit={onSubmit}>
          <Title>Hello,</Title>
          <EmailInput
            placeholder="Enter your email"
            required
            type="email"
            value={email}
            onChange={(e) => {
              e.persist();
              setEmail(e.target.value);
            }}
          ></EmailInput>
          <Button type="submit">Enter app</Button>
        </form>
      </FormContainer>
    </Flipped>
  );
};

export default RequestEmailForm;
