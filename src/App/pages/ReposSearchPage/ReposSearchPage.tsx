import React, { useContext } from "react";

import RepoTile from "@components/RepoTile/RepoTile";
import Search from "@components/Search/Search";
import { useHistory } from "react-router-dom";

import GitHubStore from "../../../store/GitHubStore/GitHubStore";
import { RepoItem } from "../../../store/GitHubStore/types";
import { useReposContext } from "../../App";
// @ts-ignore
import styles from "../../App.module.scss";

const ReposSearchPage = () => {
  const history = useHistory();
  const onClick = (id: number) => {
    history.push("/repos/" + id);
  };

  const [value, setValue] = React.useState<string>("");
  const reposContext = useReposContext();

  React.useEffect(() => {
    reposContext.setValue(value);
  }, [value]);

  return (
    <div className={styles.page}>
      <Search
        placeholder={"Введите название организации"}
        value={value}
        stateUpdate={setValue}
      />
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
          {reposContext.list.length >= 10 && (
            <div className={styles.list__showMore}>Show more</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReposSearchPage;
