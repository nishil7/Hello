"use server";

import Link from "next/link";

export default async function TaskList({targetPage}) {
  var taskList;
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    taskList = await response.json();
  } catch (error) {
    console.error("Error fetching Tasks:", error);
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-12 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Available Task
            </h3>
            <p className="text-gray-600 mt-2">
              You can select any of the following task.
            </p>
          </div>
        </div>
        <div className="mt-12 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-orange-400 font-medium border-b">
              <tr>
                <th className="py-3 pr-6">Task Id</th>
                <th className="py-3 pr-6">Task Title</th>
                <th className="py-3 pr-6">Task Status</th>
                <th className="py-3 pr-0 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {taskList.map((task) => (
                <tr key={task.id}>
                  <td className="pr-6 py-4 whitespace-nowrap">{task.id}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">{task.title}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${
                        task.completed == 1
                          ? "text-green-600 bg-green-50"
                          : "text-red-600 bg-blue-50"
                      }`}
                    >
                      {task.completed == 1 ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="text-right whitespace-nowrap">
                    <Link
                     href={`/${targetPage}/${task.id}`}
                      className="py-1.5 px-6 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                    >
                      View Task
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}