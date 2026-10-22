export const TaskPhase = {
  A_FAZER: "a_fazer",
  FAZENDO: "fazendo",
  FEITO: "feito",
} as const;
export type TaskPhase = (typeof TaskPhase)[keyof typeof TaskPhase];
export const TASK_PHASES = Object.values(TaskPhase);