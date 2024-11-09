import React from "react";
import useAppStore from "../store/app.js";

import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import Task from "../components/task/Task.jsx";

export default function Earn() {
    const app = useAppStore();

    return <>
        <UIStatus balance={true} user={{
            firstName: app.user.firstName,
            balance: app.user.balance,
            profileImage: app.profileImage
        }} />

        <UIPageIndicator page="Tasks" />

        <div className="tasks flex flex-col gap-[8px] mt-[15px] overflow-y-scroll">
              <Task
                    taskTitle={'Task'}
                    taskDescription="Comppleate task for rewards"
                    taskLink={"/earn"}
                    status={false}
                    action={() => { consoole.log("salom") } }
              />
        </div>
    </>
}

