import React, { useState } from "react";

import { useReposContext } from "@components/RepoListProvider/RepoListProvider";
import repoTileStyles from "@components/RepoTile/RepoTile.module.scss";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { getPrettyDate } from "@utils/getPrettyDate";
import { useParams } from "react-router-dom";

// @ts-ignore
import indexStyles from "../../../index.module.scss";
import styles from "./RepoPage.module.scss";

const RepoPage = () => {
  const testRepo: RepoItem = {
    id: 0,
    name: "•••",
    owner: {
      login: "•••",
      html_url: "",
    },
    html_url: "",
    stargazers_count: 0,
    updated_at: "1111-01-01",
    created_at: "1111-01-01",
    private: false,
    description: "•••",
    language: "•••",
  };

  const [currentRepo, setCurrentRepo] = useState<RepoItem>(testRepo);
  const { id } = useParams<{ id: string }>();
  const reposContext = useReposContext();

  React.useEffect(() => {
    const searchInContext = reposContext.list.filter(
      (repo) => repo.id.toString() === id
    );
    if (searchInContext.length) {
      setCurrentRepo(searchInContext[0]);
    } else {
      const gitHubStore = new GitHubStore();
      gitHubStore
        .getOneRepo({
          repoId: id,
        })
        .then((result) => {
          if (result.status === 200 && result.data !== null) {
            setCurrentRepo(result.data);
          }
        });
    }
  }, [id]);

  return (
    <div className={indexStyles.page}>
      <div className={`${indexStyles.repo} ${styles.page__repo}`}>
        <div className={styles.repo__titleBlock}>
          <div className={styles.repo__avatar}>
            {currentRepo.owner.avatar_url ? (
              <img
                className={styles.repo__avatar__image}
                src={currentRepo.owner.avatar_url}
                alt={currentRepo.name}
              />
            ) : (
              <div className={styles.repo__avatar__letter}>
                {currentRepo.name[0]}
              </div>
            )}
          </div>
          <div className={styles.repo__title}>
            <div className={styles.repo__repoBy}>
              <div
                className={`${repoTileStyles.card__title} ${styles.repo__repoName}`}
              >
                {currentRepo.name}
              </div>
              <a
                href={currentRepo.owner.html_url}
                className={repoTileStyles.card__author}
              >
                by {currentRepo.owner.login}
              </a>
            </div>
          </div>
        </div>
        <div
          className={`${styles.repo__repoDescription} ${styles.repoDescription}`}
        >
          {currentRepo.description}
        </div>
        <div className={styles.repoInfo}>
          <div>
            <div
              className={`${styles.repoInfo__title} ${styles.repoInfo__title__language}`}
            >
              Language:
            </div>
            <div className={styles.repoInfo__infoValue}>
              {currentRepo.language ? currentRepo.language : "•••"}
            </div>
          </div>
          <div>
            <div
              className={`${styles.repoInfo__title} ${styles.repoInfo__title__stars}`}
            >
              Stars:
            </div>
            <div className={styles.repoInfo__infoValue}>
              {currentRepo.stargazers_count}
            </div>
          </div>
          <div>
            <div
              className={`${styles.repoInfo__title} ${styles.repoInfo__title__private}`}
            >
              Private:
            </div>
            <div className={styles.repoInfo__infoValue}>
              {currentRepo.private ? "true" : "false"}
            </div>
          </div>
        </div>
        <div className={`${styles.repoDateInfo} ${styles.repo__repoDateInfo}`}>
          <div>
            Updated at: {getPrettyDate(currentRepo.updated_at)} <br />
            Created at: {getPrettyDate(currentRepo.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoPage;
