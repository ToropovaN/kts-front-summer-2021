import ApiStore from '../../shared/store/ApiStore';
import {IGitHubStore, GetOrganizationReposListParams, RepoItem, ApiResp} from "./types";
import {HTTPMethod} from "../../shared/store/ApiStore/types";

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com");

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
        let result = this.apiStore.request({
            method: HTTPMethod.GET,
            endpoint: `/orgs/${params.organizationName}/repos`
        })
        return result;
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
    }
}
