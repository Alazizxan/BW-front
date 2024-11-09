import axios from 'axios';
import useTelegram from "../hooks/telegram.js";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL+'api',
    timeout: 1000,
})


export const fetchTasks = async (telegramId) => {
    const response = await api.get(`/tasks/all/${telegramId}`);
    return response.data.data;
}

export const getStatus = async () => {
    const response = await api.get('/countdown/get')
    return response.data.data.status;
}

export const updateStatus = async (status) => {
    const response = await api.post('/countdown/update', { status: status });
    return response.data.data;
}

export const fetchFriends = async (referallId) => {
    const response = await api.get(`/users/friends/${referallId}`);
    return response.data.data;
}

export const register = async () => {
    const {user, referall } = useTelegram()


    const response = await api.post(`/users/register`, {
        firstName: user.first_name,
        telegramId: user.id,
        profileImage: user.photo_url,
        referall: referall,
    });

    return response.data.data;
}