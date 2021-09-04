import Button from "./Button/Button";
import Input, { inputProps } from "./Input/Input";
import SearchIcon from "./SearchIcon/SearchIcon";
import "./Search.css";

type SearchProps = {
  inputProps: inputProps;
};

const Search: React.FC<SearchProps> = ({ inputProps }) => (
  <div className="page__search search">
    <Input
      placeholder={inputProps.placeholder}
      stateUpdate={inputProps.stateUpdate}
    />
    <Button>
      {" "}
      <SearchIcon />{" "}
    </Button>
  </div>
);

export default Search;
