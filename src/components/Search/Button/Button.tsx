export type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  disabled: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button className="search__button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
