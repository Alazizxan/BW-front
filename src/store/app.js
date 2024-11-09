import {create} from 'zustand';
import {compleateTask, fetchFriends, fetchTasks, getStatus, register} from "../api/index.js";

import getFileLink from "../utils/file.js";


const useAppStore = create((set) => ({
    user: {},
    tasks: {},
    friends: [],
    profileImage: {},
    status: false,


    init: async (referall) => {
        const user = await register(referall)
        const friends = await fetchFriends(user.telegramId);
        const tasks = await fetchTasks(user.telegramId);
        const profileImage = await getFileLink(user.profileImage);
        const status = await getStatus();

        set({user, profileImage, status, friends, tasks});
    },

    passTask: async (taskId) => {
        set(async (state) => {
            await compleateTask(taskId, state.user.telegramId);
            const user = await register(state.user.telegramId);

            fetchTasks(state.user.telegramId).then(async (updatedTasks) => {
                set({ user: user})
                set({tasks: updatedTasks});
            });

            return {tasks: state.tasks, user: state.user};
        });
    }
}));


export default useAppStore;