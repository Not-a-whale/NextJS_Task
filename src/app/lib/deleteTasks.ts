import {TaskObject} from "@/app/api/tasks/route";
import clientPromise from "@/app/lib/mongodb";
import {ObjectId} from "bson";

export const deleteTasks = async (taskIds: string[]): Promise<TaskObject> => {
    const mongoClient = await clientPromise;
    const data = await mongoClient
        .db()
        .collection('tasks')
        .deleteMany({ _id: { $in: taskIds.map(id => new ObjectId(id)) } });

    console.log(data)

    return JSON.parse(JSON.stringify(data));
}
