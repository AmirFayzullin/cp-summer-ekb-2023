import React, {useState} from "react";
import {NotificationsServiceContext} from '../../../contexts/NotificationsServiceContext'
import Alert from "@mui/material/Alert";

export const NotificationsService = ({children}) => {
    const [messages, setMessages] = useState([]);

    const addMessage = ({severity, content}) => {
        const id = (Math.random() * 10 ** 10).toFixed(0);
        setMessages(msgs => [...msgs, { severity, content, id}]);

        // setTimeout(() => {
        //     removeMessage(id);
        // }, 5000);
    };

    const removeMessage = (id) => {
        setMessages(msgs => msgs.filter(msg => msg.id !== id));
    };

    return (
        <NotificationsServiceContext.Provider value={{addMessage}}>
            {children}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minWidth: '200px',
                maxWidth: '400px',
                minHeight: messages.length > 0 ? '40px' : '0px',
                position: 'fixed',
                bottom: '20px',
                right: '20px'
            }}>
                {
                    messages.map(msg => (
                            <Alert onClose={() => removeMessage(msg.id)}
                                   severity={msg.severity}
                                   key={msg.id}
                                   sx={{
                                       background: '#a5e3a5'
                                   }}
                            >
                                {msg.content}
                            </Alert>
                        )
                    )
                }
            </div>
        </NotificationsServiceContext.Provider>
    )
};