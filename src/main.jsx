import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Home.jsx";
import ForgetPassword from "./page/form/ForgetPassword";
import Login from "./page/form/Login";
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { combineReducers } from "@reduxjs/toolkit";
import {
  loginReducer,
  requestProjectComplete,
  requestMemberReducer,
  requestProject,
  requestTask,
  requestDashbord,
} from "./redux/reducer";

const rootReducer = combineReducers({
  loginReducer,
  requestMemberReducer,
  requestProjectComplete,
  requestProject,
  requestTask,
  requestDashbord,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
// .concat(logger)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
]);
createRoot(document.getElementById("root")).render(
  <>
    {" "}
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </>
);
