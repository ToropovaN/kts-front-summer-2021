// @ts-ignore
import appStyles from "../../App/App.module.scss";
import Button from "./Button/Button";
import Input from "./Input/Input";
// @ts-ignore
import styles from "./Search.module.scss";
import SearchIcon from "./SearchIcon/SearchIcon";

export type SearchProps = {
  placeholder: string;
  value: string;
  stateUpdate: (value: string) => void;
  isButtonDisabled?: boolean;
};

const Search: React.FC<SearchProps> = ({
  placeholder,
  stateUpdate,
  value,
  isButtonDisabled = false,
}) => (
  <div className={`${styles.search} ${appStyles.page__search}`}>
    <Input placeholder={placeholder} value={value} stateUpdate={stateUpdate} />
    <Button disabled={isButtonDisabled}>
      {" "}
      <SearchIcon />{" "}
    </Button>
  </div>
);

export default Search;
