import React from "react";

import RepoTile from "@components/RepoTile/RepoTile";
import Search from "@components/Search/Search";
import { RepoItem } from "src/store/GitHubStore/types";

import root from "../../../root/root";
import GitHubStore from "../../../store/GitHubStore/GitHubStore";

const ReposSearchPage = () => {
  const onClick = () => alert("click!");

  const [value, setValue] = React.useState<string>("");
  const [repos, setRepos] = React.useState<RepoItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (value !== "") {
      setIsLoading(true);
      const gitHubStore = new GitHubStore();
      gitHubStore
        .getOrganizationReposList({
          organizationName: value,
        })
        .then((result) => {
          if (result.status === 200 && result.data !== null) {
            setRepos(result.data);
          }
        });
      setIsLoading(false);
    } else setRepos([]);
  }, [value]);

  return (
    <div className="page">
      <Search
        placeholder={"Введите название организации"}
        value={value}
        stateUpdate={setValue}
      />
      <div className="page__list list">
        {repos.map((repo) => (
          <RepoTile key={repo.id} item={repo} onClick={onClick} />
        ))}
      </div>
    </div>
  );
};

export default ReposSearchPage;
