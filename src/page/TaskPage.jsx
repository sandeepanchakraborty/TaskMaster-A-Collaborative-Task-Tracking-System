import React, { useEffect, useState } from "react";
import AddProject from "./form/AddProject";
import Card from "@/components/Card";
import EditProject from "@/components/EditProject";
import { requestMember, requestTaskAction } from "@/redux/action";
import { useDispatch, useSelector } from "react-redux";
import UserService from "@/utilities/UserService";
import { toast } from "react-toastify";

const TaskPage = ({ whatUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestMember());
    dispatch(requestTaskAction());
  }, [dispatch]);

  const { members } = useSelector((state) => {
    return state.requestMemberReducer;
  });

  const { tasks } = useSelector((state) => {
    return state.requestTask;
  });

  const removePop = () => {
    setIsModalOpen(false);
  };

  const openEdit = (task) => {
    setEditingTask({
      ...task,
      members: Array.isArray(task.members) ? task.members : [],
    });
  };

  const closeEdit = () => {
    setEditingTask(null);
    removePop();
  };

  const taskAdd = async (newTask) => {
    try {
      const response = await UserService.addTask(newTask);
      if (response?.success) {
        toast.success(response?.message);
        dispatch(requestTaskAction());
      } else {
        toast.error("Error adding task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error(error.message);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await UserService.editTask({
        ...updatedTask,
        taskId: updatedTask.id,
        assignees: updatedTask.members,
        whatUser: whatUser,
      });
      if (response?.success) {
        toast.success(response?.message);
        dispatch(requestTaskAction());
        removePop();
      } else {
        toast.error("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.message);
    }
    closeEdit();
  };

  const onDelete = async (id) => {
    try {
      const response = await UserService.deleteTask(id);
      if (response?.success) {
        toast.success(response?.message);
        dispatch(requestTaskAction());
      } else {
        toast.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4">
      {whatUser === "admin" ? (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group/btn relative w-full sm:w-auto overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset] text-xl"
          >
            <div className="relative rounded-xl bg-slate-950/50 px-4 py-2 transition-colors group-hover/btn:bg-transparent">
              <span className="relative flex items-center justify-center gap-2">
                Add Task
              </span>
            </div>
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {tasks.map((task) => (
          <Card
            key={task.id}
            project={task}
            openEdit={openEdit}
            title={"task"}
            onDelete={onDelete}
            whatUser={whatUser}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-lg text-gray-600 hover:text-red-400"
            >
              ✖
            </button>
            <AddProject
              removePop={removePop}
              topic="task"
              projectAdd={taskAdd}
              allMembers={members}
            />
          </div>
        </div>
      )}

      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 relative">
            <EditProject
              project={editingTask}
              onSave={updateTask}
              onCancel={closeEdit}
              allMembers={members}
              topic={"task"}
              whatUser={whatUser}
            />
          </div>
        </div>
      )}
      {tasks.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          <p>"No tasks found. Keep going! </p>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
