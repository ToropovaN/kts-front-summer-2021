import GitHubStore from "store/GitHubStore";
import { RepoItemModel } from "store/models/GitHub";
import { linearizeCollection } from "store/models/shared/collection";
import { ILocalStore } from "utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_value" | "_page" | "_repoList";

export default class RepoListStore implements ILocalStore {
  private readonly _gitHubStore = new GitHubStore();
  private _value: string = "";
  private _page: number = 0;
  private _perPage: number = 10;
  private _repoList: RepoItemModel[] = [];

  constructor() {
    makeObservable<RepoListStore, PrivateFields>(this, {
      _value: observable,
      value: computed,
      _page: observable,
      page: computed,
      _repoList: observable,
      repoList: computed,
      loadRepos: action,
    });
  }

  get value(): string {
    return this._value;
  }
  setValue(newValue: string) {
    this._value = newValue;
    this.loadRepos(true);
  }

  get page(): number {
    return this._page;
  }

  get perPage(): number {
    return this._perPage;
  }

  get meta(): string {
    return this._gitHubStore.meta;
  }

  get repoList(): RepoItemModel[] {
    return this._repoList;
  }

  loadRepos(isValueUpdated: boolean) {
    if (isValueUpdated) {
      if (this._value === "") {
        return;
      } else this._page = 1;
    } else this._page++;
    let NewOrganizationReposListParams = {
      organizationName: this._value,
      per_page: this._perPage,
      page: this._page,
    };
    runInAction(() => {
      this._gitHubStore
        .getOrganizationReposList(NewOrganizationReposListParams)
        .then(() => {
          if (this.page === 1)
            this._repoList = linearizeCollection(this._gitHubStore.list);
          else
            this._repoList = this._repoList.concat(
              linearizeCollection(this._gitHubStore.list)
            );
        });
    });
  }

  destroy(): void {
    this._gitHubStore.destroy();
  }
}
