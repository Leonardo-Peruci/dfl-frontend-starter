import type { Movie } from "@/types";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onCycleStatus: (movie: Movie) => void;
  onDelete: (id: string) => void;
  isBusy?: boolean;
}

export function MovieList({ movies, onCycleStatus, onDelete, isBusy }: MovieListProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard
            movie={movie}
            onCycleStatus={onCycleStatus}
            onDelete={onDelete}
            isBusy={isBusy}
          />
        </li>
      ))}
    </ul>
  );
}
