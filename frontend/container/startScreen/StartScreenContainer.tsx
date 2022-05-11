import { useNavigation } from '@react-navigation/native';
import { get, ref } from 'firebase/database';
import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LanguageContext } from '../../contexts/LanguageContext';
import { auth, database } from '../../firebase.config';
import i18n from '../../translation';
import { StartScreen } from '../../view/Startscreen/StartScreen';

/**
 * The first screen the user sees. Checks if the user has a profile or not
 * StartscreenContainer contains the logic for startscreen and displays the startscreen view
 */

export const StartScreenContainer = () => {
    const [user] = useAuthState(auth);
    const languageContext = useContext(LanguageContext);

    const changeLanguage = (language: string | any) => {
        i18n.changeLanguage(language)
            .then(() => languageContext.setLanguage(language))
            .catch((err) => console.error(err));
    };

    const navigation = useNavigation();
    setTimeout(() => {
        if (user && user.displayName != null) {
            get(ref(database, `users/${user.uid}/language/`)).then(
                (snapshot) => {
                    if (snapshot.exists()) {
                        changeLanguage(snapshot.val());
                    }
                }
            );
            navigation.navigate('Root' as never, {} as never);
        } else if (user && user.displayName == null) {
            navigation.navigate('Language' as never, {} as never);
        }
    }, 3000);

    return <StartScreen />;
};

export default StartScreenContainer;
