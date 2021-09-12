import { useReposContext } from "../../../App/App";
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
      disabled={reposContext.isLoading}
    >
      {children}
    </button>
  );
};

export default Button;
