import Button from "./Button/Button";
import Input from "./Input/Input";
import SearchIcon from "./SearchIcon/SearchIcon";
import "./Search.css";

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
  <div className="page__search search">
    <Input placeholder={placeholder} value={value} stateUpdate={stateUpdate} />
    <Button disabled={isButtonDisabled}>
      {" "}
      <SearchIcon />{" "}
    </Button>
  </div>
);

export default Search;
