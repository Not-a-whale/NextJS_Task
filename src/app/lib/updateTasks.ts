import {TaskObject} from "@/app/api/tasks/route";
import clientPromise from "@/app/lib/mongodb";
import {ObjectId} from "bson";

export const updateTasks = async (taskIds: string[]): Promise<TaskObject> => {

    const condition = { _id: { $in: taskIds.map(id => new ObjectId(id)) } };

    // Define the update operation to set the 'completed' field to true
    const updateOperation = {
        $set: {
            completed: true,
        },
    };

    const mongoClient = await clientPromise;
    const data = await mongoClient
        .db()
        .collection('tasks')
        .updateMany(condition, updateOperation);

    console.log(data)

    return JSON.parse(JSON.stringify(data));
}
