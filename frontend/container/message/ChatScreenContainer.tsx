import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { get, onValue, push, ref } from 'firebase/database';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { auth, database } from '../../firebase.config';
import { Message } from '../../interfaces/types';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { ChatScreen } from '../../view/message/ChatScreen';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'DmChat'>;

/**
 * A DM chat between two users
 * ChatScreenContainer contains the logic for chat screen and displays the chatScreen view
 */

export const ChatScreenContainer = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [User] = useAuthState(auth);
    const chatScreenRoute = useRoute<ChatScreenRouteProp>();
    const recipientId = chatScreenRoute.params.id;
    const [name, setName] = useState('');
    const [repName, setRepName] = useState('');

    useLayoutEffect(() => {
        get(ref(database, `users/${User?.uid}/name/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setName(snapshot.val());
            }
        });
        get(ref(database, `users/${recipientId}/name/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setRepName(snapshot.val());
            }
        });
        const refs = ref(database, `users/${User?.uid}/chats/${recipientId}/`);
        const unsub = onValue(refs, (snapshot) => {
            if (snapshot.exists()) {
                const val = snapshot.val();
                const sortedKeys = Object.keys(val).reverse();
                const messages: Message[] = [];
                sortedKeys.forEach((key) => {
                    messages.push({
                        _id: val[key]._id,
                        text: val[key].message,
                        createdAt: val[key].time,
                        user: val[key].user
                    });
                });
                setMessages(messages);
            }
        });
        return () => {
            setMessages([]);
            setName('');
            setRepName('');
            unsub();
        };
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        /* eslint-disable-next-line */
        const { _id, createdAt, text, user } = messages[0];
        push(ref(database, `users/${User?.uid}/chats/${recipientId}`), {
            _id: _id,
            message: text,
            time: Date(),
            user: user
        });
        push(ref(database, `users/${recipientId}/chats/${User?.uid}`), {
            _id: _id,
            message: text,
            time: Date(),
            user: user
        });
    }, []);

    const renderSendButton = (props: any) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={35}
                        color="#53a2e3"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props: any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#9DD3CC'
                    },
                    left: {
                        backgroundColor: '#999999'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#000000'
                    },
                    left: {
                        color: '#000000'
                    }
                }}
            />
        );
    };

    return (
        <ChatScreen
            messages={messages}
            onSend={onSend}
            User={User}
            name={name}
            repName={repName}
            renderBubble={renderBubble}
            renderSendButton={renderSendButton}
        />
    );
};

export default ChatScreenContainer;
