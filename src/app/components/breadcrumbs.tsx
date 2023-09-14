import Link from "next/link";


export const Breadcrumbs = () => {
    return (
        <div className="text-xl p-5 breadcrumbs">
            <ul>
                <li ><Link href="/">Home</Link></li >
            </ul>
        </div>
    )
}