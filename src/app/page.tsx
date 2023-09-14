
import {Tasks} from "@/app/tasks/tasks";

export default async function Home() {

  return (
    <main className="flex flex-col items-center justify-between p-10 md:p-[2rem] xs:p-0">
      <Tasks />
    </main>
  )
}
