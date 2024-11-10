import {useState} from "react";

export default function Statistic () {
    const [count, setCount] = useState(1000);
    return <>
        <div className="statistic">

            <div className="count flex flex-col items-center justify-center mt-[50px]">
                <span className="count-title text-xl">Total users: </span>
                <span className={'text-[50px]'}>{count}</span>
            </div>
        </div>
    </>
}