import { toast } from 'react-toastify';

interface INotificationsProvider {
    success: (val: string) => void;
    error: (val: string) => void;
}

const NotificationsProvider: INotificationsProvider = {
    success: (message) => {
        return toast(message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            type: 'success',
        });
    },
    error: (message) => {
        return toast(message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            type: 'error',
        });
    },
};

export default NotificationsProvider;
