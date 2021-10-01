import { getPrettyDate } from "utils/getPrettyDate";

export type RepoItemApi = {
  id: number;
  name: string;
  owner: {
    login: string;
    html_url: string;
    avatar_url?: string;
  };
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  private: boolean;
  description: string;
  language: string;
  created_at: string;
};

export type RepoItemModel = {
  id: number;
  name: string;
  owner: {
    login: string;
    htmlUrl: string;
    avatarUrl?: string;
  };
  htmlUrl: string;
  stargazersCount: number;
  updatedAt: string;
  private: boolean;
  description: string;
  language: string;
  createdAt: string;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  owner: {
    login: from.owner.login,
    htmlUrl: from.owner.html_url,
    avatarUrl: from.owner.avatar_url ? from.owner.avatar_url : "",
  },
  htmlUrl: from.html_url,
  stargazersCount: from.stargazers_count,
  updatedAt: getPrettyDate(from.updated_at),
  private: from.private,
  description: from.description,
  language: from.language,
  createdAt: getPrettyDate(from.created_at),
});
