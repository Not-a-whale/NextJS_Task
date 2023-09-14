import {ITask} from "@/app/shared/interfaces/task.interface";
import {TaskContainer} from "@/app/components/task-container";

type Params = {
    params: {
        taskId: string
    }
}

export default async function TaskPage({ params } : Params) {

    return (
        <TaskContainer id={params.taskId} />
    )
}