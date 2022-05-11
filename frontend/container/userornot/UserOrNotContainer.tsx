import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { UserOrNot } from '../../view/UserOrNot/UserOrNot';

/**
 * Lets the user choose whether they should register with a profile or not
 * UserOrNotContainer contains the logic for the no user screen (mainly navigation) and displays the UserOrNot screen view
 */

export const UserOrNotContainer = () => {
    const navigation = useNavigation();

    const sendToSignUp = () => {
        navigation.navigate('SignUp' as never, {} as never);
    };
    const sendToWiki = () => {
        navigation.navigate('Root' as never, {} as never);
    };
    return <UserOrNot sendToSignUp={sendToSignUp} sendToWiki={sendToWiki} />;
};

export default UserOrNotContainer;
