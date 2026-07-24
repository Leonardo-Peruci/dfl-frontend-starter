import { Button } from "@/components/ui";
import { taskExampleData } from "@/test-utils/task.dummy";
import { Task } from "@/types/task.types";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, Loader2 } from "lucide-react"
import { Link } from "react-router-dom";
import TaskList from "@/components/todo/TaskList";

const delay = () => new Promise((resolve) => setTimeout(resolve, 3000));

export default function TaskPage(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const loadTasks = async () => {
        try {
            setLoading(true);
            await delay();
            setTasks([ ...taskExampleData ]);
        } catch (error){
            console.error(error);
        } finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        void loadTasks();
    }, []);
    return(
        <main className="space-y-4">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tasks</h1>
                <Link to="/">
                <Button className="gap-2">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Voltar
                </Button>
                </Link>
            </div>
            <p>
                Exemplo simples: a página busca o dummy com useState + useEffect — sem service e sem React
                Query.
            </p>
            {loading ? (
                <div className="flex h-full items-center justify-center gap-1">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p  className="text-gray-500">Carregando... </p>
                </div>
            ): tasks.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                    <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
                </div>
            ): (
                <TaskList task={tasks} />
            )}
        </main>
    );
}