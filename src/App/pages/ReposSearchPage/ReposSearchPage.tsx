import React from "react";

import { useReposContext } from "@components/RepoListProvider/RepoListProvider";
import RepoTile from "@components/RepoTile/RepoTile";
import Search from "@components/Search/Search";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

// @ts-ignore
import indexStyles from "../../../index.module.scss";

const ReposSearchPage = () => {
  const history = useHistory();
  const onClick = (id: number) => {
    history.push("/repos/" + id);
  };

  const reposContext = useReposContext();

  return (
    <div className={indexStyles.page}>
      <Search placeholder={"Введите название организации"} />
      {reposContext.repoList.length > 0 && (
        <div className={indexStyles.list}>
          {reposContext.repoList.map((repo) => (
            <RepoTile
              key={repo.id}
              item={repo}
              onClick={() => {
                onClick(repo.id);
              }}
            />
          ))}
          {reposContext.repoList.length % reposContext.perPage === 0 && (
            <div
              className={indexStyles.list__showMore}
              onClick={() => reposContext.loadRepos(false)}
            >
              Show more
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default observer(ReposSearchPage);
