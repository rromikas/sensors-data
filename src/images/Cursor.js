import React from "react";

function Icon({ color = "black" }) {
  console.log("coolor", color);
  return (
    <svg
      width="22px"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      fill={color}
      enableBackground="new 0 0 477.883 477.883"
      version="1.1"
      viewBox="0 0 477.883 477.883"
      xmlSpace="preserve"
    >
      <path d="M468.456 1.808a17.063 17.063 0 00-15.289 0L9.433 223.675c-8.429 4.219-11.842 14.471-7.624 22.9a17.065 17.065 0 0012.197 9.151l176.111 32.034 32.034 176.111a17.066 17.066 0 0014.353 13.841c.803.116 1.613.173 2.423.171a17.067 17.067 0 0015.275-9.438L476.07 24.711c4.222-8.427.813-18.681-7.614-22.903z"></path>
    </svg>
  );
}

export default Icon;
