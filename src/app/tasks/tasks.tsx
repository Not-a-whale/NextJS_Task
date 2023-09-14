"use client"

import {useRouter} from 'next/navigation';
import {ITask} from "@/app/shared/interfaces/task.interface";
import {ChangeEvent, useState} from "react";
import {TaskSelector} from "@/app/components/task-selector";
import {Task} from "@/app/components/task";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteTasks, fetchTasks, queryClient, updateTasks} from "@/app/lib/http";
import {FetchWrapper} from "@/app/components/fetch-wrapper";
import {ConfirmModal} from "@/app/components/modals/confirm.modal";
import {DeletemModal} from "@/app/components/modals/deleteModal";

export const Tasks = () => {
    const router = useRouter();
    const [currentTaskArr, setCurrentTaskArr] = useState<string[]>([]);
    const [tasks, setTasks] = useState<string[]>([]);
    const [moduleString, setModuleString] = useState<string>('');
    const [checked, setChecked] = useState<boolean | null>();

    // React Query operations

    const { data, isLoading, isError, error } = useQuery(
        {
            queryKey: ['tasks'],
            queryFn: ({signal}) => fetchTasks({signal})
        }
    );

    const { mutate, isLoading: isPendingDeletion, isError: isErrorDeleting, error: deleteError } = useMutation({
        mutationFn: deleteTasks,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks'], refetchType: 'all'});
        }
    });

    const { mutate: mutateConfirm, isLoading: isPendingConfirmation, isError: isErrorConfirming, error: confirmError } = useMutation({
        mutationFn: updateTasks,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks'], refetchType: 'all'});
        }
    })


    function addTaskId(id: string, event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setTasks([...tasks, id]);
        } else {
            setTasks(tasks.filter((taskId: string) => taskId !== id));
        }
    }

    function handleOpenDeleteModal(ids: string[] | undefined) {
        console.log('ids', ids)
        if (ids) {
            setModuleString('Opravdu chcete smazát tento úkol?');
            setCurrentTaskArr(ids);
        } else {
            setModuleString(`Potvrzujete smazání těchto ${tasks.length} úkolů?`);
        }
        (document as any).getElementById('delete_modal').showModal();
    }

    function handleOpenCompleteModal(ids: string[] | undefined) {
        console.log('ids', ids)
        if (ids) {
            console.log(ids)
            setModuleString('Opravdu chcete skončit tento úkol?');
            setCurrentTaskArr(ids);
        } else {
            setModuleString(`Potvrzujete splnění těchto ${tasks.length} úkolů?`)
        }
        (document as any).getElementById('confirm_modal').showModal();
    }

    // closing modals
    const handleCloseDeleteModal = () => {
        (document as any).getElementById('delete_modal').close();
    }

    const handleCloseCompleteModal = () => {
        (document as any).getElementById('confirm_modal').close();
    }

    const handleCofirmCompleteModal = () => {
        // actual confirmation
        mutateConfirm(!!tasks.length ? tasks : currentTaskArr);
        handleClearing();
        handleCloseCompleteModal();
    }

    const handleCofirmDeleteModal = () => {
        // actual deletion
        mutate(!!tasks.length ? tasks : currentTaskArr);
        handleClearing();
        handleCloseDeleteModal();
    }

    // utility functions

    const handleClearing = () => {
        setTasks([]);
        setCurrentTaskArr([]);
        setChecked(false);
    }

    function editTask(id: string) {
        router.push(`/tasks/${id}`);
    }


    return (
        <>
            <div className="container py-10 pl-7 pr-10 bg-neutral-content shadow-lg rounded-md calligraffitti xs:mb-5">
                <h1 className={`w-full text-success text-center font-bold text-5xl mb-10 xs:text-3xl xs:mb-5 md:mb-10 md:text-5xl`}>Všechny úkoly</h1>
                <TaskSelector toComplete={tasks} toDelete={tasks} completeFn={() => handleOpenCompleteModal(undefined)} deleteFn={() => handleOpenDeleteModal(undefined)} />
                <FetchWrapper data={data} isLoading={isLoading} isError={isError} error={error}>
                    <div>
                        {data?.map((task: ITask, index: number) => (
                            <Task checked={checked} key={index} task={task} index={index} addTaskId={addTaskId} removeTaskId={() => handleOpenDeleteModal([task._id])} completeTask={() => handleOpenCompleteModal([task._id])} editTask={editTask} />
                        ))}
                    </div>
                </FetchWrapper>
                <ConfirmModal closeModal={handleCloseCompleteModal} confirmModal={handleCofirmCompleteModal}>
                    <div>
                        <p>{moduleString}</p>
                    </div>
                </ConfirmModal>
                <DeletemModal closeModal={handleCloseDeleteModal} confirmModal={handleCofirmDeleteModal}>
                    <div>
                        <p>{moduleString}</p>
                    </div>
                </DeletemModal>
            </div>
        </>
    )
}