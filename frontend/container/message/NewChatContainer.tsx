import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { database } from '../../firebase.config';
import { User } from '../../interfaces/types';
import { NewChat } from '../../view/message/NewChat';

/**
 * A screen where the user can search for other users in order to send them a message
 * NewChatContainer contains the logic for newChat screen and displays the newChat view
 */

export const NewChatContainer = () => {
    const [users] = useState<User[]>([]);

    const [searchPhrase, setSearchPhrase] = useState('');

    useEffect(() => {
        const refs = ref(database, `users/`);
        get(refs).then((snapshot) => {
            snapshot.forEach((child) => {
                users.push({
                    id: child.key!,
                    name: child.child('name').val()
                });
            });
        });
        return () => {
            setSearchPhrase('');
        };
    }, []);

    return (
        <NewChat
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            users={users}
        />
    );
};

export default NewChatContainer;
