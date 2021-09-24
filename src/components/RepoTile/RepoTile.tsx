import { RepoItemModel } from "@store/models/GitHub";
import { observer } from "mobx-react-lite";

import Avatar from "./Avatar/Avatar";
// @ts-ignore
import styles from "./RepoTile.module.scss";
import StarIcon from "./StarIcon/StarIcon";

type repoTileProps = {
  item: RepoItemModel;
  onClick: () => void;
};

const RepoTile: React.FC<repoTileProps> = ({ item, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <Avatar
        avatar_url={item.owner.avatarUrl ? item.owner.avatarUrl : ""}
        name={item.name[0]}
      />
      <div className={styles.card__content}>
        <div className={styles.card__title}>{item.name}</div>
        <a href={item.owner.htmlUrl} className={styles.card__author}>
          {item.owner.login}
        </a>
        <div className={styles.card__info}>
          <div>
            <StarIcon /> {item.stargazersCount}
          </div>
          <div className={styles.card__data}>Updated {item.updatedAt}</div>
        </div>
      </div>
    </div>
  );
};

export default observer(RepoTile);
