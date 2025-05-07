import type { Comment } from "@/domain/models/Comment";

export const CommentService = {
  saveComment(comment: Comment) {
    const comments: Comment[] = JSON.parse(
      localStorage.getItem("comments") || "[]",
    );
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
  },

  getComments(movieId: number): Comment[] {
    const comments: Comment[] = JSON.parse(
      localStorage.getItem("comments") || "[]",
    );
    return comments
      .filter((c) => c.movieId === movieId)
      .sort((a, b) => b.date - a.date);
  },
};
