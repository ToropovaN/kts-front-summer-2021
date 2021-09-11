import React from "react";
import { createContext, useContext } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import GitHubStore from "../store/GitHubStore";
import { RepoItem } from "../store/GitHubStore/types";
import RepoPage from "./pages/RepoPage";
import ReposSearchPage from "./pages/ReposSearchPage";

export type ReposContextProps = {
  setValue: any;
  list: RepoItem[];
  isLoading: boolean;
  load: () => void;
};
const defaultReposContextProps: ReposContextProps = {
  setValue: () => {},
  list: [],
  isLoading: false,
  load: () => {},
};
const ReposContext = createContext<ReposContextProps>(defaultReposContextProps);
export const useReposContext = () => useContext(ReposContext);
const ReposContextProvider = ReposContext.Provider;

function App() {
  const [contextValue, setcontextValue] = React.useState<string>("");
  const [contextRepos, setContextRepos] = React.useState<RepoItem[]>([]);
  const [contextIsLoading, setcontextIsLoading] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    contextLoad();
  }, [contextValue]);

  const contextLoad = () => {
    setcontextIsLoading(true);
    if (contextValue !== "") {
      const gitHubStore = new GitHubStore();
      gitHubStore
        .getOrganizationReposList({
          organizationName: contextValue,
          per_page: 10,
          page: 1,
        })
        .then((result) => {
          if (result.status === 200 && result.data !== null) {
            setContextRepos(result.data);
          }
        });
    } else setContextRepos([]);
    setcontextIsLoading(false);
  };

  return (
    <BrowserRouter>
      <ReposContextProvider
        value={{
          setValue: setcontextValue,
          list: contextRepos,
          isLoading: contextIsLoading,
          load: () => contextLoad(),
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
