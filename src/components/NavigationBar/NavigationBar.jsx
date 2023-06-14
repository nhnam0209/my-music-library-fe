import React from "react";
import { Link, Outlet } from "react-router-dom";

function NavigationBar() {
  const navigationBarItems = [
    {
      id: 1,
      label: "Home",
      url: "/",
    },
    {
      id: 2,
      label: "Search",
      url: "/search",
    },
    {
      id: 3,
      label: "Manage Music",
      url: "/manage-music",
    },
  ];

  const navigationBarItem = navigationBarItems.map((item) => {
    return (
      <div className="menuItem" key={item.id}>
        <li className=" mr-7 relative inline-flex items-center text-md lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200">
          <Link
            to={item.url}
            className={item.has_subNavigation ? "inline-flex" : "flex"}
          >
            {item.label}
            {item.has_subNavigation}
          </Link>
        </li>
      </div>
    );
  });
  return (
    <div>
      <div className="w-full mx-auto flex justify-center my-3 py-3 px-3">
        <nav className="w-full flex flex-row justify-between self-center px-3">
          <div className="flex self-center">
            <Link to="/" className="inline-flex">
              <img
                src="/logo512.png"
                alt="logo company"
                className="h-10 flex self-center items-center"
              />
            </Link>
          </div>

          <ul className="flex flex-row mx-5 text-xl items-center self-center">
            {navigationBarItem}
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default NavigationBar;
