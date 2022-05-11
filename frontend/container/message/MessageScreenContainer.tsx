import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../firebase.config';
import { ChatMessage } from '../../interfaces/types';
import { MessageScreen } from '../../view/message/MessageScreen';

/**
 * Shows the users their recent messages
 * MessageScreenContainer contains the logic for the messagescreen and displays the messagescreen view
 */

export const MessageScreenContainer = () => {
    const [chats, setChats] = useState<ChatMessage[]>([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const refs = ref(database, `users/${user?.uid}/chats/`);
        const unsub = onValue(refs, (snapshot) => {
            if (snapshot.exists()) {
                const val = snapshot.val();
                const chats: ChatMessage[] = [];
                const sortedKeys = Object.keys(val);
                sortedKeys.forEach((key) => {
                    const chatMessages = val[key];
                    const lastMessageId =
                        Object.keys(chatMessages)[
                            Object.keys(chatMessages).length - 1
                        ];
                    let name = '';
                    if (
                        chatMessages[lastMessageId].user.name ==
                        user?.displayName
                    ) {
                        name = chatMessages[lastMessageId].user.avatar;
                    } else {
                        name = chatMessages[lastMessageId].user.name;
                    }
                    chats.push({
                        id: key,
                        userName: name,
                        messageText: chatMessages[lastMessageId].message,
                        messageTime: chatMessages[lastMessageId].time.substring(
                            0,
                            15
                        )
                    });
                });
                setChats(chats);
            }
        });
        return () => {
            setChats([]);
            unsub();
        };
    }, []);

    return <MessageScreen chats={chats} />;
};

export default MessageScreenContainer;
