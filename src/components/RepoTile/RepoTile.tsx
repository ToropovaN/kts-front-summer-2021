import { getPrettyDate } from "@utils/getPrettyDate";
import { RepoItem } from "src/store/GitHubStore/types";

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
    <div className={styles.card} onClick={onClick}>
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
          <div>
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
