import {ITag} from "@/app/shared/interfaces/tag.interface";
import {useForm} from "react-hook-form";
import {TagColors} from "@/app/shared/enums/tag-color.enum";
import {ReactNode} from "react";

type Props = {
    children: ReactNode;
    closeModal: () => void;
    confirmModal: () => void;
}

export const ConfirmModal = (props: Props) => {
    const handleCloseModal = () => {
        props.closeModal();
    }

    return (
        <dialog id="confirm_modal" className="modal modal-bottom sm:modal-middle">
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