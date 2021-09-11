import React, { useState, useEffect } from "react";

import RepoTile from "@components/RepoTile";
import { useParams } from "react-router-dom";

import repoTileStyles from "../../../components/RepoTile/RepoTile.module.scss";
import GitHubStore from "../../../store/GitHubStore";
import { ExtendedRepoItem } from "../../../store/GitHubStore/types";
import { getPrettyDate } from "../../../utils";
// @ts-ignore
import appStyles from "../../App.module.scss";
import styles from "./RepoPage.module.scss";

const RepoPage = () => {
  const testRepo: ExtendedRepoItem = {
    id: 0,
    name: "name",
    owner: {
      login: "login",
      html_url: "html_url",
    },
    html_url: "",
    stargazers_count: 0,
    updated_at: "1111-01-01",
    created_at: "1111-01-01",
    private: false,
    description: "description",
    language: "language",
  };

  const [currentRepo, setCurrentRepo] = useState<ExtendedRepoItem>(testRepo);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
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
  }, [id]);

  return (
    <div className={appStyles.page}>
      <div className={`${appStyles.repo} ${styles.page__repo}`}>
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
              {currentRepo.language ? currentRepo.language : "..."}
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