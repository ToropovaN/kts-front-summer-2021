import React, { useCallback } from "react";

import { useReposContext } from "@components/RepoListProvider/RepoListProvider";
import RepoTile from "@components/RepoTile/RepoTile";
import Search from "@components/Search/Search";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

// @ts-ignore
import styles from "./ReposSearchPage.module.scss";
<<<<<<< Updated upstream
=======
import {RepoItemModel} from "../../../store/models/GitHub";
import {Meta} from "../../../utils/meta";
import Loader from "../../../components/Loader";
>>>>>>> Stashed changes

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
  //if (reposContext.repoList.length == 0) reposContext.setValue("");

  return (
    <div className={styles.page}>
      <Search
        placeholder={"Введите название организации"}
        changeValue={changeValue}
      />
      {reposContext.repoList.length > 0 && (
        <div className={styles.list}>
<<<<<<< Updated upstream
          {reposContext.repoList.map((repo) => (
=======
          {reposContext.value === "" && (<div className={styles.list__label}><span className={styles.list__labelcontent}>Может быть интересно</span></div>)}
          {reposContext.repoList.map((repo: RepoItemModel) => (
>>>>>>> Stashed changes
            <RepoTile key={repo.id} item={repo} onClick={onClick} />
          ))}
          {reposContext.repoList.length % reposContext.perPage === 0 && (
            <div className={styles.list__showMore} onClick={showMore}>
              Show more
            </div>
          )}
        </div>
      )}
      {reposContext.meta === Meta.loading && (
          <div><Loader /></div>
      )}
    </div>
  );
};

export default observer(ReposSearchPage);
