import { useReposContext } from "@components/RepoListProvider/RepoListProvider";
import repoTileStyles from "@components/RepoTile/RepoTile.module.scss";
import RepoItemStore from "@store/RepoItemStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

// @ts-ignore
import indexStyles from "../../../index.module.scss";
import styles from "./RepoPage.module.scss";

const RepoPage = () => {
  const reposContext = useReposContext();
  const repoItemStore = useLocalStore(() => new RepoItemStore());
  const { id } = useParams<{ id: string }>();
  repoItemStore.setRepoList(reposContext.repoList);
  repoItemStore.setRepoId(id);

  return (
    <div className={indexStyles.page}>
      <div className={styles.page__repo}>
        <div className={styles.repo__titleBlock}>
          <div className={styles.repo__avatar}>
            {repoItemStore.repoItem.owner.avatarUrl ? (
              <img
                className={styles.repo__avatar__image}
                src={repoItemStore.repoItem.owner.avatarUrl}
                alt={repoItemStore.repoItem.name}
              />
            ) : (
              <div className={styles.repo__avatar__letter}>
                {repoItemStore.repoItem.name[0]}
              </div>
            )}
          </div>
          <div className={styles.repo__title}>
            <div className={styles.repo__repoBy}>
              <div
                className={`${repoTileStyles.card__title} ${styles.repo__repoName}`}
              >
                {repoItemStore.repoItem.name}
              </div>
              <a
                href={repoItemStore.repoItem.owner.htmlUrl}
                className={repoTileStyles.card__author}
              >
                by {repoItemStore.repoItem.owner.login}
              </a>
            </div>
          </div>
        </div>
        <div
          className={`${styles.repo__repoDescription} ${styles.repoDescription}`}
        >
          {repoItemStore.repoItem.description}
        </div>
        <div className={styles.repoInfo}>
          <div>
            <div
              className={`${styles.repoInfo__title} ${styles.repoInfo__title__language}`}
            >
              Language:
            </div>
            <div className={styles.repoInfo__infoValue}>
              {repoItemStore.repoItem.language
                ? repoItemStore.repoItem.language
                : "•••"}
            </div>
          </div>
          <div>
            <div
              className={`${styles.repoInfo__title} ${styles.repoInfo__title__stars}`}
            >
              Stars:
            </div>
            <div className={styles.repoInfo__infoValue}>
              {repoItemStore.repoItem.stargazersCount}
            </div>
          </div>
          <div>
            <div
              className={`${styles.repoInfo__title} ${styles.repoInfo__title__private}`}
            >
              Private:
            </div>
            <div className={styles.repoInfo__infoValue}>
              {repoItemStore.repoItem.private ? "true" : "false"}
            </div>
          </div>
        </div>
        <div className={`${styles.repoDateInfo} ${styles.repo__repoDateInfo}`}>
          <div>
            Updated at: {repoItemStore.repoItem.updatedAt} <br />
            Created at: {repoItemStore.repoItem.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(RepoPage);
