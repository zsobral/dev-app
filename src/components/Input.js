import React from "react";

export const Input = ({ label, id, ...props }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </>
  );
};
