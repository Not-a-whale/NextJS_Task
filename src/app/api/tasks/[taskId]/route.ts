import {NextResponse} from "next/server";
import {getTask} from "@/app/lib/getTask";
import {TaskObject, TasksObject} from "@/app/api/tasks/route";
import {updateTask} from "@/app/lib/updateTask";

export type Params = {
    params: {
        taskId: string
    }
}

export const GET = async (
    req: Request,
    context: Params
): Promise<NextResponse<TasksObject | TaskObject>> => {

    let data = await getTask(context.params.taskId);

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    context: Params,
): Promise<NextResponse<TasksObject | TaskObject>> => {
        const body = await req.json();
        console.log(body);
        let data = await updateTask(body);
        console.log(data)
        return NextResponse.json(data);
}
