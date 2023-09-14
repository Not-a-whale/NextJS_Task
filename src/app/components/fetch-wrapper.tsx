import {ReactNode} from "react";

type Props = {
    children: ReactNode,
    data: any,
    isLoading: boolean,
    isError: boolean,
    error: any
}

export const FetchWrapper = (props: Props) => {
    let content;

    if (props.isLoading) {
        content = <span className="loading loading-infinity loading-lg"></span>;
    }

    if (props.isError) {
        content = <div>Error: {(props.error as any).message}</div>;
    }

    if (!props.data) {
        content = <span className="loading loading-infinity loading-lg mx-auto"></span>
        setTimeout(() => {
            content = <div className="mx-auto">No data</div>;
        }, 3000);
    }

    if (props.data) {
        content = props.children;
    }


    return (
        <>
            {content}
        </>
    )

}