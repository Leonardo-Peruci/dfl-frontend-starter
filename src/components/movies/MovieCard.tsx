import { Button } from "@/components/ui";
import { MOVIE_STATUS_LABELS } from "@/constants/movie-status.constants";
import type { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
  onCycleStatus: (movie: Movie) => void;
  onDelete: (id: string) => void;
  isBusy?: boolean;
}

export function MovieCard({ movie, onCycleStatus, onDelete, isBusy }: MovieCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{movie.title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{movie.year}</p>
        </div>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-200">
          {MOVIE_STATUS_LABELS[movie.status]}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" size="sm" variant="secondary" disabled={isBusy} onClick={() => onCycleStatus(movie)}>
          Avançar status
        </Button>
        <Button type="button" size="sm" variant="danger" disabled={isBusy} onClick={() => onDelete(movie.id)}>
          Excluir
        </Button>
      </div>
    </article>
  );
}
