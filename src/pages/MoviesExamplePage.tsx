import MovieListExample from "@/components/movies-example/MovieListExample";
import { Button } from "@/components/ui/Button";
import { moviesExampleData } from "@/test-utils/movies-example.dummy";
import { MovieExample } from "@/types/movie-example.types";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const delay = () => new Promise((resolve) => setTimeout(resolve, 3000));

/**
 * Etapa 1 da progressão — tudo na página (sem service, sem hook).
 * Ensina: useState, useEffect, async/await, loading / vazio / lista.
 */
export default function MoviesExamplePage() {
  const [moviesExample, setMoviesExample] = useState<MovieExample[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadMoviesExample = async () => {
    try {
      setIsLoading(true);
      await delay();
      setMoviesExample([...moviesExampleData]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMoviesExample();
  }, []);

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Filmes</h1>
        <Link to="/">
          <Button variant="neutral" className="gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Exemplo simples: a página busca o dummy com{" "}
        <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useState</code> +{" "}
        <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useEffect</code> — sem service e
        sem React Query.
      </p>

      {isLoading ? (
        <div className="flex h-full items-center justify-center gap-1">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-gray-500">Carregando...</p>
        </div>
      ) : moviesExample.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">Nenhum filme encontrado</p>
        </div>
      ) : (
        <MovieListExample moviesExample={moviesExample} />
      )}
    </main>
  );
}
