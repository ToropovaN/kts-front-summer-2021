export type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className="search__button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
