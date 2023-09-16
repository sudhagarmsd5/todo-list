import React from "react";

const Button = ({ text, classNames, onClick }) => {
  return (
    <button type="button" className={classNames} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
