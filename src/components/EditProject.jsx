import React, { useState } from "react";
import moment from "moment";

const formatDateForInput = (date) => {
  return moment(date, moment.ISO_8601, true).isValid()
    ? moment(date).format("YYYY-MM-DD")
    : date;
};

const EditProject = ({
  topic,
  project,
  onSave,
  onCancel,
  allMembers,
  whatUser,
}) => {
  // console.log("project edit", project);
  // console.log("allmember edit", allMembers);

  const [title, setTitle] = useState(project.title || "");
  const [description, setDescription] = useState(project.description || "");
  const [endDate, setEndDate] = useState(
    formatDateForInput(project.deadline) || ""
  );
  const [priority, setPriority] = useState(project.priority || "");
  const [status, setStatus] = useState(project.status || "");

  // State for selected members (pre-selected with the project's current members)
  const [selectedMembers, setSelectedMembers] = useState(
    Array.isArray(project.members)
      ? project.members.map((member) => member.id) // Store member IDs
      : []
  );

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(
    Array.isArray(project.tasks) ? project.tasks : []
  );

  // Handle member selection/deselection
  const handleMemberSelection = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedMembers(selectedOptions); // Update the state with the new selection
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (topic === "project") {
      onSave({
        id: project.id,
        title,
        description,
        deadline: endDate,
        priority,
        members: selectedMembers, // Save the updated members list (IDs)
        tasks,
      });
    }
    if (topic === "task") {
      onSave({
        id: project.id,
        title,
        description,
        deadline: endDate,
        priority,
        members: selectedMembers, // Save the updated members list (IDs)
        status,
      });
    }

    onCancel();
  };

  const handleAddTask = () => {
    if (task.trim() !== "" && !tasks.some((t) => t.name === task.trim())) {
      setTasks([...tasks, { name: task.trim(), status: "To Do" }]);
      setTask("");
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleTaskStatusChange = (index, newStatus) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, status: newStatus } : task
      )
    );
  };

  const isAdmin = whatUser === "admin";

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-80 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3 text-center">
          {topic === "task" ? "Edit Task" : "Edit Project"}
        </h2>
        <form onSubmit={handleSave}>
          {isAdmin && (
            <div className="mb-3">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                required
                disabled={!isAdmin && topic === "project"}
              />
            </div>
          )}

          {isAdmin && (
            <div className="mb-3">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                required
                disabled={!isAdmin && topic === "project"}
              />
            </div>
          )}

          {isAdmin && (
            <div className="mb-3">
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                required
                disabled={!isAdmin && topic === "project"}
              />
            </div>
          )}

          {isAdmin && (
            <div className="mb-3">
              <label className="block text-sm font-medium">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                disabled={!isAdmin && topic === "project"}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          )}

          {isAdmin && (topic === "project" || topic === "task") && (
            <div className="mb-3">
              <label className="block text-sm font-medium">
                Assign Members
              </label>
              <select
                multiple
                value={selectedMembers}
                onChange={handleMemberSelection}
                className="w-full p-2 border rounded text-sm"
              >
                {allMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {`${member.firstName} ${member.lastName}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {topic === "project" && (
            <>
              {isAdmin && (
                <div className="mb-3">
                  <label className="block text-sm font-medium">Tasks</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                      disabled={!isAdmin}
                    />
                    <button
                      type="button"
                      onClick={handleAddTask}
                      className="bg-green-500 text-white px-2 py-1 text-sm rounded"
                      disabled={!isAdmin}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {tasks.length > 0 && (
                <ul className="list-disc pl-4 mb-3 text-sm">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center space-x-2"
                    >
                      <span>{task.name}</span>

                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleTaskStatusChange(index, e.target.value)
                        }
                        className="border rounded text-xs p-1"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleDeleteTask(index)}
                          className="hover:text-red-500 text-xs"
                        >
                          ✖
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {topic === "task" && (
            <div className="mb-3">
              <label className="block text-sm font-medium">Task Status</label>
              <select
                value={status || "To Do"}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 bg-gray-400 text-white rounded text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="group/btn relative w-[93px] overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset] text-sm  "
            >
              <div className="relative rounded-xl bg-slate-950/50 px-1 py-2 transition-colors group-hover/btn:bg-transparent">
                <span className="relative flex items-center justify-center gap-2">
                  Save
                </span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
