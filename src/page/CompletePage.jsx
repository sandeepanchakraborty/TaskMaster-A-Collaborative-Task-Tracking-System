import Card from "@/components/Card";
import { requestComplete, requestProjectAction } from "@/redux/action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CompletePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestComplete());
    dispatch(requestProjectAction());
  }, [dispatch]);

  const { completedProjects = [] } = useSelector((state) => {
    return state.requestProjectComplete || {};
  });

  const { projects = [] } = useSelector((state) => {
    return state.requestProject || {};
  });

  const totalProjects = projects?.length ?? 0;
  const completedCount = completedProjects?.length ?? 0;
  const completionPercentage =
    totalProjects > 0 ? ((completedCount / totalProjects) * 100).toFixed(2) : 0;

  return (
    <div className="p-4">
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Project Completion
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-[#F87F16] h-4 rounded-full "
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm sm:text-xl text-gray-600">
            {completedCount}/{totalProjects} projects completed (
            {completionPercentage}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {completedProjects?.map((project) => (
          <Card key={project.id} project={project} title={"complete"} />
        ))}
      </div>

      {completedCount === 0 && (
        <div className="text-center text-gray-600 mt-8">
          <p>No completed projects yet. Keep working! 🚀</p>
        </div>
      )}
    </div>
  );
};

export default CompletePage;
