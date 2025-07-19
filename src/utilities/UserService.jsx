import axios from "../Utilities/Axios";

export default {
  login: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/user/login", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error.response.data);
      return error.response.data;
    }
  },
  getMember: async () => {
    try {
      const response = await axios.get("/user/get");
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getComplete: async () => {
    try {
      const response = await axios.get("/project/completed");
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getProject: async () => {
    try {
      const response = await axios.get("/project/get-all-projects");
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error);

      return error.response.data;
    }
  },
  getDashbord: async () => {
    try {
      const response = await axios.get("/user/get-dashboard-data");
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error);

      return error.response.data;
    }
  },
  getNofication: async (id) => {
    try {
      const response = await axios.get(`/user/${id}/notifications`);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error);

      return error.response.data;
    }
  },
  getTask: async () => {
    try {
      const response = await axios.get("/task/get-tasks");
      // console.log("response task", response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addMember: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/user/register", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addTask: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/task/add-task", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addProject: async (form) => {
    // console.log("addProject",form);
    try {
      const response = await axios.post("/project/add-project", form);
      // console.log("addProject response ",response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  editMember: async (form) => {
    // console.log(form);
    try {
      const response = await axios.put(`/user/edit/${form.id}`, form);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error);
      return error.response.data;
    }
  },
  editTask: async (form) => {
    // console.log("updatedTask", form);
    try {
      const response = await axios.put(`/task/edit-task`, form);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error);
      return error.response.data;
    }
  },
  editProject: async (form) => {
    console.log("editProject", form);
    try {
      const response = await axios.put(`/project/edit/${form.id}`, form);
      console.log("editProject response", response);
      return response.data;
    } catch (error) {
      // console.log(error);
      return error.response.data;
    }
  },
  deleteMember: async (form) => {
    // console.log("form", form);
    try {
      const response = await axios.delete(`/user/delete/${form}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteNotification: async (form) => {
    // console.log("form", form);
    try {
      const response = await axios.delete(
        `/user/${form.userId}/notifications/${form.notificationId}`
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteTask: async (form) => {
    // console.log("form", form);
    try {
      const response = await axios.delete(`/task/delete-task/${form}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteProject: async (form) => {
    // console.log("form", form);
    try {
      const response = await axios.delete(`/project/delete-project/${form}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  forgetPassword: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/user/forgot-password", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  markNotificationAsRead: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post(
        "/user/mark-notification-as-read",
        form
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  confirmOtp: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/user/confirm-otp", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  resetPassword: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/user/new-password", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};
