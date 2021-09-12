import React from "react";

import RepoTile from "@components/RepoTile/RepoTile";
import Search from "@components/Search/Search";
import { useHistory } from "react-router-dom";

import { per_page, useReposContext } from "../../App";
// @ts-ignore
import styles from "../../App.module.scss";

const ReposSearchPage = () => {
  const history = useHistory();
  const onClick = (id: number) => {
    history.push("/repos/" + id);
  };

  const reposContext = useReposContext();

  React.useEffect(() => {
    reposContext.load(true);
  }, [reposContext.value]);

  return (
    <div className={styles.page}>
      <Search placeholder={"Введите название организации"} />
      {reposContext.list.length > 0 && (
        <div className={`${styles.page__list} ${styles.list}`}>
          {reposContext.list.map((repo) => (
            <RepoTile
              key={repo.id}
              item={repo}
              onClick={() => {
                onClick(repo.id);
              }}
            />
          ))}
          {reposContext.list.length % per_page === 0 && (
            <div
              className={styles.list__showMore}
              onClick={() => reposContext.load(false)}
            >
              Show more
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReposSearchPage;
