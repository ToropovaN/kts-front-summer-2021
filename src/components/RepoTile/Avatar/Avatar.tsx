// @ts-ignore
import styles from "../RepoTile.module.scss";

type avatarProps = {
  name: string;
  avatar_url?: string;
};

const Avatar: React.FC<avatarProps> = ({ name, avatar_url }) => {
  return (
    <div className={styles.card__avatar}>
      {avatar_url && (
        <img className={styles.card__img} src={avatar_url} alt={name} />
      )}
      {!avatar_url && <div className={styles.card__letter}>{name}</div>}
    </div>
  );
};

export default Avatar;
