import { useReposContext } from "components/RepoListProvider/RepoListProvider";
import { Meta } from "utils/meta";
import { observer } from "mobx-react-lite";
// @ts-ignore

import styles from "../Search.module.scss";

export type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  const reposContext = useReposContext();
  return (
    <button
      className={styles.search__button}
      onClick={onClick}
      disabled={reposContext.meta === Meta.loading}
    >
      {children}
    </button>
  );
};

export default observer(Button);
