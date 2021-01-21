import React, { useState } from "react";
import { GetSecureCookie } from "api";
import { setCookie } from "helpers";

const RequestEmailForm = () => {
  const [email, setEmail] = useState("");

  return (
    <div
      style={{
        zIndex: 999,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        background: `rgba(0,0,0,0.2)`,
      }}
    >
      <form
        style={{ background: "white", borderRadius: 8, padding: 30, maxWidth: 300 }}
        onSubmit={async (e) => {
          e.preventDefault();
          let res = await GetSecureCookie(email);
          setCookie("secure-sensors-cookie", "cookie is set", 30);
          window.location.replace("/");
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 20 }}>Enter your email</div>
        <div>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => {
              e.persist();
              setEmail(e.target.value);
            }}
            style={{
              padding: 10,
              borderRadius: 11,
              outline: 0,
              border: "1px solid black",
              marginBottom: 10,
            }}
          ></input>
        </div>
        <button
          type="submit"
          style={{
            background: "#3b3be6",
            color: "white",
            cursor: "pointer",
            display: "inline-block",
            padding: "10px 40px",
            borderRadius: 11,
            outline: 0,
            border: "none",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RequestEmailForm;
