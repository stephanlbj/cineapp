export interface Comment {
  movieId: number
  username: string
  message: string
  movieRating: number | null
  timestamp: number
}

export interface FormData {
  username: string
  message: string
  movieRating: number
}
