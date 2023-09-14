import { QueryClient } from '@tanstack/react-query';
import {ITask} from "@/app/shared/interfaces/task.interface";

export const queryClient = new QueryClient();
const baseUrl = 'http://localhost:3000';

export async function fetchTasks({ signal }: any) {
    let url = `${baseUrl}/api/tasks`;

/*    if (searchTerm) {
        url += '?search=' + searchTerm;
    }*/

    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the tasks') as any;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }


    return await response.json();
}

export async function fetchTask({ id, signal }: any) {
    const response = await fetch(`${baseUrl}/api/tasks/${id}`, { signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the task') as any;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return await response.json();
}

export async function updateTask({ id, task }: any) {
    console.log('task', task);
    console.log('id', id);
    const response = await fetch(`${baseUrl}/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ task }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while updating the tasks') as any;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}



export async function createNewEvent({ task }: any) {
    const response = await fetch(`${baseUrl}/api/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while creating the task') as any;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return await response.json();
}

export async function deleteTasks(taskIds: string[]) {
    console.log(taskIds)
    const response = await fetch(`http://localhost:3000/api/tasks`, {
        method: 'DELETE',
        body: JSON.stringify(taskIds)
    });

    if (!response.ok) {
        const error = new Error('An error occurred while deleting the tasks') as any;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}

export async function updateTasks(taskIds: string[]) {
    console.log(taskIds)
    const response = await fetch(`http://localhost:3000/api/tasks`, {
        method: 'PATCH',
        body: JSON.stringify(taskIds)
    });

    if (!response.ok) {
        const error = new Error('An error occurred while updating the task') as any;
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}



