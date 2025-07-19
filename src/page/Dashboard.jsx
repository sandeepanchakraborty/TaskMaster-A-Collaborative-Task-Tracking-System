import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  FaBell,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaTrash,
} from "react-icons/fa";

import AlertDialogComponent from "@/components/AlertDialogComponent";
import NavforMoboile from "@/components/NavforMoboile";
import NavBar from "@/components/NavBar";
import ProjectPage from "@/page/ProjectPage";
import CompletePage from "./CompletePage";
import TaskPage from "./TaskPage";
import MembersPage from "./MembersPage";
import ProfilePage from "./ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, requestDashbordAction } from "@/redux/action";
import UserService from "@/utilities/UserService";
import timeAgo from "@/utilities/timeAgo";

const Dashboard = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { role, id } = useSelector((state) => {
    return state.loginReducer;
  });
  const whatUser = role;

  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const countUnreadNotification = () => {
    const total = notifications.filter(
      (notification) => !notification.isRead
    ).length;
    setUnreadNotifications(total);
  };

  const getNotific = async () => {
    try {
      const response = await UserService.getNofication(id);
      if (response?.success) {
        setNotifications(response.data);
      } else {
        console.error("Failed to fetch notifications:", response?.message);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    const form = { notificationId: notificationId, userId: id };
    try {
      const response = await UserService.deleteNotification(form);
      if (response?.success) {
        setNotifications(
          notifications.filter(
            (notification) => notification._id !== notificationId
          )
        );
        countUnreadNotification();
      } else {
        console.error("Failed to delete notification:", response?.message);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    const form = { notificationId: notificationId, userId: id };
    try {
      const response = await UserService.markNotificationAsRead(form);
      if (response?.success) {
        console.log("Notification marked as read:", notificationId);
      } else {
        console.error(
          "Failed to mark notification as read:",
          response?.message
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMessageClick = async (message, id) => {
    setSelectedMessage({ ...message, message: message.content });
    setIsMessageModalOpen(true);
    setIsNotificationOpen(false);

    setNotifications(
      notifications.map((item) =>
        item._id === id ? { ...item, isRead: true } : item
      )
    );

    await markNotificationAsRead(id);

    countUnreadNotification();
  };

  useEffect(() => {
    getNotific();
    countUnreadNotification();
    dispatch(requestDashbordAction());
  }, [dispatch, notifications]);

  const { dashbord } = useSelector((state) => {
    return state.requestDashbord;
  });

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleModalClose = () => {
    setIsMessageModalOpen(false);
    setSelectedMessage(null);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    dispatch(
      loginAction({
        token: "",
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        isLogged: false,
      })
    );
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-evenly items-center shadow-md p-5">
        <img
          src="/logo.jpeg"
          width={80}
          height={80}
          className="rounded-full"
          alt="Logo"
          onClick={() => {
            setActivePage("dashboard");
          }}
        />

        <NavBar setActivePage={setActivePage} activePage={activePage} />
        <NavforMoboile setActivePage={setActivePage} activePage={activePage} />

        <Menu as="div" className="relative flex">
          <div className="relative mr-4 mt-2">
            <div
              className="cursor-pointer hover:text-[#F87F16]"
              onClick={handleNotificationClick}
            >
              <FaBell className="text-xl" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {unreadNotifications}
                </span>
              )}
            </div>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-104 bg-white shadow-lg rounded-lg border z-50 max-h-96 overflow-y-auto">
                <ul>
                  {notifications.map((notification) => (
                    <li
                      key={notification._id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    >
                      <span
                        className="text-lg text-gray-700 flex items-center"
                        onClick={() =>
                          handleMessageClick(notification, notification._id)
                        }
                      >
                        <div className="flex flex-col text-sm font-semibold">
                          <div className="flex items-center">
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            )}
                            {notification.title}
                          </div>
                          <div className="font-medium mt-1 w-38 max-h-10 overflow-hidden text-ellipsis line-clamp-2">
                            {notification.content}
                          </div>
                        </div>
                      </span>
                      <button
                        className="text-red-500 hover:text-red-700 p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification._id);
                        }}
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <MenuButton className="focus:outline-none">
            <img
              src="/logo.jpeg"
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
              alt="Profile"
            />
          </MenuButton>

          <MenuItems className="absolute right-0 mt-8 w-38 bg-white shadow-lg rounded-lg border z-50">
            <MenuItem>
              {({ focus }) => (
                <button
                  className={`block text-xl sm:text-2xl sm:px-4 sm:py-2 text-gray-700 ${
                    focus ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setActivePage("profile");
                  }}
                >
                  Profile
                </button>
              )}
            </MenuItem>

            <MenuItem>
              {({ focus }) => (
                <button
                  className={`block w-full text-left text-xl px-1 sm:text-2xl sm:px-4 sm:py-2 text-red-600 ${
                    focus ? "bg-gray-200" : ""
                  }`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <div>
        <AlertDialogComponent
          isMessageModalOpen={isMessageModalOpen}
          setIsMessageModalOpen={setIsMessageModalOpen}
          selectedMessage={selectedMessage}
          handleModalClose={handleModalClose}
          title={"Alert"}
        />{" "}
        <AlertDialogComponent
          isMessageModalOpen={isLogoutModalOpen}
          setIsMessageModalOpen={setIsLogoutModalOpen}
          handleModalClose={() => setIsLogoutModalOpen(false)}
          selectedMessage={{
            title: "Confirm Logout",
            message: "Are you sure you want to log out?",
          }}
          onConfirm={confirmLogout}
        />
        {activePage === "project" && <ProjectPage whatUser={whatUser} />}
        {activePage === "complete" && <CompletePage />}
        {activePage === "task" && <TaskPage whatUser={whatUser} />}
        {activePage === "members" && <MembersPage whatUser={whatUser} />}
        {activePage === "profile" && <ProfilePage />}
        {activePage === "dashboard" && (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Total Tasks</h2>
                    <p className="text-3xl font-bold text-[#F87F16]">
                      {dashbord?.totalTasks || 0}
                    </p>
                  </div>
                  <FaTasks className="text-4xl text-[#F87F16]" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Completed Tasks</h2>
                    <p className="text-3xl font-bold text-green-500">
                      {dashbord?.completedProjects || 0}
                    </p>
                  </div>
                  <FaTasks className="text-4xl text-green-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Active Projects</h2>
                    <p className="text-3xl font-bold text-blue-500">
                      {dashbord?.activeProjects || 0}
                    </p>
                  </div>
                  <FaProjectDiagram className="text-4xl text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {whatUser === "admin" && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Total Members</h2>
                      <p className="text-3xl font-bold text-purple-500">
                        {dashbord?.teamMembers || 0}
                      </p>
                    </div>
                    <FaUsers className="text-4xl text-purple-500" />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {notifications.map((activity) => (
                  <div
                    key={activity._id}
                    className="flex items-center justify-between text-2xl font-normal p-4 bg-gray-50 rounded-lg"
                  >
                    <p className="text-gray-700">{activity.content}</p>
                    <span className="text-sm font-normal text-gray-500">
                      {timeAgo(activity.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
