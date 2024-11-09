import {create} from 'zustand';
import {register} from "../api/index.js";
import getFileLink from "../utils/file.js";

const useAppStore = create((set) => ({
    user: {},
    tasks: {},
    profileImage: {},


    init: async () => {
        const user = await register()
        const profileImage = await getFileLink(user.profileImage);

        console.log(user)

        set({user, profileImage})
    }
}));


export default useAppStore;