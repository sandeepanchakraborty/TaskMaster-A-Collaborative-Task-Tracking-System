import React, { useEffect, useState } from "react";
import Login from "./page/form/Login";
import Dashboard from "./page/Dashboard";
import AddMember from "./page/form/AddMember";
import { useDispatch, useSelector } from "react-redux";
import { requestMember } from "./redux/action";
import UserService from "./utilities/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const { isLogged } = useSelector((state) => state.loginReducer);
  const { members, isPending } = useSelector(
    (state) => state.requestMemberReducer
  );
  const dispatch = useDispatch();
  const [isAddingMember, setIsAddingMember] = useState(false);

  useEffect(() => {
    dispatch(requestMember());
  }, [dispatch]);
  const navigate = useNavigate();
  useEffect(() => {
    if (members && members.length === 0) {
      setIsAddingMember(true);
    }
    if (members !== undefined) {
    } else {
    }
  }, [members]);

  const memberAdd = async (newMember) => {
    try {
      const response = await UserService.addMember({
        ...newMember,
        role: "admin",
      });
      if (response?.success) {
        toast.success("the user is registster as admin");
        navigate("/login");
      }
    } catch (error) {}
  };
  return (
    <div className="text-3xl text-black">
      {isPending ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center gap-2 animate-fadeIn">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-gray-600">Assembling your squad... </p>
          </div>
        </div>
      ) : members.length === 0 && isAddingMember ? (
        <AddMember
          removePop={() => setIsAddingMember(false)}
          memberAdd={memberAdd}
        />
      ) : isLogged ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
