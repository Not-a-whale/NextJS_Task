import {useForm} from "react-hook-form";
import {TagColors} from "@/app/shared/enums/tag-color.enum";
import {ITag} from "@/app/shared/interfaces/tag.interface";

type Props = {
    newTagFn: (tag: ITag) => void;
    closeModal: () => void;
}

export const TagManagerModal = (props: Props) => {

    const { register, getValues,  handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: {
            tag: "",
            color: TagColors.primary
        }
    });

    const handleCloseModal = () => {
        props.closeModal();
    }

    const handleSendTag = () => {
        const tags = getValues();
        if (!tags.tag || errors.tag || errors.color) {
            props.closeModal();
        } else {
            props.newTagFn(tags);
            props.closeModal();
        }
    }


    return (
        <dialog id="tag_manager_modal" className="modal modal-bottom sm:modal-middle">

            <div className="modal-box">
                <h3 className="text-center text-3xl">Přidat Tag</h3>
                <label className={`label text-2xl ${errors.tag && 'text-error'}`} htmlFor="tag">Tag</label>
                <input className={`input input-bordered max-w-lg text-xl mr-5 ml-0 mt-0 mb-2 ${errors.tag && 'input-error'}`} type="text" placeholder="tag" {...register("tag", {required: "Vyplňte prosím pole tagu", maxLength: {
                    value: 30,
                    message: "Maximální délka tagu je 30 znaků"
                    }})} />
                {errors.tag && <div className="text-error">{errors.tag.message}</div>}
                <label className={`label text-2xl ${errors.color && 'text-error'}`} htmlFor="color">Barva</label>
                <select className={`select select-bordered w-full max-w-xs text-xl mb-5 ${errors.color && 'select-error'}`} {...register("color")}>
                    {Object.values(TagColors).map((color: string, index: number) => {
                        return <option className={`bg-${color} text-white`} key={index} value={color}>{color}</option>
                    })}
                </select>
                <div className="modal-action flex justify-between">
                    <div className="btn bg-error" onClick={handleCloseModal}>Zavřít</div>
                    <div className="btn bg-info" onClick={handleSendTag}>Poslat</div>
                </div>
            </div>
        </dialog>
    )
}