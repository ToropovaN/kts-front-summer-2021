import {ApiResponse} from "../../shared/store/ApiStore/types"

/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */
export type GetOrganizationReposListParams = {
    organizationName: string,
    per_page: number,
    page: number,
}

export type GetOneRepoParams = {
    repoId: string
}

export type RepoItem = {
    id: number,
    name: string,
    owner: {
        login: string,
        html_url: string,
        avatar_url?: string
    },
    html_url: string,
    stargazers_count: number,
    updated_at: string,
    "private": boolean,
    "description": string,
    "language": string,
    "created_at": string,
}

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], null>>;
    getOneRepo(params: GetOneRepoParams): Promise<ApiResponse<RepoItem, null>>;

}
