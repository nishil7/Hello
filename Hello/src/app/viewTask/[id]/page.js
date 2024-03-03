import Navbar from "@/app/components/Navbar"
import TaskCard from "@/app/components/TaskCard"

export default function page ({params}) {
  return (
  <>
    <Navbar/>
    <TaskCard taskId={params.id}/></>
  )
}

