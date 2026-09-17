import type { MovieStatus } from "@/enums/movie-status.enum";

export const MOVIE_STATUS_LABELS: Record<MovieStatus, string> = {
  want_to_watch: "Quero assistir",
  watching: "Assistindo",
  watched: "Já vi",
};
