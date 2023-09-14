import {useState} from "react";
import {TagManagerModal} from "@/app/components/modals/tag-manager.modal";
import {ITag} from "@/app/shared/interfaces/tag.interface";

type Props = {
    tags: ITag[];
    changeTags: (tags: ITag[]) => void;
}

export const TagsManager = (props: Props) => {
    const [tags, setTags] = useState<ITag[]>(props?.tags || []);

    const removeTag = (tag: string) => {
        const newTags = tags.filter(t => t.tag !== tag);
        setTags(newTags);
        props.changeTags(newTags);
    }

    const addTag = (tag: ITag) => {
        setTags([...tags, tag]);
        props.changeTags([...tags, tag]);
    }

    const closeModal = () => {
        (document as any).getElementById('tag_manager_modal').close();
    }

    return (
        <div className="flex flex-row mb-2 xs:flex-col xs:justify-center md:flex-row md:justify-start xs:items-center md:items-end xs:justify-centers md:mb-5">
            <div className="flex flex-col w-[80%]">
                <span className="label text-2xl xs:text-center xs:block md:text-left md:inline-block">Tagy:</span>
                <div className="input input-bordered w-[100%] flex items-center xs:flex-col xs:h-max md:flex-row">
                    {tags?.map((tag: ITag, index: number) => (
                        <span key={index} className={`badge badge-lg xs:my-1 bg-${tag.color} text-white gap-2 mx-2 md:my-3`}>{tag.tag}
                            <span className="cursor-pointer" onClick={() => removeTag(tag.tag)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                               className="inline-block w-4 h-4 stroke-current">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </span>

                        </span>
                    ))}
                </div>
            </div>
            <button type="button" className="btn bg-primary ml-5 xs:ml-0 xs:mt-5 md:ml-5" onClick={()=> (document as any).getElementById('tag_manager_modal').showModal()}>Add tag</button>
            <TagManagerModal newTagFn={addTag} closeModal={closeModal} />
        </div>
    )
}