import {ApiResponse} from "@RootStore/ApiStore/types"

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

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void>;
    getOneRepo(params: GetOneRepoParams): Promise<void>;

}
