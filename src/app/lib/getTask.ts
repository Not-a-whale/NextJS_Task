import clientPromise from "@/app/lib/mongodb";
import {ObjectId} from "bson";
import {TaskObject} from "@/app/api/tasks/route";

export const getTask = async (id: string): Promise<TaskObject> => {
    console.log('safsaf', id);
    console.log('safsaf', new ObjectId(id))
    const mongoClient = await clientPromise;

    const data = await mongoClient
        .db()
        .collection('tasks')
        .findOne({_id: new ObjectId(id)});

    return JSON.parse(JSON.stringify(data));
}
