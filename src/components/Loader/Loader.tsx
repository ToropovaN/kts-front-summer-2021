import styles from "./Loader.module.scss";

const defaultColor = "#7e7e7e"
const Loader = ({ color = defaultColor }) => {
  return (
    <div className={styles.loader}>
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 50 50"
        enableBackground="new 0 0 0 0">
        <circle fill={color} stroke="none" cx="5" cy="20" r="5">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"/>
        </circle>
        <circle fill={color} stroke="none" cx="25" cy="20" r="5">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"/>
            </circle>
        <circle fill={color} stroke="none" cx="45" cy="20" r="5">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"/>
        </circle>
        </svg>
        </div>
);
}
export default Loader;