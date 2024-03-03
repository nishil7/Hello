import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";

export default function Home() {
  return (
  <>
  <Navbar/>
  <TaskList targetPage={`viewTask`} />
  </>
  );
}
