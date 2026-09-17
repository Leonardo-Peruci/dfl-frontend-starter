import { useCallback, useEffect, useState } from "react";
import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "@/services/movies.service";
import type { CreateMovieDto, Movie, UpdateMovieDto } from "@/types";

/**
 * Exemplo didático — SEM React Query.
 * Loading, erro e refetch são manuais (useState + await no service).
 * Compare com useGetSuppliers / useGetProducts (React Query).
 */
export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMovies();
      setMovies(data);
    } catch {
      setError("Falha ao carregar filmes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const create = async (dto: CreateMovieDto) => {
    setIsMutating(true);
    try {
      await createMovie(dto);
      await load();
    } finally {
      setIsMutating(false);
    }
  };

  const update = async (id: string, dto: UpdateMovieDto) => {
    setIsMutating(true);
    try {
      await updateMovie(id, dto);
      await load();
    } finally {
      setIsMutating(false);
    }
  };

  const remove = async (id: string) => {
    setIsMutating(true);
    try {
      await deleteMovie(id);
      await load();
    } finally {
      setIsMutating(false);
    }
  };

  return {
    movies,
    isLoading,
    error,
    isMutating,
    create,
    update,
    remove,
    reload: load,
  };
}
