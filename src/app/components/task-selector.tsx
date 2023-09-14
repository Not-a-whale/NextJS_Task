"use client";

import {DeleteIcon} from "@/app/shared/icons/delete-icon";
import {CompleteIcon} from "@/app/shared/icons/complete-icon";
import {AddIcon} from "@/app/shared/icons/add-icon";
import { useRouter } from 'next/navigation';
import {ITask} from "@/app/shared/interfaces/task.interface";
import Link from "next/link";


type Props = {
    toComplete: string[],
    toDelete: string[],
    completeFn: (id: string[]) => void,
    deleteFn: (id: string[]) => void,
}

export const TaskSelector = (props: Props) => {
    return (
        <div className="flex xs:flex-col sm:flex-row items-center mb-5 ml-2">
            <Link href="/tasks/add-task" className="btn xs:my-2">
                Přidat úkol
                <AddIcon />
            </Link>
            {!!props.toComplete.length && <button className="btn ml-5 xs:my-2" onClick={() => props.completeFn(props.toComplete)}>
                K dokončení <span className="badge ml-2">{props.toComplete.length}</span>
                <CompleteIcon />
            </button>}
            {!!props.toDelete.length && <button className="btn ml-5 xs:my-2" onClick={() => props.deleteFn(props.toDelete)}>
                K smazání <span className="badge ml-2">{props.toDelete.length}</span>
                <DeleteIcon />
            </button>}
        </div>
    )
}