import { HTTPMethod } from "@RootStore/ApiStore/types";
import rootStore from "@RootStore/instance";
import {
  RepoItemModel,
  RepoItemApi,
  normalizeRepoItem,
} from "@store/models/GitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
  normalizeCollection,
} from "@store/models/shared/collection";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import {
  IGitHubStore,
  GetOrganizationReposListParams,
  GetOneRepoParams,
} from "./types";

type PrivateFields = "_list" | "_meta";

export default class GitHubStore implements IGitHubStore, ILocalStore {
  private readonly _apiStore = rootStore.apiStore;
  private _list: CollectionModel<number, RepoItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      list: computed,
      _meta: observable,
      meta: computed,
      getOrganizationReposList: action,
      getOneRepo: action,
    });
  }

  get list(): CollectionModel<number, RepoItemModel> {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    const response = await this._apiStore.request<RepoItemApi[]>({
      method: HTTPMethod.GET,
      endpoint: `/orgs/${params.organizationName}/repos?per_page=${params.per_page}&page=${params.page}`,
      data: {},
      headers: {},
    });
    runInAction(() => {
      if (response.success) {
        try {
          const list = response.data.map(normalizeRepoItem);
          this._meta = Meta.success;
          this._list = normalizeCollection(list, (listItem) => listItem.id);
          return;
        } catch (e) {
          this._meta = Meta.error;
        }
      }
    });
  }

  async getOneRepo(params: GetOneRepoParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    const response = await this._apiStore.request<RepoItemApi>({
      method: HTTPMethod.GET,
      endpoint: `/repositories/${params.repoId}`,
      data: {},
      headers: {},
    });
    runInAction(() => {
      if (response.success) {
        try {
          const list = normalizeRepoItem(response.data);
          this._meta = Meta.success;
          this._list = normalizeCollection([list], (listItem) => listItem.id);
          return;
        } catch (e) {
          this._meta = Meta.error;
        }
      }
    });
  }

  destroy(): void {}
}
