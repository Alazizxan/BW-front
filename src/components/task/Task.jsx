import './Task.css';

import React from 'react';
import StarIcon from "../../assets/images/star.svg"

const Task = ({ taskTitle, taskDescription, taskLink, status, action }) => {
  
    return (
      <div className="task">
        <div className="task__info">
          <img src={StarIcon} alt="star" />
          <div className="task__text">
            <span className="task__title">{taskTitle}</span>
            <span className="task__description">{taskDescription}</span>
          </div>
        </div>
        
        {!status ? (
          <a
            href={taskLink}
            onClick={(e) => {
              e.preventDefault();
              action();
            }}
            target="_blank"
            className="task__button"
          >
            Open
          </a>
        ) : (
          <a
            onClick={(e) => {
              e.preventDefault();
              action();
            }}
            className="task__button"
          >
            Passed
          </a>
        )}
      </div>
    );
  };
  
  export default Task;