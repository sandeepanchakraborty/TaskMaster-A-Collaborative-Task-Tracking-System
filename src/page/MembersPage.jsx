import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import AddMember from "./form/AddMember";
import AlertDialogComponent from "@/components/AlertDialogComponent";
import EditMember from "@/components/EditMember";
import { useDispatch, useSelector } from "react-redux";
import { requestMember } from "@/redux/action";
import UserService from "@/utilities/UserService";
import { toast } from "react-toastify";

const MembersPage = ({ whatUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [expandedMember, setExpandedMember] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestMember());
  }, [dispatch]);

  const { members, error, isPending } = useSelector((state) => {
    return state.requestMemberReducer;
  });

  const memberAdd = async (newMember) => {
    try {
      const response = await UserService.addMember(newMember);
      if (response?.success) {
        toast.success(response?.message);
        dispatch(requestMember());
      } else {
        toast.error("Error adding member");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error(error.message);
    }
  };

  const removePop = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleDelete = (id) => {
    setSelectedMessage({
      message: "Are you sure you want to delete this member?",
      title: "Delete Member",
    });
    setDeleteId(id);
    setIsMessageModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await UserService.deleteMember(deleteId);
      if (response?.success) {
        toast.success(response?.message);
        dispatch(requestMember());
      } else {
        toast.error("Error deleting member");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error(error.message);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleModalClose = () => {
    setIsMessageModalOpen(false);
    setSelectedMessage(null);
  };

  const updateMember = async (updatedMember) => {
    try {
      const response = await UserService.editMember({
        ...updatedMember,
        id: updatedMember.id,
        whatUser: whatUser,
      });
      if (response?.success) {
        toast.success(response?.message);
        dispatch(requestMember());
        removePop();
      } else {
        toast.error("Error updating member");
      }
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error(error.message);
    }
  };

  const toggleExpand = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
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
                Add Member
              </span>
            </div>
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Members</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <React.Fragment key={member._id}>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 text-xl sm:text-2xl font-medium">
                      {member.firstName} {member.lastName}
                    </td>
                    <td className="p-3 text-xl sm:text-2xl font-medium">
                      {member.email}
                    </td>
                    <td className="p-3 text-xl sm:text-2xl font-medium">
                      {member.role}
                    </td>

                    <td className="p-3 text-center flex items-center justify-center">
                      {whatUser === "admin" ? (
                        <>
                          <button
                            onClick={() => handleEdit(member)}
                            className="text-blue-500 hover:text-blue-700 mx-2"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="text-red-500 hover:text-red-700 mx-2"
                          >
                            <FaTrash size={18} />
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                      <button
                        onClick={() => toggleExpand(member._id)}
                        className="text-gray-600 hover:text-gray-900 ml-2"
                      >
                        {expandedMember === member._id ? (
                          <FaChevronUp size={18} />
                        ) : (
                          <FaChevronDown size={18} />
                        )}
                      </button>
                    </td>
                  </tr>

                  {expandedMember === member._id && (
                    <tr className="border-b">
                      <td colSpan="4" className="p-3">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <h3 className="text-lg font-semibold mb-2">
                            Assigned Tasks
                          </h3>
                          {member.tasks?.length > 0 ? (
                            <ul className="space-y-2">
                              {member.tasks?.map((task) => (
                                <li
                                  key={task._id}
                                  className="flex justify-between items-center bg-white p-2 rounded shadow-sm"
                                >
                                  <span className="text-gray-800 text-lg font-medium">
                                    {task.title}
                                  </span>
                                  <span
                                    className={`px-2 py-1 rounded text-sm ${
                                      task.status === "Completed"
                                        ? "bg-green-200 text-green-800"
                                        : task.status === "In Progress"
                                        ? "bg-yellow-200 text-yellow-800"
                                        : "bg-red-200 text-red-800"
                                    }`}
                                  >
                                    {task.status}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 text-lg">
                              No tasks assigned.
                            </p>
                          )}
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <h3 className="text-lg font-semibold mb-2">
                            Assigned projects
                          </h3>
                          {member.projects?.length > 0 ? (
                            <ul className="space-y-2">
                              {member.projects?.map((task) => (
                                <li
                                  key={task._id}
                                  className="flex justify-between items-center bg-white p-2 rounded shadow-sm"
                                >
                                  <span className="text-gray-800 text-lg font-medium">
                                    {task.title}
                                  </span>
                                  <span
                                    className={`px-2 py-1 rounded text-sm ${
                                      task.status === "Completed"
                                        ? "bg-green-200 text-green-800"
                                        : task.status === "In Progress"
                                        ? "bg-yellow-200 text-yellow-800"
                                        : "bg-red-200 text-red-800"
                                    }`}
                                  >
                                    {task.status}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 text-lg">
                              No project assigned.
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={removePop}
              className="absolute top-2 right-2 text-lg text-gray-600 hover:text-red-400"
            >
              ✖
            </button>
            <AddMember removePop={removePop} memberAdd={memberAdd} />
          </div>
        </div>
      )}
      {editingMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={removePop}
              className="absolute top-2 right-2 text-lg text-gray-600 hover:text-red-400"
            >
              ✖
            </button>
            <EditMember
              removePop={removePop}
              onEdit={updateMember}
              member={editingMember}
            />
          </div>
        </div>
      )}
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

export default MembersPage;
