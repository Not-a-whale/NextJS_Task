import {NextApiRequest, NextApiResponse} from "next";
import {ITask} from "@/app/shared/interfaces/task.interface";
import {ObjectId} from "bson";
import {NextResponse} from "next/server";
import {getTasks} from "@/app/lib/getTasks";
import {Params} from "@/app/api/tasks/[taskId]/route";
import {createTask} from "@/app/lib/createTask";
import {deleteTasks} from "@/app/lib/deleteTasks";
import {updateTasks} from "@/app/lib/updateTasks";

export interface TasksObject {
    tasks: ITask[];
}

export interface TaskObject {
    task: ITask | Pick<ITask, Exclude<keyof ITask, "_id">>;
}

export const GET = async (
    req: Request,
    res: any
): Promise<NextResponse<TasksObject>> => {
    let data = await getTasks();

    return NextResponse.json(data);
};

export const POST = async (
    req: Request,
    context: Params,
): Promise<NextResponse<TasksObject | TaskObject>> => {
    const body = await req.json();
    console.log(body);
    let data = await createTask(body);
    console.log(data)
    return NextResponse.json(data);
}

export const PUT = async (
    req: Request,
    context: Params,
): Promise<NextResponse<TasksObject | TaskObject>> => {
    const body = await req.json();
    console.log(body);
    let data = await createTask(body);
    console.log(data)
    return NextResponse.json(data);
}

export const DELETE = async (
    req: Request,
    context: Params,
): Promise<NextResponse<TasksObject | TaskObject>> => {
    const body = await req.json();
    console.log(body);
    let data = await deleteTasks(body);
    console.log(data)
    return NextResponse.json(data);
}

export const PATCH = async (
    req: Request,
    context: Params,
): Promise<NextResponse<TasksObject | TaskObject>> => {
    const body = await req.json();
    console.log(body);
    let data = await updateTasks(body);
    console.log(data)
    return NextResponse.json(data);
}