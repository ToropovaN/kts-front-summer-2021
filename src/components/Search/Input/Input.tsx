import React from "react";

import { SearchProps } from "../Search";
// @ts-ignore
import styles from "../Search.module.scss";

const Input: React.FC<SearchProps> = ({ placeholder, stateUpdate, value }) => {
  const [inputValue, setInputValue] = React.useState(value);

  return (
    <input
      type="text"
      className={styles.search__input}
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
