import {
  LOGIN_SUCCUSS,
  REQUEST_MEMBER_FAILED,
  REQUEST_MEMBER_SUCCESS,
  REQUEST_MEMBER_PENDING,
  REQUEST_CONPLETE_PENDING,
  REQUEST_CONPLETE_SUCCESS,
  REQUEST_CONPLETE_FAILED,
  REQUEST_PROJECT_PENDING,
  REQUEST_PROJECT_SUCCESS,
  REQUEST_PROJECT_FAILED,
  REQUEST_TASK_PENDING,
  REQUEST_TASK_SUCCESS,
  REQUEST_TASK_FAILED,
  REQUEST_DASHBORD_PENDING,
  REQUEST_DASHBORD_SUCCESS,
  REQUEST_DASHBORD_FAILED,
} from "./constants";

const initialStateSearch = {
  token: "",
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  isLogged: false,
};

export const loginReducer = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case LOGIN_SUCCUSS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initialStateMember = {
  isPending: false,
  members: [],
  error: "",
};
export const requestMemberReducer = (
  state = initialStateMember,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_MEMBER_PENDING:
      return { ...state, isPending: true };
    case REQUEST_MEMBER_SUCCESS:
      return { ...state, isPending: false, members: action.payload };
    case REQUEST_MEMBER_FAILED:
      return { ...state, isPending: false, error: action.payload };
    default:
      return state;
  }
};
const initialStateComplete = {
  isPendingComplete: false,
  completedProjects: [],
  errorComplete: "",
};
export const requestProjectComplete = (
  state = initialStateComplete,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_CONPLETE_PENDING:
      return { ...state, isPendingComplete: true };
    case REQUEST_CONPLETE_SUCCESS:
      return {
        ...state,
        isPendingComplete: false,
        completedProjects: action.payload,
      };
    case REQUEST_CONPLETE_FAILED:
      return {
        ...state,
        isPendingComplete: false,
        errorComplete: action.payload,
      };
    default:
      return state;
  }
};

const initialStateProject = {
  isPendingProject: false,
  projects: [],
  errorProject: "",
};
export const requestProject = (state = initialStateProject, action = {}) => {
  switch (action.type) {
    case REQUEST_PROJECT_PENDING:
      return { ...state, isPendingProject: true };
    case REQUEST_PROJECT_SUCCESS:
      return { ...state, isPendingProject: false, projects: action.payload };
    case REQUEST_PROJECT_FAILED:
      return {
        ...state,
        isPendingProject: false,
        errorProject: action.payload,
      };
    default:
      return state;
  }
};
const initialStateTask = {
  isPendingTask: false,
  tasks: [],
  errorTask: "",
};
export const requestTask = (state = initialStateTask, action = {}) => {
  switch (action.type) {
    case REQUEST_TASK_PENDING:
      return { ...state, isPendingTask: true };
    case REQUEST_TASK_SUCCESS:
      return { ...state, isPendingTask: false, tasks: action.payload };
    case REQUEST_TASK_FAILED:
      return {
        ...state,
        isPendingTask: false,
        errorTask: action.payload,
      };
    default:
      return state;
  }
};

const initialStateDashbord = {
  isPendingDashbord: false,
  dashbord: [],
  errorDashbord: "",
};
export const requestDashbord = (state = initialStateDashbord, action = {}) => {
  switch (action.type) {
    case REQUEST_DASHBORD_PENDING:
      return { ...state, isPendingDashbord: true };
    case REQUEST_DASHBORD_SUCCESS:
      return { ...state, isPendingDashbord: false, dashbord: action.payload };
    case REQUEST_DASHBORD_FAILED:
      return {
        ...state,
        isPendingDashbord: false,
        errorDashbord: action.payload,
      };
    default:
      return state;
  }
};
