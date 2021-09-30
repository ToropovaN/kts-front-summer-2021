// Здесь необходимо продемонстрировать создание и использование GitHubStore
import { RepoItemModel } from "@store/models/GitHub";
import GitHubStore from "@store/GitHubStore/GitHubStore";

const root = (orgName: string) => {
  const gitHubStore = new GitHubStore();
  let rootResult: RepoItemModel[] = [];
  //const EXAMPLE_ORGANIZATION = "ktsstudio";
  /*gitHubStore
    .getOrganizationReposList({
      organizationName: orgName,
      page: 1,
      per_page: 10,
    })
    .then((result) => {
      //eslint-disable-next-line no-console
      console.log(result); // в консоли появится список репозиториев в ktsstudio
      if (result.data) rootResult = result.data;
    });*/
  return rootResult;
};

export default root("");
// В ДЗ 1 Не требуется визуально в разметке отображать результат запроса к сети. Достаточно вывести в console.log
