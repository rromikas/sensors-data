import React from "react";

function Icon({ color = "black" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25.042"
      height="16.694"
      viewBox="0 0 25.042 16.694"
    >
      <path
        fill={color}
        d="M7.044 23.695a1.042 1.042 0 01-.739-1.78l8.348-8.348a1.043 1.043 0 011.317-.131l5.466 3.644 7.749-9.688a1.044 1.044 0 111.63 1.3l-8.349 10.439a1.042 1.042 0 01-1.394.217l-5.549-3.7-7.743 7.744a1.046 1.046 0 01-.737.3z"
        data-name="Path 6"
        transform="translate(-6 -7.001)"
      ></path>
    </svg>
  );
}

export default Icon;
