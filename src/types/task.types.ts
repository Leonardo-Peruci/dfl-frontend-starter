export interface Task {
    id: string;
    title: string;
    phase: "a_fazer" | "fazendo" | "feito";
}

export interface CreateTaskDto {
    title: string;
    phase: "a_fazer" | "fazendo" | "feito";
}

export type UpdateTaskDto = Partial<CreateTaskDto>;