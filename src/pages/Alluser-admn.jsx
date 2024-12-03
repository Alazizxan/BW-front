import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/app.js";
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import AllUserCard from "../components/alluseradmn/allUserCard.jsx";
import { fetchAllUsers } from "../api/index.js";
import "./alluser.css";

export default function AllUserAdmn() {
  const app = useAppStore();
  const navigation = useNavigate();
  const [alluser, setAlluser] = useState([]);

  const getAllUsr = async () => {
    try {
      const alluserData = await fetchAllUsers();
      setAlluser(alluserData);
    } catch (error) {
      console.error("Foydalanuvchilarni olishda xatolik:", error);
    }
  };

  useEffect(() => {
    getAllUsr();
  }, []);

  return (
    <>
      <div className="alluser">
        <UIPageIndicator page="All Users" />

        <div className="tasks h-[350px] flex flex-col gap-[8px] mt-[15px] overflow-y-scroll">
          {alluser.map((user, index) => (
            <AllUserCard
              key={index}
              user={user}
              index={index}
              onClick={() => navigation(`friends-admin/${user.telegramId}`)}
            />
          ))}
        </div>

        <div className="fixed mb-[1px] bottom-[55px] left-0 right-0 px-2">
          <button
            onClick={() => navigation("/admin/active")}
            className="w-full py-[9px] mb-[9px] text-black bg-white rounded-lg font-medium hover:bg-gray-500 transition-colors"
          >
            Request for Active
          </button>

          <button
            onClick={() => navigation("/admin")}
            className="w-full py-[9px] text-black bg-white rounded-lg font-medium hover:bg-gray-500 transition-colors"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    </>
  );
}
