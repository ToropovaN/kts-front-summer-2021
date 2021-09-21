import React from "react";

import { useReposContext } from "@components/RepoListProvider/RepoListProvider";

import { SearchProps } from "../Search";
// @ts-ignore
import styles from "../Search.module.scss";

const Input: React.FC<SearchProps> = ({ placeholder }) => {
  const reposContext = useReposContext();
  const [inputValue, setInputValue] = React.useState(reposContext.value);

  return (
    <input
      type="text"
      className={styles.search__input}
      placeholder={placeholder}
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
        if (event.target.value !== reposContext.value)
          reposContext.setValue(event.target.value);
      }}
    />
  );
};

export default Input;
