import {NextApiRequest, NextApiResponse} from "next";
import {ObjectId} from "bson";
import {NextResponse} from "next/server";
import {getTask} from "@/app/lib/getTask";
import {getTasks} from "@/app/lib/getTasks";
import {TaskObject, TasksObject} from "@/app/api/tasks/route";
import {updateTask} from "@/app/lib/updateTask";
import {ITask} from "@/app/shared/interfaces/task.interface";

export type Params = {
    params: {
        taskId: string
    }
}

export const GET = async (
    req: NextApiRequest,
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
