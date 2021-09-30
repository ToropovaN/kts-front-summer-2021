import React from "react";
import { createContext, useContext } from "react";

import RepoListStore from "@store/ReposListStore";
import { useLocalStore } from "@utils/useLocalStore";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import RepoPage from "../../App/pages/RepoPage";
import ReposSearchPage from "../../App/pages/ReposSearchPage";

const ReposContext = createContext<RepoListStore>(new RepoListStore());
const ReposContextProvider = ReposContext.Provider;

export const useReposContext = () => useContext(ReposContext);

function RepoListProvider() {
  const repoListStore = useLocalStore(() => new RepoListStore());
  return (
    <BrowserRouter>
      <ReposContextProvider value={repoListStore}>
        <Switch>
          <Route path="/repos/:id" component={RepoPage} />
          <Route path="/repos" component={ReposSearchPage} />
          <Redirect to="/repos" />
        </Switch>
      </ReposContextProvider>
    </BrowserRouter>
  );
}

export default RepoListProvider;
