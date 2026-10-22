import { useState } from "react";
import { MovieList } from "@/components/movies";
import { Button, EmptyState, ErrorState, formFieldClass, Input, LoadingState } from "@/components/ui";
import { MOVIE_STATUS_LABELS } from "@/constants/movie-status.constants";
import { MOVIE_STATUSES, type MovieStatus } from "@/enums/movie-status.enum";
import { useMovies } from "@/hooks/useMovies";
import type { CreateMovieDto, Movie } from "@/types";

const NEXT_STATUS: Record<MovieStatus, MovieStatus> = {
  want_to_watch: "watching",
  watching: "watched",
  watched: "want_to_watch",
};

const emptyForm: CreateMovieDto = {
  title: "",
  year: new Date().getFullYear(),
  status: "want_to_watch",
};

export default function MoviesPage() {
  const { movies, isLoading, error, isMutating, create, update, remove, reload } = useMovies();
  const [form, setForm] = useState<CreateMovieDto>(emptyForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await create(form);
    setForm(emptyForm);
  };

  const handleCycleStatus = async (movie: Movie) => {
    await update(movie.id, { status: NEXT_STATUS[movie.status] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este filme?")) return;
    await remove(id);
  };

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Filmes</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Exemplo da aula: CRUD com{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useState</code> + service
          direto — <strong>sem React Query</strong>. Compare com{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useGetSuppliers</code> /{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useGetProducts</code>.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
      >
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Adicionar filme</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="movie-title" className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
              Título
            </label>
            <Input
              id="movie-title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Nome do filme"
            />
          </div>
          <div>
            <label htmlFor="movie-year" className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
              Ano
            </label>
            <Input
              id="movie-year"
              type="number"
              min={1900}
              required
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="movie-status" className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            id="movie-status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as MovieStatus })}
            className={formFieldClass}
          >
            {MOVIE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {MOVIE_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" disabled={isMutating}>
          {isMutating ? "Salvando..." : "Adicionar"}
        </Button>
      </form>

      {isLoading && <LoadingState message="Carregando filmes..." />}
      {error && <ErrorState message={error} onRetry={() => void reload()} />}
      {!isLoading && !error && movies.length === 0 && (
        <EmptyState message="Nenhum filme na lista. Adicione o primeiro!" />
      )}
      {!isLoading && !error && movies.length > 0 && (
        <MovieList
          movies={movies}
          onCycleStatus={handleCycleStatus}
          onDelete={handleDelete}
          isBusy={isMutating}
        />
      )}
    </main>
  );
}
