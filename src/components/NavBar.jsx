import React from "react";

const NavBar = ({ setActivePage, activePage }) => {
  return (
    <div>
      <ul className="hidden sm:flex gap-10 sm:gap-5 justify-center items-center p-3">
        {[
          { name: "Project", key: "project" },
          { name: "Complete", key: "complete" },
          { name: "Task", key: "task" },
          { name: "Members", key: "members" },
        ].map((item) => (
          <li
            key={item.key}
            className={`font-medium hover:scale-105 transition-all cursor-pointer sm:text-2xl text-xl ${
              activePage === item.key
                ? "text-[#F87F16] font-bold"
                : "hover:text-[#F87F16]"
            }`}
            onClick={() => setActivePage(item.key)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
