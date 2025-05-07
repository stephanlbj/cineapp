import type { Comment } from "~/types/comments";

export function useLocalStorage() {
  const saveComment = (comment: Comment) => {
    const comments: Comment[] = JSON.parse(
      localStorage.getItem("comments") || "[]",
    );
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
  };

  const getComments = (movieId: number) => {
    const comments: Comment[] = JSON.parse(
      localStorage.getItem("comments") || "[]",
    );
    return comments
      .filter((comment) => comment.movieId === movieId)
      .sort((a, b) => b.date - a.date);
  };

  return {
    saveComment,
    getComments,
  };
}
