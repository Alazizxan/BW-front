

const useTelegram = () => {
    const telegram = window.Telegram.WebApp;
    const user = window.Telegram.WebApp.initDataUnsafe?.user;

    return {
        telegram,
        user
    }
}

export default useTelegram;