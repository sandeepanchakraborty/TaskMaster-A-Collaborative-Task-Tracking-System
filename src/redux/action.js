import UserService from "@/utilities/UserService";
import {
  LOGIN_SUCCUSS,
  REQUEST_MEMBER_FAILED,
  REQUEST_MEMBER_SUCCESS,
  REQUEST_MEMBER_PENDING,
  REQUEST_CONPLETE_FAILED,
  REQUEST_CONPLETE_SUCCESS,
  REQUEST_CONPLETE_PENDING,
  REQUEST_PROJECT_FAILED,
  REQUEST_PROJECT_SUCCESS,
  REQUEST_PROJECT_PENDING,
  REQUEST_TASK_FAILED,
  REQUEST_TASK_SUCCESS,
  REQUEST_TASK_PENDING,
  REQUEST_DASHBORD_FAILED,
  REQUEST_DASHBORD_SUCCESS,
  REQUEST_DASHBORD_PENDING,
} from "./constants";

export const loginAction = (userData) => {
  return {
    type: LOGIN_SUCCUSS,
    payload: userData,
  };
};

export const requestMember = () => async (dispatch) => {
  dispatch({ type: REQUEST_MEMBER_PENDING });
  try {
    const response = await UserService.getMember();

    // console.log("member", response);
    dispatch({ type: REQUEST_MEMBER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REQUEST_MEMBER_FAILED, payload: error.message });
  }
};
export const requestComplete = () => async (dispatch) => {
  dispatch({ type: REQUEST_CONPLETE_PENDING });
  try {
    const response = await UserService.getComplete();

    // console.log("com project: ", response);
    dispatch({ type: REQUEST_CONPLETE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REQUEST_CONPLETE_FAILED, payload: error.message });
  }
};
export const requestProjectAction = () => async (dispatch) => {
  dispatch({ type: REQUEST_PROJECT_PENDING });
  try {
    const response = await UserService.getProject();

    // console.log("com project: ", response);
    dispatch({ type: REQUEST_PROJECT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REQUEST_PROJECT_FAILED, payload: error.message });
  }
};
export const requestTaskAction = () => async (dispatch) => {
  dispatch({ type: REQUEST_TASK_PENDING });
  try {
    const response = await UserService.getTask();

    // console.log("tasks: ", response);
    dispatch({ type: REQUEST_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REQUEST_TASK_FAILED, payload: error.message });
  }
};
export const requestDashbordAction = () => async (dispatch) => {
  dispatch({ type: REQUEST_DASHBORD_PENDING });
  try {
    const response = await UserService.getDashbord();

    // console.log("tasks: ", response);
    dispatch({ type: REQUEST_DASHBORD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: REQUEST_DASHBORD_FAILED,
      payload:
        error.response?.data?.message || error.message || "Unknown error",
    });
  }
};
