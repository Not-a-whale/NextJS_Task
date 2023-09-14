import {TaskObject} from "@/app/api/tasks/route";
import clientPromise from "@/app/lib/mongodb";
import {ObjectId} from "bson";
import {ITask} from "@/app/shared/interfaces/task.interface";

export const createTask = async (task: Pick<ITask, Exclude<keyof ITask, "_id">>): Promise<TaskObject> => {
    const mongoClient = await clientPromise;
    const data = await mongoClient
        .db()
        .collection('tasks')
        .insertOne(task);

    console.log(data)

    return JSON.parse(JSON.stringify(data));
}
