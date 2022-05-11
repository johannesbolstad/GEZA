import { Ionicons } from '@expo/vector-icons';
import { t } from 'i18next';
import React from 'react';
import { Dimensions } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Message, User } from '../../interfaces/types';

type ChatScreenprops = {
    messages: Message[];
    onSend: (messages?: any) => void;
    User: User | null | undefined;
    name: string;
    repName: string;
    renderBubble: (props: any) => JSX.Element;
    renderSendButton: (props: any) => JSX.Element;
};

/**
 * Renders the chatscreen
 */

export const ChatScreen: React.FC<ChatScreenprops> = ({
    messages,
    onSend,
    User,
    name,
    repName,
    renderBubble,
    renderSendButton
}) => {
    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: User?.uid,
                name: name,
                avatar: repName
            }}
            renderBubble={renderBubble}
            placeholder={t('Type a message') + '...'}
            renderSend={renderSendButton}
            scrollToBottom
            alwaysShowSend
            inverted
            renderActions={() => {
                return (
                    <Ionicons
                        name="ios-mic"
                        size={35}
                        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                        style={{
                            bottom: 0,
                            right: Dimensions.get('window').width / 9,
                            position: 'absolute',
                            zIndex: 2,
                            backgroundColor: 'transparent'
                        }}
                    />
                );
            }}
        />
    );
};
