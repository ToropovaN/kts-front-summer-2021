import React from "react";

import RepoTile from "@components/RepoTile/RepoTile";
import Search from "@components/Search/Search";
import { RepoItem } from "src/store/GitHubStore/types";

import root from "../../../root/root";

const testRepo: RepoItem = {
  id: 25694602,
  name: "notific",
  owner: {
    login: "ktsstudio",
    url: "https://github.com/ktsstudio",
    avatar_url: "https://avatars.githubusercontent.com/u/14364638?v=4",
  },
  html_url: "https://github.com/ktsstudio/notific",
  stargazers_count: 2,
  updated_at: "2021-02-02T18:15:15Z",
};

type searchStateType = {
  inputValue: string;
  isLoading: boolean;
  repoList: RepoItem[];
};

const ReposSearchPage = () => {
  const onClick = () => alert("click!");

  let startState: searchStateType = {
    inputValue: "",
    isLoading: false,
    repoList: [],
  };

  const [searchState, setSearchState] = React.useState(startState);

  const setInputValue = (newValue: string) => {
    let newData = sendRequest(newValue);
    setSearchState({
      inputValue: newValue,
      isLoading: true,
      repoList: newValue === "" ? [] : newData,
    });
  };

  const sendRequest = (value: string) => {
    /*TODO: получить результаты root(value). как?...*/
    return [testRepo]; //как будто что-то пришло
  };

  const renderRepos = () => {
    return searchState.repoList.map((repo) => (
      <RepoTile key={repo.id} item={repo} onClick={onClick} />
    ));
  };

  return (
    <div className="page">
      <Search
        inputProps={{
          placeholder: "Введите название организации",
          stateUpdate: setInputValue,
        }}
      />
      <div className="page__list list">
        {searchState.repoList && renderRepos()}
      </div>
    </div>
  );
};

export default ReposSearchPage;
