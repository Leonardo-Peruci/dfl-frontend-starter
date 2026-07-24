import { Task } from "@/types/task.types";

interface TaskCardProps{
    task: Task;
}
export default function TaskCard({ task }: TaskCardProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.status}</p>
        </div>
    );
}