import {create} from 'zustand';
import {fetchFriends, getStatus, register} from "../api/index.js";

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
        const profileImage = await getFileLink(user.profileImage);
        const status = await getStatus();

        set({user, profileImage, status, friends});
    }
}));


export default useAppStore;