import {useState, useEffect} from "react";
import {deleteTask, fetchTasks} from "../api/index.js";
import { useNavigate } from "react-router-dom";

import UILoading from "../components/ui/Loading/UILoading.jsx";
import ActiveCard from '../components/active/active.jsx';

import useAppStore from "../store/app.js";


export default function Avtive() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const getAllTasks = async () => {
        const tasks = await fetchTasks();
        setTasks(tasks)
    }

    const del = async (taskId) => {
        setIsLoading(true)
        const task = await deleteTask(taskId)
        const tasks = await fetchTasks();

        console.log(task)

        setTasks(tasks)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        getAllTasks().then(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <UILoading/>
    } else {
        return <>
            <div className="tasks h-[450px] flex flex-col gap-[8px] mt-[15px]  p-[0px] overflow-y-scroll">
            <div className="mt-[20px]">
            <ActiveCard
                taskTitle="Username"
                taskDescription="active"
                status={true}
                action={() => action()}
                admin={true}
            />
        </div>
            </div>

             <button
                className="w-[90%] mx-auto mt-[15px] mb-[5px] bg-white h-[40px] text-black rounded-[8px]"
                onClick={() => navigate(`/admin/tasks/create`)}
                disabled={isLoading}
            >
                Create Task
            </button>
        </>
    }
}