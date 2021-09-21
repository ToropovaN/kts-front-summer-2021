import React from "react";

import {
  per_page,
  useReposContext,
} from "@components/RepoListProvider/RepoListProvider";
import RepoTile from "@components/RepoTile/RepoTile";
import Search from "@components/Search/Search";
import { useHistory } from "react-router-dom";

// @ts-ignore
import indexStyles from "../../../index.module.scss";

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
    <div className={indexStyles.page}>
      <Search placeholder={"Введите название организации"} />
      {reposContext.list.length > 0 && (
        <div className={indexStyles.list}>
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
              className={indexStyles.list__showMore}
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
