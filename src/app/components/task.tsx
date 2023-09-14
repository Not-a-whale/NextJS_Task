import {CompleteIcon} from "@/app/shared/icons/complete-icon";
import {EditIcon} from "@/app/shared/icons/edit-icon";
import {DeleteIcon} from "@/app/shared/icons/delete-icon";
import {TaskStatus} from "@/app/shared/enums/task-status.enum";
import {ITask} from "@/app/shared/interfaces/task.interface";
import {ChangeEvent} from "react";
import {ITag} from "@/app/shared/interfaces/tag.interface";
import {tag} from "postcss-selector-parser";

type Props = {
    task: ITask,
    index: number,
    addTaskId: (id: string, event: ChangeEvent<HTMLInputElement>) => void,
    removeTaskId: (ids: string[]) => void,
    completeTask: (ids: string[]) => any,
    editTask: (id: string) => void,
    checked: any,
}

export const Task = (props: Props) => {
    return (
        <div>
            <div tabIndex={props.index} className="collapse bg-base-200 m-2 w-100">
                <div className="collapse-title text-xl font-medium flex items-center justify-between md:flex-row xs:flex-col">
                    <div className="flex items-center xs:w-[100%] xs:justify-between md:w-[auto] md:justify-center">
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <input type="checkbox" className="checkbox checkbox-accent" checked={props.checked}  onChange={(event) => props.addTaskId(props.task._id, event)} />
                            </label>
                        </div>
                        <span className="label-text block w-max pl-3 text-xl xs:w-[100%] md:w-[auto]">{props.task.title}</span>
                    </div>
                    <div className="flex items-center">
                        <div className="py-2 px-2 cursor-pointer tooltip tooltip-left" data-tip="Dokončit úkol" onClick={() => props.completeTask([props.task._id])}>
                            <CompleteIcon />
                        </div>
                        <div className="py-2 px-2 cursor-pointer tooltip tooltip-left" data-tip="Upravit úkol" onClick={() => props.editTask(props.task._id)}>
                            <EditIcon />
                        </div>
                        <div className="py-2 pl-2 cursor-pointer tooltip tooltip-left" data-tip="Smazát úkol" onClick={() => props.removeTaskId([props.task._id])}>
                            <DeleteIcon />
                        </div>
                    </div>

                </div>
                <div className="collapse-content">
                    <div className="text-lg">
                        <span className="text-base-content block mb-2">Datum vytvoření: {props.task.dueDate}</span>
                        <div className="text-base-content my-2">
                            <span className="text-base-content">Tagy: </span>
                            {props.task.tags.map((tag: ITag, index: number) => (
                                <span key={index} className={`badge badge-outline text-white bg-${tag.color} mx-2`}>{tag.tag}</span>
                            ))}
                        </div>
                        <span className="text-base-content my-2 block">Stav: {props.task.completed ? TaskStatus.COMPLETED : TaskStatus.UNFINISHED}</span>
                    </div>
                    <p className="text-base-content text-2xl mt-5 border-2 py-5 px-5">{props.task.description}</p>
                </div>
            </div>
        </div>
    )
}