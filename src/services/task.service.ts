import { SIMULATED_API_DELAY_MS } from "@/constants/app.constants";
import { taskExampleData } from "@/test-utils/task.dummy";
import { CreateTaskDto, Task, UpdateTaskDto } from "@/types/task.types";

const delay = () => new Promise((resolve) => setTimeout(resolve, SIMULATED_API_DELAY_MS));

export async function getTasks(): Promise<Task[]> {
    await delay();
    return [...taskExampleData];
}

export async function getTaskById(id: string): Promise<Task> {
    await delay();
    const task = taskExampleData.find((t) => t.id === id);
    if (!task) throw new Error (`Tarefa ${id} não encontrada`);
    return { ...task };
}

export async function createTask(dto: CreateTaskDto): Promise<Task> {
    await delay();
    const task: Task = {
        id: String(Date.now()),
        title: dto.title,
        phase: dto.phase,
    };
    taskExampleData.unshift(task);
    return { ...task };
}

export async function updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    await delay();
    const index = taskExampleData.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Tarefa ${id} não encontrada`);
    taskExampleData[index] = { ...taskExampleData[index], ...dto };
    return { ...taskExampleData[index] };
}

export async function deleteTask(id: string): Promise<void> {
    await delay();
    const index = taskExampleData.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Tarefa ${id} não encontrada`);
    taskExampleData.splice(index, 1);
}