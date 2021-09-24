import { useReposContext } from "@components/RepoListProvider/RepoListProvider";
import { observer } from "mobx-react-lite";

import { SearchProps } from "../Search";
// @ts-ignore
import styles from "../Search.module.scss";

const Input: React.FC<SearchProps> = ({ placeholder }) => {
  const reposContext = useReposContext();
  return (
    <input
      type="text"
      className={styles.search__input}
      placeholder={placeholder}
      value={reposContext.value}
      onChange={(event) => {
        if (reposContext.value !== event.target.value) {
          reposContext.setValue(event.target.value);
        }
      }}
    />
  );
};

export default observer(Input);
