import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import EditProject from "../components/EditProject";
import AddProject from "@/page/form/AddProject";
import { useDispatch, useSelector } from "react-redux";
import { requestMember, requestProjectAction } from "@/redux/action";
import UserService from "@/utilities/UserService";
import { toast } from "react-toastify";

const ProjectPage = ({ whatUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestMember());
    dispatch(requestProjectAction());
  }, [dispatch]);
  const { members } = useSelector((state) => {
    return state.requestMemberReducer;
  });

  const { projects } = useSelector((state) => {
    return state.requestProject;
  });

  const removePop = () => {
    setIsModalOpen(false);
  };

  const projectAdd = async (newProject) => {
    try {
      const response = await UserService.addProject(newProject);
      if (response?.success) {
        toast.success(response?.message);
        dispatch(requestProjectAction());
      } else {
        toast.error("Error adding project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error(error.message);
    }
  };

  const onDelete = async (id) => {
    try {
      const response = await UserService.deleteProject(id);
      if (response?.success) {
        toast.success(response?.message);
        dispatch(requestProjectAction());
      } else {
        toast.error("Error deleting project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(error.message);
    }
  };

  const openEdit = (projectEdit) => {
    setEditingProject({
      ...projectEdit,
      members: Array.isArray(projectEdit.members) ? projectEdit.members : [],
      tasks: Array.isArray(projectEdit.tasks) ? projectEdit.tasks : [],
      priority: projectEdit.priority || "",
      endDate: projectEdit.endDate || "",
    });
  };

  const closeEdit = () => {
    setEditingProject(null);
    removePop();
  };

  const updateProject = async (updatedProject) => {
    try {
      const response = await UserService.editProject({
        ...updatedProject,
        id: updatedProject.id,
        whatUser: whatUser,
      });
      if (response?.success) {
        toast.success(response?.message);
        dispatch(requestProjectAction());
        removePop();
      } else {
        toast.error("Error updating project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error(error.message);
    }
    closeEdit();
  };

  return (
    <div className="p-4">
      {whatUser === "admin" && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group/btn relative w-full sm:w-auto overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-[#F87F16] p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset] text-xl"
          >
            <div className="relative rounded-xl bg-slate-950/50 px-4 py-2 transition-colors group-hover/btn:bg-transparent">
              <span className="relative flex items-center justify-center gap-2">
                Add Project
              </span>
            </div>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  ">
        {projects.map((project) => (
          <Card
            key={project.id}
            project={project}
            title={"project"}
            openEdit={openEdit}
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
              topic={"project"}
              projectAdd={projectAdd}
              allMembers={members}
            />
          </div>
        </div>
      )}

      {editingProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 relative">
            <EditProject
              whatUser={whatUser}
              project={editingProject}
              onSave={updateProject}
              onCancel={closeEdit}
              allMembers={members}
              topic={"project"}
            />
          </div>
        </div>
      )}
      {projects.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          <p>"No projects yet. Wait until inspiration strikes!</p>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
