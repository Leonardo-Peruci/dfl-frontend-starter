export const MovieStatus = {
  WANT_TO_WATCH: "want_to_watch",
  WATCHING: "watching",
  WATCHED: "watched",
} as const;

export type MovieStatus = (typeof MovieStatus)[keyof typeof MovieStatus];

export const MOVIE_STATUSES = Object.values(MovieStatus);
