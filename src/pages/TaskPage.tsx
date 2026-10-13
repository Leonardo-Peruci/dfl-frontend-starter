// import { taskExampleData } from "@/test-utils/task.dummy";
import { CreateTaskDto, Task } from "@/types/task.types";
import React, { useState } from "react";
// import { ArrowLeftIcon, Loader2 } from "lucide-react"
// import { Link } from "react-router-dom";
// import TaskList from "@/components/todo/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { TASK_PHASES, type TaskPhase } from "@/enums/task-phase.enum";
import { Button, EmptyState, ErrorState, LoadingState } from "@/components/ui";
import TaskList from "@/components/todo/TaskList";

// function wait(ms: number){
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }
const NEXT_PHASE: Record<TaskPhase, TaskPhase> = {
    a_fazer: "fazendo",
    fazendo: "feito",
    feito: "a_fazer",
};
const emptyForm: CreateTaskDto = {
    title: "",
    phase: "a_fazer",
}

export default function TaskPage(){
    const { tasks, isLoading, error, isMutating, create, update, remove, reload } = useTasks();
    const [form, setForm] = useState<CreateTaskDto>(emptyForm);
    // const [loading, setLoading] = useState<boolean>(true);
    // useEffect(() => {
    //     async function loadTasks(){
    //         setLoading(true);
    //         try {
    //             await wait(1500);
    //             setTasks(taskExampleData);
    //         } finally {
    //             setLoading(false); 
    //         }
    //     }
    //     loadTasks();
    // }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!form.title.trim()) return;
        await create(form);
        setForm(emptyForm);
    };
    const handleCyclePhase = async (task: Task) => {
        await update(task.id, {phase: NEXT_PHASE[task.phase]});
    };
    const handleDelete = async (id: string) => {
        if(!confirm("Excluir esta tarefa?")) return;
        await remove(id);
    }
    return(
        // <main className="space-y-4">
        //     <div className="flex items-center justify-between gap-2">
        //         <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tasks</h1>
        //         <Link to="/">
        //         <Button className="gap-2">
        //             <ArrowLeftIcon className="h-4 w-4" />
        //             Voltar
        //         </Button>
        //         </Link>
        //     </div>
        //     <p>
        //         Exemplo simples: a página busca o dummy com useState + useEffect — sem service e sem React
        //         Query.
        //     </p>
        //     {loading ? (
        //         <div className="flex h-full items-center justify-center gap-1">
        //             <Loader2 className="h-4 w-4 animate-spin" />
        //             <p  className="text-gray-500">Carregando... </p>
        //         </div>
        //     ): (
        //         <TaskList task={tasks} />
        //     )}
        // </main>
        <main className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tarefas</h1>
                {/* <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Atividade: CRUD com{" "}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useState</code> + service
                    direto — <strong>sem React Query</strong>. Compare com{" "}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useGetSuppliers</code> /{" "}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">useGetProducts</code>.
                </p> */}
            </header>
            <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Adicionar tarefa</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                        <label htmlFor="task-title" className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                            Título
                        </label>
                        <input
                            type="text"
                            id="task-title"
                            value={form.title}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            placeholder="Digite o título da tarefa"
                        />
                    </div>
                    <div>
                        <label htmlFor="task-phase" className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                            Fase
                        </label>
                        <select
                            id="task-phase"
                            value={form.phase}
                            onChange={(e) => setForm({...form, phase: e.target.value as TaskPhase})}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                            {TASK_PHASES.map((phase) => (
                                <option key={phase} value={phase}>
                                    {phase}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" disabled={isMutating}>
                        {isMutating ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </form>
            {isLoading && <LoadingState message="Carregando tarefas..." />}
            {error && <ErrorState message={error} onRetry={() => void reload()}/>}
            {!isLoading && !error && tasks.length === 0 && (
                <EmptyState message="Nenhuma tarefa encontrada." />
            )}
            {!isLoading && !error && tasks.length > 0 && (
                <TaskList task={tasks} onCyclePhase={handleCyclePhase} onDelete={handleDelete} isBusy={isMutating} />
            )}
        </main>
    );
}