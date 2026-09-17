import { Task } from "@/types/task.types"
import TaskCard from "./TaskCard"

interface TaskListProps {
    task: Task[]
}
export default function TaskList({ task }: TaskListProps) {
    if (task.length === 0) {
        return (
            <p className="text-sm text-gray-500" role="status">
                Nenhuma tarefa encontrada.
            </p>
        )
    }
    return (
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Tasks</h2>
            <div className="grid gap-4 sm:grid-cols-2">
                {task.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}