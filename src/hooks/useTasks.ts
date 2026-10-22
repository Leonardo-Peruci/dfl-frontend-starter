import { createTask, deleteTask, getTasks, updateTask } from "@/services/task.service";
import { CreateTaskDto, Task, UpdateTaskDto } from "@/types/task.types";
import { useCallback, useEffect, useState } from "react";

export function useTasks(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMutating, setIsMutating] = useState(false);
    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getTasks();
            setTasks(data);
        } catch {
            setError("Falha ao carregar tarefas.");
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        void load();
    }, [load]);
    const create = async (dto: CreateTaskDto) => {
        setIsMutating(true);
        try {
            await createTask(dto);
            await load();
        } finally {
            setIsMutating(false);
        }
    };
    const update = async (id: string, dto: UpdateTaskDto) => {
        setIsMutating(true);
        try {
            await updateTask(id, dto);
            await load();
        } finally {
            setIsMutating(false);
        }
    };
    const remove = async (id: string) => {
        setIsMutating(true);
        try {
            await deleteTask(id);
            await load();
        } finally {
            setIsMutating(false);
        }
    };
    return { tasks, isLoading, error, isMutating, create, update, remove, reload: load };
}
