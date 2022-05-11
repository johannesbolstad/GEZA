import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { NoUserScreen } from '../../view/noUserScreen/NoUserScreen';

/**
 * Screen displayed on homescreen, groupscreen and messagescreen if the user has no profile
 * NoUserScreenContainer contains the logic for the no user screen (mainly navigation) and displays the nouserscreen view
 */

export const NoUserScreenContainer = () => {
    const navigation = useNavigation();

    const sendToSignUp = () => {
        navigation.navigate('SignUp' as never, {} as never);
    };
    return <NoUserScreen sendToSignUp={sendToSignUp} />;
};

export default NoUserScreenContainer;
