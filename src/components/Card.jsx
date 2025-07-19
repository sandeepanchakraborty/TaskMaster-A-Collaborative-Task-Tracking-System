import { formatDateTime } from "@/utilities/timeFormat";
import React, { useState } from "react";
import { FaTasks, FaCalendarAlt } from "react-icons/fa";
import AlertDialogComponent from "./AlertDialogComponent";

import { compareDates } from "@/utilities/compareDates";

const Card = ({ project, openEdit, title, onDelete, whatUser }) => {
  //for notification
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleModalClose = () => {
    setIsMessageModalOpen(false);
    setSelectedMessage(null);
  };
  // console.log("project in cord", project);
  const handelDelete = (id) => {
    setSelectedMessage({
      message: "Are you sure you went to delete this",
      title: "Delete",
    });
    setDeleteId(id);
    setIsMessageModalOpen(true);
  };
  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const getTaskBorderColor = (status) => {
    switch (status) {
      case "Completed":
        return "border-green-500";
      case "In Progress":
        return "border-yellow-500";
      case "To Do":
      default:
        return "border-gray-400";
    }
  };

  var completedTasks = 0;
  var totalTasks = 0;

  if (title === "project" || title === "complete") {
    completedTasks = project.tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    totalTasks = project.tasks.length;
  } else if (title === "task") {
    completedTasks = project.status === "Completed" ? 1 : 0;
    totalTasks = 1;
  }

  return (
    <div className="group relative w-full sm:w-80 m-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-black shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25 ">
        <div className="relative rounded-2xl bg-slate-100 p-6">
          <h3
            className={`text-xl font-medium uppercase tracking-wider ${
              project.priority === "High"
                ? "text-red-500"
                : project.priority === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {project.priority}
          </h3>

          <div className="relative">
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black">
                {project.title}
              </span>
            </div>
            <p className="mt-2 text-lg text-slate-500">{project.description}</p>
          </div>

          <div className="mt-4 space-y-2 ">
            <div className="flex items-center gap-2">
              <FaTasks className="text-[#F87F16] text-2xl" />
              <span className="text-lg text-gray-600 ">
                {completedTasks}/{totalTasks} tasks completed
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#F87F16] text-2xl" />
              <span className="text-[18px] text-gray-600">
                {project.status !== "Completed"
                  ? formatDateTime(project.deadline)
                  : compareDates(project.taskTimeCompleted, project.deadline)}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Members</h3>
            <ul className="list-disc pl-4 text-[18px] text-gray-600">
              {project.members.map((member) => (
                <li key={member.id}>{member.name}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {title == "project" ? "Tasks" : "The task status is: "}
            </h3>
            <ul className="space-y-2">
              {title !== "task" ? (
                project.tasks.map((task, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 p-2 border-l-4 ${getTaskBorderColor(
                      task.status
                    )}`}
                  >
                    <span className="text-lg text-gray-700">{task.name}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : task.status === "In Progress"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </li>
                ))
              ) : (
                <li
                  className={`flex  items-center gap-2 p-2 border-l-4 ${getTaskBorderColor(
                    project.status
                  )}`}
                >
                  <span
                    className={`text-lg px-2 py-1 rounded-full ${
                      project.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : project.status === "In Progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </li>
              )}
            </ul>
          </div>

          {title == "complete" ? (
            ""
          ) : whatUser === "admin" ? (
            <div className="flex">
              <div className="relative mt-8  w-fit mr-3">
                <button
                  onClick={() => handelDelete(project.id)}
                  className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-700 to-[#E91E63] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
                >
                  <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                    <span className="relative flex items-center justify-center gap-2 text-xl">
                      Delete
                    </span>
                  </div>
                </button>
              </div>
              <div className="relative mt-8  w-full ">
                <button
                  onClick={() => openEdit(project)}
                  className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
                >
                  <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                    <span className="relative flex items-center justify-center gap-2 text-xl">
                      Edit
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                      >
                        <path
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative mt-8  w-full ">
              <button
                onClick={() => openEdit(project)}
                className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
              >
                <div className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
                  <span className="relative flex items-center justify-center gap-2 text-xl">
                    Edit
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    >
                      <path
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      <AlertDialogComponent
        isMessageModalOpen={isMessageModalOpen}
        setIsMessageModalOpen={setIsMessageModalOpen}
        selectedMessage={selectedMessage}
        handleModalClose={handleModalClose}
        title={"delete"}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Card;
