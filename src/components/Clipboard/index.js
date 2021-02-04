import ClipboardAPI from "clipboard";
import React, { useEffect, useRef, useState } from "react";
import { Flipper, Flipped, spring } from "react-flip-toolkit";
import styled from "styled-components";
import ShareIcon from "images/Share";

const Button = styled.div`
  height: 33px;
  width: 48px;
  border-radius: 5px;
  transition: background 0.2s;
  background: ${(props) => (!props.copied ? "white" : props.theme.main)};
  border: 1px solid ${(props) => props.theme.main};
  cursor: pointer;
  margin-bottom: 5px;
  overflow: hidden;
`;

const ButtonInnerContainer = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 13px;
  font-weight: 600;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const onExit = (el, index, removeElement) => {
  spring({
    onUpdate: (val) => {
      el.style.transform = `translateY(${val * 100}%)`;
    },
    onComplete: removeElement,
  });
};

const onAppear = (el) => {
  el.style.opacity = 1;
  spring({
    onUpdate: (val) => {
      el.style.transform = `translateY(${((val <= 1 ? val : 1) - 1) * 100}%)`;
    },
  });
};
export function Clipboard({ urlToCopy, onCopy = () => {}, theme }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(
    function () {
      const clip = new ClipboardAPI(ref.current, {
        text() {
          return urlToCopy;
        },
      });

      return () => clip.destroy();
    },
    [urlToCopy]
  );

  return (
    <div ref={ref} onClick={(event) => event.stopPropagation()}>
      <Flipper
        flipKey={copied}
        handleEnterUpdateDelete={({ animateExitingElements, animateEnteringElements }) => {
          animateEnteringElements();
          animateExitingElements();
        }}
      >
        <Button
          copied={copied}
          onClick={() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1000);
          }}
        >
          <ButtonInnerContainer>
            {copied && (
              <Flipped
                flipId={`clipboard-confirm-${Date.now()}`}
                onAppear={onAppear}
                onExit={onExit}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    color: theme.secondary,
                  }}
                >
                  Link Copied!
                </div>
              </Flipped>
            )}
            {!copied && (
              <Flipped flipId={`clipboard-btn-${Date.now()}`} onAppear={onAppear} onExit={onExit}>
                <div style={{ display: "flex" }}>
                  <ShareIcon color={theme.main}></ShareIcon>
                </div>
              </Flipped>
            )}
          </ButtonInnerContainer>
        </Button>
      </Flipper>
    </div>
  );
}
