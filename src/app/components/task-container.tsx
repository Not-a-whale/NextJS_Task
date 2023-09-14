"use client";
import {Details} from "@/app/components/details";
import {EditForm} from "@/app/components/edit-form";
import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchTask, queryClient, updateTask} from "@/app/lib/http";
import {FetchWrapper} from "@/app/components/fetch-wrapper";
import {ITask} from "@/app/shared/interfaces/task.interface";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Breadcrumbs} from "@/app/components/breadcrumbs";

type Props = {
    id: string,
}

export const TaskContainer = (props: Props) => {
    const router = useRouter();
    const {data, isLoading, isError, error, refetch} = useQuery({
        queryKey: ['tasks', props.id],
        queryFn: ({signal}) => fetchTask({signal, id: props.id}),
    });

    const { mutate, isLoading: isMutateLoading, isError: isMutateError, error: mutateError } = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks'], refetchType: 'all'});
            router.push('/');
        }
    });

    const onSubmit = (data: ITask) => {
        console.log(data)
        mutate({
            id: data._id,
            task: data
        });
    }


    return (<>
        <Breadcrumbs />
        <FetchWrapper error={error} data={data} isError={isError} isLoading={isLoading}>
            <div>
                <Details task={data}/>
                <EditForm task={data} handleSubmit={onSubmit} />
            </div>
        </FetchWrapper>

    </>)
}