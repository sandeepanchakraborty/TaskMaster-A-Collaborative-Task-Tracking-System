import React, { useState } from "react";

const AddProject = ({ removePop, topic, projectAdd, allMembers }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("Medium");
  // console.log("allmembers:", allMembers);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      title,
      description,
      deadline: endDate,
      members: selectedMembers,
      priority,
      tasks,
    };
    const newItemtask = {
      title,
      description,
      deadline: endDate,
      assignees: selectedMembers,
      priority,
    };

    console.log("newItem", newItem);
    if (topic === "project") {
      projectAdd(newItem);
    }
    if (topic === "task") {
      projectAdd(newItemtask);
    }
    resetForm();
    removePop();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEndDate("");
    setSelectedMembers([]);
    setTasks([]);
    setPriority("Medium");
    setTask("");
  };

  const handleMemberSelection = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedMembers(selectedOptions);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { name: task, status: "To Do" }]);
      setTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-transparent rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New {topic === "project" ? "Project" : "Task"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Assign Members
          </label>
          <select
            multiple
            value={selectedMembers}
            onChange={handleMemberSelection}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          >
            {allMembers.map((member, i) => (
              <option key={i} value={member._id}>
                {`${member.firstName} ${member.lastName}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {topic === "project" && (
          <>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Add Tasks
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <button
                  type="button"
                  onClick={handleAddTask}
                  className="px-3 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Add Task
                </button>
              </div>
            </div>

            {tasks.length > 0 && (
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Task List
                </label>
                <ul className="list-disc pl-5 mt-2">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-1 bg-gray-100 p-2 rounded text-sm"
                    >
                      {task.name}
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(index)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        ✖
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetForm}
            className="px-2 py-1 bg-gray-400 mr-2 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 text-xl"
          >
            Clear
          </button>
          <button
            type="submit"
            className="group/btn relative w-fit overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
          >
            <div className="relative rounded-xl bg-slate-950/50 px-4 py-2 transition-colors group-hover/btn:bg-transparent">
              <span className="relative flex items-center justify-center gap-2 text-xl">
                Add {topic === "project" ? "Project" : "Task"}
              </span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
