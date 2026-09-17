import { SIMULATED_API_DELAY_MS } from "@/constants/app.constants";
import { moviesData } from "@/test-utils/movies.dummy";
import type { CreateMovieDto, Movie, UpdateMovieDto } from "@/types";

const delay = () => new Promise((resolve) => setTimeout(resolve, SIMULATED_API_DELAY_MS));

export async function getMovies(): Promise<Movie[]> {
  await delay();
  return [...moviesData];
}

export async function getMovieById(id: string): Promise<Movie> {
  await delay();
  const movie = moviesData.find((m) => m.id === id);
  if (!movie) throw new Error(`Filme ${id} não encontrado`);
  return { ...movie };
}

export async function createMovie(dto: CreateMovieDto): Promise<Movie> {
  await delay();
  const movie: Movie = {
    id: String(Date.now()),
    title: dto.title,
    year: dto.year,
    status: dto.status,
  };
  moviesData.unshift(movie);
  return { ...movie };
}

export async function updateMovie(id: string, dto: UpdateMovieDto): Promise<Movie> {
  await delay();
  const index = moviesData.findIndex((m) => m.id === id);
  if (index === -1) throw new Error(`Filme ${id} não encontrado`);

  moviesData[index] = { ...moviesData[index], ...dto };
  return { ...moviesData[index] };
}

export async function deleteMovie(id: string): Promise<void> {
  await delay();
  const index = moviesData.findIndex((m) => m.id === id);
  if (index === -1) throw new Error(`Filme ${id} não encontrado`);
  moviesData.splice(index, 1);
}
