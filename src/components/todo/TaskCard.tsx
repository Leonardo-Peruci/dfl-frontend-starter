import { TASK_PHASE_LABELS } from "@/constants/task-phase.constant";
import { Task } from "@/types/task.types";
// import { useState } from "react";
import { Button } from "../ui";

interface TaskCardProps{
    task: Task;
    onCyclePhase: (task: Task) => void;
    onDelete: (id: string) => void;
    isBusy?: boolean;
}
export default function TaskCard({ task, onCyclePhase, onDelete, isBusy }: TaskCardProps) {
    // const [phase, setPhase] = useState(task.phase);
    return (
        // <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        //     <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{task.title}</h3>
        //     {phase === "a-fazer" && (
        //         <span className="text-sm text-gray-500">A fazer</span>
        //     )}
        //     {phase === "fazendo" && (
        //         <span className="text-sm text-gray-500">Fazendo</span>
        //     )}
        //     {phase === "feito" && (
        //         <span className="text-sm text-gray-500">Feito</span>
        //     )}
        //     <button type="button" className="mt-4 rounded bg-blue-600 px-3 py-2 text-sm text-white" onClick={() => setPhase("feito")}>
        //         {phase === "feito" ? "Concluída" : "Concluir task"}
        //     </button>
        //     {phase === "feito" && (
        //         <p className="mt-2 text-xs text-green-700">A task está pronta</p>
        //     )}
        // </div>
        <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
                </div>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                    {TASK_PHASE_LABELS[task.phase]}
                </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" size="sm" variant="secondary" disabled={isBusy} onClick={() => onCyclePhase(task)}>
                    Avançar fase
                </Button>
                <Button type="button" size="sm" variant="danger" disabled={isBusy} onClick={() => onDelete(task.id)}>
                    Apagar
                </Button>
            </div>
        </article>
    );
}