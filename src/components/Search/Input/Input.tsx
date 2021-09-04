import React from "react";

export type inputProps = {
  placeholder: string;
  stateUpdate: any; //?
};

const Input: React.FC<inputProps> = ({ placeholder, stateUpdate }) => {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <input
      type="text"
      className="search__input"
      placeholder={placeholder}
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
        stateUpdate(event.target.value);
      }}
    />
  );
};

export default Input;
