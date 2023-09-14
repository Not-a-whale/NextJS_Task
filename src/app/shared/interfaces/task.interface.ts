import {ITag} from "@/app/shared/interfaces/tag.interface";

export interface ITask {
    _id: string;
    title: string;
    description: string;
    tags: ITag[];
    dueDate: string;
    completed: boolean;
}