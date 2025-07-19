import React from "react";
import { FaCheckCircle, FaTasks } from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { IoPeopleSharp } from "react-icons/io5";

const NavforMoboile = ({ setActivePage, activePage }) => {
  return (
    <ul className="flex sm:hidden gap-3 justify-center items-center p-3">
      {[
        { icon: <GoProject />, key: "project" },
        { icon: <FaCheckCircle />, key: "complete" },
        { icon: <FaTasks />, key: "task" },
        { icon: <IoPeopleSharp />, key: "members" },
      ].map((item) => (
        <li
          key={item.key}
          className={`font-medium hover:scale-105 transition-all cursor-pointer sm:text-2xl text-xl ${
            activePage === item.key ? "text-[#F87F16]" : "hover:text-[#F87F16]"
          }`}
          onClick={() => setActivePage(item.key)}
        >
          {item.icon}
        </li>
      ))}
    </ul>
  );
};

export default NavforMoboile;
