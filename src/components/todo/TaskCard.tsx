import { Task } from "@/types/task.types";
import { useState } from "react";

interface TaskCardProps{
    task: Task;
}
export default function TaskCard({ task }: TaskCardProps) {
    const [phase, setPhase] = useState(task.phase);
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{task.title}</h3>
            {phase === "a-fazer" && (
                <span className="text-sm text-gray-500">A fazer</span>
            )}
            {phase === "fazendo" && (
                <span className="text-sm text-gray-500">Fazendo</span>
            )}
            {phase === "feito" && (
                <span className="text-sm text-gray-500">Feito</span>
            )}
            <button type="button" className="mt-4 rounded bg-blue-600 px-3 py-2 text-sm text-white" onClick={() => setPhase("feito")}>
                {phase === "feito" ? "Concluída" : "Concluir task"}
            </button>
            {phase === "feito" && (
                <p className="mt-2 text-xs text-green-700">A task está pronta</p>
            )}
        </div>
    );
}