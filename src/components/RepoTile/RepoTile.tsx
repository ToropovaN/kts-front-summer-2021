import { RepoItem } from "src/store/GitHubStore/types";

import Avatar from "./Avatar/Avatar";
import StarIcon from "./StarIcon/StarIcon";
import "./RepoTile.css";

type repoTileProps = {
  item: RepoItem;
  onClick: () => void;
};

const getPrettyDate = (stringDate: string) => {
  let newDate = new Date(stringDate).toDateString().split(" ");
  let prettyDate = newDate[2] + " " + newDate[1];
  if (newDate[3] !== new Date().getFullYear().toString()) {
    prettyDate += " " + newDate[3];
  }
  return prettyDate;
};

const RepoTile: React.FC<repoTileProps> = ({ item, onClick }) => {
  return (
    <div className="list__card card" onClick={onClick}>
      <Avatar
        avatar_url={item.owner.avatar_url ? item.owner.avatar_url : ""}
        name={item.name[0]}
      />
      <div className="card__content">
        <div className="card__title">{item.name}</div>
        <a href={item.owner.url} className="card__author">
          {item.owner.login}
        </a>
        <div className="card__info">
          <div className="card__stars">
            <StarIcon /> {item.stargazers_count}
          </div>
          <div className="card__data">
            Updated {getPrettyDate(item.updated_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoTile;
