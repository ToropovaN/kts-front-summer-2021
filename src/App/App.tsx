import React from "react";
import { createContext, useContext } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import GitHubStore from "../store/GitHubStore";
import { RepoItem } from "../store/GitHubStore/types";
import RepoPage from "./pages/RepoPage";
import ReposSearchPage from "./pages/ReposSearchPage";

export type ReposContextProps = {
  value: string;
  setValue: any;
  list: RepoItem[];
  isLoading: boolean;
  load: (isValueUpdated: boolean) => void;
};
const defaultReposContextProps: ReposContextProps = {
  value: "",
  setValue: () => {},
  list: [],
  isLoading: false,
  load: () => {},
};
const ReposContext = createContext<ReposContextProps>(defaultReposContextProps);
export const useReposContext = () => useContext(ReposContext);
const ReposContextProvider = ReposContext.Provider;

export const per_page: number = 10;

function App() {
  const [contextValue, setcontextValue] = React.useState<string>("");
  const [contextRepos, setContextRepos] = React.useState<RepoItem[]>([]);
  const [contextIsLoading, setcontextIsLoading] =
    React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);

  const contextLoad = (isValueUpdated: boolean) => {
    if (isValueUpdated) {
      if (contextValue === "") {
        setcontextIsLoading(false);
        return;
      }
      setPage(0);
      setContextRepos([]);
    } else setPage((prevPage) => prevPage + 1);
  };

  React.useEffect(() => {
    setcontextIsLoading(true);
    if (page === 0) setPage(1);
    if (contextValue) {
      const gitHubStore = new GitHubStore();
      gitHubStore
        .getOrganizationReposList({
          organizationName: contextValue,
          per_page: per_page,
          page: page,
        })
        .then((result) => {
          if (result.status === 200 && result.data !== null) {
            setContextRepos(contextRepos.concat(result.data));
          }
        });
    }
    setcontextIsLoading(false);
  }, [page]);

  return (
    <BrowserRouter>
      <ReposContextProvider
        value={{
          value: contextValue,
          setValue: setcontextValue,
          list: contextRepos,
          isLoading: contextIsLoading,
          load: (isValueUpdated) => contextLoad(isValueUpdated),
        }}
      >
        <Switch>
          <Route path="/repos/:id" component={RepoPage} />
          <Route path="/repos" component={ReposSearchPage} />
          <Redirect to="/repos" />
        </Switch>
      </ReposContextProvider>
    </BrowserRouter>
  );
}

export default App;
