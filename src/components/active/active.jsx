import './Active.css';
import React from 'react';
import { useNavigate } from "react-router-dom";
import StarIcon from "../../assets/images/star.svg"; // Eski icon
import NewIcon from "../../assets/images/star1.svg"; // Yangi icon qo'shildi

const ActiveCard = ({ user, admin }) => {
    const navigate = useNavigate();

    if (!admin) {
        return (
            <div className="task">
                <div className="task__info">
                    <img src={user.activation ? NewIcon : StarIcon} alt="icon" />
                    <div className="task__text">
                        <span className={`task__title`}>
                            {user.activation ? 'Premium User' : 'Simple User'}
                        </span>
                        <span className="task__description">
                            {user.activation ? 'active' : 'deactive'}
                        </span>
                    </div>
                </div>

                {!user.activation ? (
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            action();
                        }}
                        target="_blank"
                        className="task__button"
                    >
                        Activate
                    </a>
                ) : (
                    <span className="task__button2 disabled">
                        Active
                    </span>
                )}
            </div>
        );
    } else {
        return (
            <div className="task">
                <div className="task__info">
                    <img src={NewIcon} alt="new icon" />
                    <div className="task__text">
                        <span className="task__title">{user.firstName}</span>
                        <span className="task__description">
                            {user.activation ? 'active' : 'deactive'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-[5px]">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            del();
                        }}
                        className="task__button text-[14px] p-[0px]"
                    >
                        Confirm
                    </a>

                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`transaction/create/${user.telegramId}`); // Dinamik yo'naltirish
                        }}
                        className="task__button text-[14px] p-[0px]"
                    >
                        Transfer
                    </a>
                </div>
            </div>
        );
    }
};

export default ActiveCard;
