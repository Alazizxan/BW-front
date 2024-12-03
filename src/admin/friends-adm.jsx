import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAppStore from "../store/app.js";
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import Friend from "../components/friend/Friend.jsx";
import { fetchFriends } from "../api/index.js";
import { useNavigate } from "react-router-dom";

export default function FriendsAdmin() {
  const app = useAppStore();
  const { telegramId } = useParams();
  const navigation = useNavigate();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFriends = async () => {
    try {
      setLoading(true);
      const friendsData = await fetchFriends(telegramId);
      setFriends(friendsData);
    } catch (error) {
      console.error("Do'stlarni olishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, [telegramId]);

  return (
    <>
    <div className="alluser">
      <UIPageIndicator page="Friends Admin" />

      {loading ? (
        <p>Loading friends...</p>
      ) : (
        <div className="tasks max-h-[320px] flex flex-col gap-[8px] mt-[15px] overflow-y-scroll">
          {friends.map((friend, index) => (
            <Friend
              key={index}
              profileImage={friend.profileImage}
              friendName={friend.firstName}
              money={friend.balance}
              clock={friend.time}
              date={friend.date}
            />
          ))}
        </div>
      )}
      <div className="fixed mb-[1px] bottom-[55px] left-0 right-0 px-2">
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
