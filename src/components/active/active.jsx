import './Active.css';
import React from 'react';
import StarIcon from "../../assets/images/star.svg"; // Eski icon
import NewIcon from "../../assets/images/star1.svg"; // Yangi icon qo'shildi

const ActiveCard = ({ taskTitle, taskDescription,  status, action, admin, update, del }) => {
    if (!admin) {
        return (
            <div className="task">
                <div className="task__info">
                <img src={status ? NewIcon : StarIcon} alt="icon" /> {/* Yangi icon */}
                    <div className="task__text">
                        <span 
                            className={`task__title ${status ? 'active-title' : ''}`}> {/* Agar status active bo'lsa, maxsus class qo'shildi */}
                            {taskTitle}
                        </span>
                        <span className="task__description">{taskDescription}</span>
                    </div>
                </div>

                {!status ? (
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
                    <span className="task__button2 disabled"> {/* Bosilmaydigan class qo'shildi */}
                        Active
                    </span>
                )}
            </div>
        );
    } else {
        return (
            <div className="task">
                <div className="task__info">
                    <img src={NewIcon} alt="new icon" /> {/* Yangi icon */}
                    <div className="task__text">
                        <span className="task__title">{taskTitle}</span> {/* Adminda title usernamega teng */}
                        <span className="task__description">{taskDescription}</span> {/* Adminda description walletga teng */}
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
                        Confirm {/* Delete o'rniga Confirm */}
                    </a>

                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            update();
                        }}
                        className="task__button text-[14px] p-[0px]"
                        href="/transfer-page" // Transfer sahifasiga yo'naltiradi
                    >
                        Transfer {/* Update o'rniga Transfer */}
                    </a>
                </div>
            </div>
        );
    }
};

export default ActiveCard;
