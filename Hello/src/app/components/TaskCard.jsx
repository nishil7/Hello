"use client";

import { assignTask } from "@/lib/UserState";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

const getTaskDetails = async (taskId) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${taskId}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Task:", error);
  }
};

const handleSubmit = async (dispatch, taskId) => {
  // todo
  dispatch(assignTask(taskId));

};

export default function TaskCard({ taskId }) {
  const [taskDetails, setTaskDetails] = useState({});
  useEffect(() => {
    const fetchTaskDetails = async () => {
      const taskData = await getTaskDetails(taskId);
      setTaskDetails(taskData);
    };

    fetchTaskDetails();
  }, [taskId]);
  const assignedTaskNumber = useAppSelector((state) => state.assignTask);
  const dispatch = useAppDispatch();
  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 py-4 text-gray-600 md:px-8 border-2 border-orange-400">
        <div className="flex flex-row">
          <div className="w-4/12">
            <h1 className="text-gray-500 font-semibold py-6 inline-block">
              TASK ID
            </h1>
            <span className="pl-4 py-2 text-orange-400 font-semibold">
              {taskDetails.id}
            </span>
          </div>
          <div>
            <p className=" px-8 py-6 text-orange-400 font-semibold">
              {taskDetails.title}
            </p>
          </div>
        </div>
        <div className="py-8">
          <h1 className="text-gray-500 font-semibold">TASK DESCRIPTION</h1>
        </div>
        <h1 className="text-gray-500 font-semibold py-6 inline-block w-5/12">
          PRIORITY
        </h1>
        <span
          className={`${
            taskDetails.completed == 1 ? "text-green-600" : "text-red-600"
          }`}
        >
          {taskDetails.completed == 1 ? "Completed" : "Pending"}
        </span>
        <div>
      
          {console.log(assignedTaskNumber)}
          {assignedTaskNumber === "-1" && (
            <button
              onClick={() => handleSubmit(dispatch, taskId)}
              className="w-full px-4 py-2 text-white font-medium bg-orange-400 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150"
            >
              CLAIM
            </button>
          )}
           {assignedTaskNumber === taskId && (
            <>
              <button
                onClick={() => handleSubmit(dispatch, "-1")}
                className="w-full px-4 py-2 text-white font-medium bg-orange-400 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150"
              >
                UNCLAIM
              </button>
              <button
                className="w-full mt-2 px-4 py-2 text-white font-medium bg-orange-400 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150"
              >
                Ask for Approval
              </button>
            </>
          )}
           {assignedTaskNumber !== "-1" && assignedTaskNumber !== taskId && (
            <button
              className="w-full px-4 py-2 text-white font-medium bg-orange-400 opacity-50 cursor-not-allowed rounded-lg duration-150"
            >
             You have Already Claimed Task
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
