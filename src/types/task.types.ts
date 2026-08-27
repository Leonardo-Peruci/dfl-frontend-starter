export interface Task {
    id: string;
    title: string;
    phase: "a-fazer" | "fazendo" | "feito";
}