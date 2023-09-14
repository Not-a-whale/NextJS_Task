import {ITask} from "@/app/shared/interfaces/task.interface";
import {ITag} from "@/app/shared/interfaces/tag.interface";

type Props = {
    task: ITask
}

export const Details = (props: Props) => {
    return (
        <div className="shadow-xl w-[80%] bg-neutral-content text-base-content my-0 mx-auto">
            <h2 className="text-3xl p-5">Podrobnosti:</h2>
            <div className="px-5 pb-5">
                <div className="text-2xl mb-5">
                    <span>Titulek: </span>
                    <span className="text-base-content block font-bold mb-2">{props.task.title}</span>
                </div>
                <div className="text-xl">
                    <span className="text-base-content block mb-2">Datum vytvoření: {props.task.dueDate}</span>
                    <div className="text-base-content my-2">
                        <span className="text-base-content">Tagy: </span>
                        {props.task.tags.map((tag: ITag, index: number) => (
                            <span key={index} className={`badge text-white bg-${tag.color} mx-2`}>{tag.tag}</span>
                        ))}
                    </div>
                    <span className="text-base-content my-2 block">Stav: {props.task.completed ? 'Dokončený' : 'Nedokončený'}</span>
                </div>
                <div className="text-2xl mt-5">
                    <span>Popis: </span>
                    <span className="text-base-content block font-bold mb-2 mt-2">{props.task.description}</span>
                </div>
            </div>
        </div>
    )
}