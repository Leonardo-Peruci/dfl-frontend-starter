import type { MovieStatus } from "@/enums/movie-status.enum";

export interface Movie {
  id: string;
  title: string;
  year: number;
  status: MovieStatus;
}

export interface CreateMovieDto {
  title: string;
  year: number;
  status: MovieStatus;
}

export type UpdateMovieDto = Partial<CreateMovieDto>;
