// @ts-ignore
import indexStyles from "../../index.module.scss";
import Button from "./Button/Button";
import Input from "./Input/Input";
// @ts-ignore
import styles from "./Search.module.scss";
import SearchIcon from "./SearchIcon/SearchIcon";

export type SearchProps = {
  placeholder: string;
};

const Search: React.FC<SearchProps> = ({ placeholder }) => {
  return (
    <div className={`${styles.search} ${indexStyles.page__search}`}>
      <Input placeholder={placeholder} />
      <Button>
        {" "}
        <SearchIcon />{" "}
      </Button>
    </div>
  );
};

export default Search;
