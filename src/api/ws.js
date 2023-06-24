import Echo from "laravel-echo";
import Pusher from 'pusher-js';
import {config} from '../config';

export function createSocketConnection(token) {
    window.Pusher = Pusher;
    if (!window.Echo) {
        window.Echo = new Echo({
            authEndpoint:  `${config.baseUrl}/broadcasting/auth`,
            broadcaster: "pusher",
            key: "213123123",
            wsHost: "ws.family-clients.ru",
            wsPort: 6002,
            wssPort: 6002,
            forceTLS: 'https',
            cluster: "mt1",
            auth: {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        });
    }
}
