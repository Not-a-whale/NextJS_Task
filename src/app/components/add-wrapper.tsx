"use client"
import {useMutation} from "@tanstack/react-query";
import {createNewEvent, queryClient} from "@/app/lib/http";
import {ITask} from "@/app/shared/interfaces/task.interface";
import {EditForm} from "@/app/components/edit-form";
import {useRouter} from "next/navigation";
import {Breadcrumbs} from "@/app/components/breadcrumbs";

export const AddWrapper = () => {
    const router = useRouter();
    const { mutate, isLoading: isMutateLoading, isError: isMutateError, error: mutateError } = useMutation({
        mutationFn: createNewEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks'], refetchType: 'none'});
            router.push('/')
        }
    });


    const onSubmit = (data: ITask) => {
        mutate({
            task: data
        });
    }

    return (<>
        <Breadcrumbs />
        <EditForm handleSubmit={onSubmit} />
    </>
    )
}