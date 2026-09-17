import { MovieExample } from "@/types/movie-example.types";
import MovieCardExample from "./MovieCardExample";

interface MovieListExampleProps {
  moviesExample: MovieExample[];
}

export default function MovieListExample({ moviesExample }: MovieListExampleProps) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Lista de Filmes</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {moviesExample.map((movieExample) => (
          <MovieCardExample key={movieExample.id} movie={movieExample} />
        ))}
      </div>
    </div>
  );
}
