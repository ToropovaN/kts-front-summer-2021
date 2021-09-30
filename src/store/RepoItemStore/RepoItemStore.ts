import GitHubStore from "@store/GitHubStore";
import { RepoItemModel } from "@store/models/GitHub";
import {
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

const testRepo: RepoItemModel = {
  id: 0,
  name: "•••",
  owner: {
    login: "•••",
    htmlUrl: "",
  },
  htmlUrl: "",
  stargazersCount: 0,
  updatedAt: "1111-01-01",
  createdAt: "1111-01-01",
  private: false,
  description: "•••",
  language: "•••",
};

type PrivateFields = "_repoItem" | "_repoId";

export default class RepoListStore implements ILocalStore {
  private readonly _gitHubStore = new GitHubStore();
  private _repoId: string = "";
  private _repoItem: RepoItemModel = testRepo;

  constructor() {
    makeObservable<RepoListStore, PrivateFields>(this, {
      _repoItem: observable,
      repoItem: computed,
      _repoId: observable,
      loadRepo: action,
    });
  }

  get repoId(): string {
    return this._repoId;
  }

  setRepoId(newId: string) {
    if (this._repoId !== newId) {
      this._repoId = newId;
      this.loadRepo();
    }
  }

  get repoItem(): RepoItemModel {
    return this._repoItem;
  }

  loadRepo() {
    let NewOneRepoParams = {
      repoId: this._repoId,
    };
    runInAction(() => {
      this._gitHubStore.getOneRepo(NewOneRepoParams).then(() => {
        const list = linearizeCollection(this._gitHubStore.list);
        this._repoItem = list[0];
      });
    });
  }

  destroy(): void {
    this._gitHubStore.destroy();
  }
}
