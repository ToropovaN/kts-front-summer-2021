import ApiStore from "@shared/store/ApiStore";
import { ApiResponse, HTTPMethod } from "@shared/store/ApiStore/types";

import {
  IGitHubStore,
  GetOrganizationReposListParams,
  RepoItem,
  GetOneRepoParams,
  ExtendedRepoItem,
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com");

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], null>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      endpoint: `/orgs/${params.organizationName}/repos?per_page=${params.per_page}&page=${params.page}`,
      data: {},
      headers: {},
    });
    // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
  }

  async getOneRepo(
    params: GetOneRepoParams
  ): Promise<ApiResponse<ExtendedRepoItem, null>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      endpoint: `/repositories/${params.repoId}`,
      data: {},
      headers: {},
    });
    // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
  }
}
