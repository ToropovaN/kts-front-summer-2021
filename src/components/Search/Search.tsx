import Button from "./Button/Button";
import Input from "./Input/Input";
// @ts-ignore
import styles from "./Search.module.scss";
import SearchIcon from "./SearchIcon/SearchIcon";

export type SearchProps = {
  placeholder: string;
  changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({ placeholder, changeValue }) => {
  return (
    <div className={styles.search}>
      <Input placeholder={placeholder} changeValue={changeValue} />
      <Button>
        {" "}
        <SearchIcon />{" "}
      </Button>
    </div>
  );
};

export default Search;
