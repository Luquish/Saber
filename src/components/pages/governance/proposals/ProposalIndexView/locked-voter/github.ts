import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { fetchNullable } from "@rockooor/sail";
import { useQuery } from "@tanstack/react-query";

export type GitHubIssue =
  RestEndpointMethodTypes["issues"]["get"]["response"]["data"];

export type GitHubComments =
  RestEndpointMethodTypes["issues"]["listComments"]["response"]["data"];

export const extractGitHubIssueURL = (body: string): string | null => {
  const match = body.match(
    /\[View Discussion\]\(https:\/\/github.com\/(\w+)\/(\w+)\/issues\/(\d+)\)/
  );
  if (!match) {
    return null;
  }
  const [_, org, repo, issue] = match;
  if (!org || !repo || !issue) {
    return null;
  }
  return `https://api.github.com/repos/${org}/${repo}/issues/${issue}`;
};

export const useGitHubIssue = (issueURL: string | null) => {
  return useQuery({
    queryKey: ["githubIssue", issueURL],
    queryFn: async () => {
      if (!issueURL) {
        return null;
      }
      return await fetchNullable<GitHubIssue>(issueURL);
    },
  });
};

export const useGitHubIssueComments = (commentsURL: string | null) => {
  return useQuery({
    queryKey: ["githubIssueComments", commentsURL],
    queryFn: async () => {
      if (!commentsURL) {
        return null;
      }
      return await fetchNullable<GitHubComments>(commentsURL);
    },
  });
};
