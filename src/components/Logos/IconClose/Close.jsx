import React from "react";

function Close({ props }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        width={props.width ? props.width : "20px"}
        height={props.height ? props.height : "20px"}
        fill={props.fillColor ? props.fillColor : "black"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </div>
  );
}

export default Close;
