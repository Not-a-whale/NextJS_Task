import {TaskObject, TasksObject} from "@/app/api/tasks/route";
import clientPromise from "@/app/lib/mongodb";
import {ITask} from "@/app/shared/interfaces/task.interface";
import { ObjectId } from "bson"

export const updateTask = async ({ task } : TaskObject): Promise<TaskObject> => {
    const mongoClient = await clientPromise;
    const data = await mongoClient
        .db()
        .collection('tasks')
        .updateOne({ _id: new ObjectId((task as ITask)._id)}, { $set: { description: task.description, dueDate: task.dueDate, tags: task.tags, title: task.title, completed: task.completed} });

    console.log(data)

    return JSON.parse(JSON.stringify(data));
}
