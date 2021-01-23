import React, { useState } from "react";
import { GetSecureCookie } from "api";
import { setCookie } from "helpers";
import styled, { withTheme } from "styled-components";
import { Flipper, Flipped, spring } from "react-flip-toolkit";

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

const FixedContainer = styled.div`
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
  color: #073b4c;
`;

const RequestEmailForm = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    GetSecureCookie(email);
    setCookie("secure-sensors-cookie", email, 30);
    setLinkSent(true);
  };

  return (
    <Flipper
      flipKey={linkSent}
      handleEnterUpdateDelete={({
        animateExitingElements,
        animateEnteringElements,
        hideEnteringElements,
      }) => {
        hideEnteringElements();
        animateExitingElements();
        animateEnteringElements();
      }}
    >
      <FixedContainer>
        {!linkSent ? (
          <Flipped
            flipId="email-form"
            onExit={(el, i, removeElement) => {
              spring({
                onComplete: removeElement,
                onUpdate: (val) => {
                  el.style.transform = `translateX(${-val * 100}%)`;
                  el.style.opacity = 1 - val;
                },
              });
            }}
          >
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
              <Button type="submit">Get Link</Button>
            </form>
          </Flipped>
        ) : (
          <Flipped
            flipId="confirmation"
            onAppear={(el, i) => {
              spring({
                delay: 500,
                onUpdate: (val) => {
                  el.style.transform = `translateX(${(1 - val) * 100}%)`;
                  el.style.opacity = val;
                },
              });
            }}
          >
            <div style={{ padding: 20, color: theme.main, textAlign: "center" }}>
              <Title>Your link has been sent to</Title>
              <div style={{ textAlign: "center", fontSize: 35 }}>{email}</div>
              <a href={`/app/${Date.now()}`}>Overview app</a>
            </div>
          </Flipped>
        )}
      </FixedContainer>
    </Flipper>
  );
};

export default withTheme(RequestEmailForm);
