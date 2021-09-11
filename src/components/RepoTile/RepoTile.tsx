import { RepoItem } from "src/store/GitHubStore/types";

// @ts-ignore
import appStyles from "../../App/App.module.scss";
import { getPrettyDate } from "../../utils";
import Avatar from "./Avatar/Avatar";
// @ts-ignore
import styles from "./RepoTile.module.scss";
import StarIcon from "./StarIcon/StarIcon";

type repoTileProps = {
  item: RepoItem;
  onClick: () => void;
};

const RepoTile: React.FC<repoTileProps> = ({ item, onClick }) => {
  return (
    <div className={`${styles.card} ${appStyles.list__card}`} onClick={onClick}>
      <Avatar
        avatar_url={item.owner.avatar_url ? item.owner.avatar_url : ""}
        name={item.name[0]}
      />
      <div className={styles.card__content}>
        <div className={styles.card__title}>{item.name}</div>
        <a href={item.owner.html_url} className={styles.card__author}>
          {item.owner.login}
        </a>
        <div className={styles.card__info}>
          <div className={styles.card__stars}>
            <StarIcon /> {item.stargazers_count}
          </div>
          <div className={styles.card__data}>
            Updated {getPrettyDate(item.updated_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoTile;
