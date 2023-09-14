import {ReactNode} from "react";

type Props = {
    children: ReactNode;
    closeModal: () => void;
    confirmModal: () => void;
}

export const DeletemModal = (props: Props) => {
    const handleCloseModal = () => {
        props.closeModal();
    }

    return (
        <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {props.children}
                <div className="modal-action flex justify-between">
                    <div className="btn bg-error" onClick={handleCloseModal}>Zavřít</div>
                    <div className="btn bg-info" onClick={props.confirmModal}>Potvrdit</div>
                </div>
            </div>
        </dialog>
    )
}