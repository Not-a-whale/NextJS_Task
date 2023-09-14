import clientPromise from "@/app/lib/mongodb";
import {ITask} from "@/app/shared/interfaces/task.interface";
import {TasksObject} from "@/app/api/tasks/route";

export const getTasks = async (): Promise<TasksObject> => {
    const mongoClient = await clientPromise;

    const data = (await mongoClient
        .db()
        .collection('tasks')
        .find()
        .toArray())
        .map((doc) => {
            return {...doc,
                _id: doc._id.toString()};
        }) as ITask[];

    return JSON.parse(JSON.stringify(data));
};
