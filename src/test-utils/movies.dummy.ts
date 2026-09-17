import type { Movie } from "@/types/movie.types";

/** Array mutável em memória — o service faz CRUD aqui (exemplo da aula) */
export const moviesData: Movie[] = [
  { id: "1", title: "Interestelar", year: 2014, status: "watched" },
  { id: "2", title: "Duna", year: 2021, status: "watching" },
  { id: "3", title: "Oppenheimer", year: 2023, status: "want_to_watch" },
  { id: "4", title: "A Chegada", year: 2016, status: "watched" },
  { id: "5", title: "O Poderoso Chefão", year: 1972, status: "watched" },
  { id: "6", title: "O Poderoso Chefão 2", year: 1974, status: "watched" },
];
