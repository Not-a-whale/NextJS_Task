"use client";

import {useForm} from "react-hook-form";
import {TaskStatus} from "@/app/shared/enums/task-status.enum";
import {ITask} from "@/app/shared/interfaces/task.interface";
import {TagsManager} from "@/app/components/tags-manager";
import {useState} from "react";
import {ITag} from "@/app/shared/interfaces/tag.interface";
import Datepicker from "react-tailwindcss-datepicker";

type Props = {
    task?: any | ITask,
    handleSubmit: (task: ITask | any) => void;
}

type FormValues = {
    completed: TaskStatus,
    title: string,
    description: string
}

export const EditForm = (props: Props) => {
    const [tags, setTags] = useState<ITag[]>(props?.task?.tags);
    const [dueDate, setDueDate] = useState({
        startDate: props?.task?.dueDate,
        endDate: props?.task?.dueDate
    });

    const handleDueDateChange = (newValue: any) => {
        setDueDate(newValue);
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: {
            title: props?.task?.title || "",
            description: props?.task?.description || "",
            completed: props?.task?.completed ? TaskStatus.COMPLETED : TaskStatus.UNFINISHED
        }
    });

    const changeTags = (tags: ITag[]) => {
        setTags(tags);
    }

    const onSubmit = (data: FormValues) => {
        console.log(props)
        const task: ITask | Pick<ITask, Exclude<keyof ITask, "_id">> = {...data, tags: tags, ...(props?.task?._id ? { _id: props.task._id } : {}), dueDate: dueDate.endDate, completed: data.completed === TaskStatus.COMPLETED};
        props.handleSubmit(task);
    }




    return (
        <div className="shadow-xl w-[80%] bg-neutral-content text-base-content my-20 mx-auto p-5 mt-20 text-base-content">
            <h2 className="text-3xl p-2">Upravit:</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <label className={`label text-2xl ${errors.title && 'text-error'}`} htmlFor="title">Titulek</label>
                <input className={`input input-bordered max-w-lg text-xl mr-5 ml-0 mt-0 mb-2 ${errors.title && 'input-error'}`} type="text" placeholder="Titulek" {...register("title", {required: "Vyplňte prosím pole titulky"})} />
                {errors.title && <span className="text-error">{errors.title.message as string}</span>}
                <label className={`label text-2xl ${errors.description && 'text-error'}`} htmlFor="description">Popis</label>
                <textarea
                    className={`textarea textarea-bordered mr-5 ml-0 mt-0 mb-2 text-xl xs:min-h-[10rem] xs:h-max md:min-h-[auto] ${errors.description && 'textarea-error'}`}
                    placeholder="Popis"
                    {...register("description", {required: "Vyplňte prosím pole popisu"})}
                ></textarea>
                {errors.description && <span className="text-error">{errors.description.message as string}</span>}
                <TagsManager tags={props?.task?.tags} changeTags={changeTags} />
                <div className="flex justify-between xs:flex-col xs:mt-5 md:flex-row md:mt-5 md:mb-10">
                    <div className="flex flex-row w-[100%] items-center">
                        <label className={`label text-2xl mr-5 ${errors.completed && 'text-error'}`} htmlFor="completed">Stav</label>
                        <select className={`select select-bordered w-full max-w-xs text-xl ${errors.title && 'select-error'}`} {...register("completed", { required: "Vyplňte prosím pole stavu" })}>
                            <option value={TaskStatus.COMPLETED}>{TaskStatus.COMPLETED}</option>
                            <option value={TaskStatus.UNFINISHED}>{TaskStatus.UNFINISHED}</option>
                        </select>
                        {errors.completed && <span className="text-error">{errors.completed.message}</span>}
                    </div>
                    <div className="flex flex-row w-[100%] items-center justify-end xs:mt-5 md:mt-0 mb-10 xs:mb-5 md:mb-[auto]">
                        <label className={`label text-2xl  mr-5 `}>Datum vytvoření:</label>
                        <div className="w-full max-w-xs flex items-center">
                            <Datepicker
                                asSingle={true}
                                value={dueDate}
                                onChange={handleDueDateChange}
                            />
                        </div>
                    </div>
                </div>
                <button className="btn bg-secondary w-min mx-auto" type="submit">Poslat</button>
            </form>
        </div>
    )
}