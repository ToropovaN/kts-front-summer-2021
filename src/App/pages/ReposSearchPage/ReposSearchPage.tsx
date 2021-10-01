import React, { useCallback } from "react";

import { useReposContext } from "components/RepoListProvider/RepoListProvider";
import RepoTile from "components/RepoTile/RepoTile";
import Search from "components/Search/Search";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

// @ts-ignore
import styles from "./ReposSearchPage.module.scss";
import {RepoItemModel} from "../../../store/models/GitHub";

const ReposSearchPage = () => {
  const history = useHistory();

  const onClick = useCallback((id: number) => {
    history.push("/repos/" + id);
  }, []);

  const showMore = useCallback(() => {
    reposContext.loadRepos(false);
  }, []);

  const changeValue = useCallback((event) => {
    if (reposContext.value !== event.target.value) {
      reposContext.setValue(event.target.value);
    }
  }, []);

  const reposContext = useReposContext();

  return (
    <div className={styles.page}>
      <Search
        placeholder={"Введите название организации"}
        changeValue={changeValue}
      />
      {reposContext.repoList.length > 0 && (
        <div className={styles.list}>
          {reposContext.repoList.map((repo: RepoItemModel) => (
            <RepoTile key={repo.id} item={repo} onClick={onClick} />
          ))}
          {reposContext.repoList.length % reposContext.perPage === 0 && (
            <div className={styles.list__showMore} onClick={showMore}>
              Show more
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default observer(ReposSearchPage);
