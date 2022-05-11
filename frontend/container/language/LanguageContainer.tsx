import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Language } from '../../view/Language/Language';

/**
 * Sets the language for the whole application on start up
 * LanguageContainer contains the logic for the language screen and displays the language screen view
 */

export const LanguageContainer = () => {
    const [language, setLanguage] = useState('');
    const navigation = useNavigation();
    const [greyButton, setgreyButton] = useState(true);
    const writeData = () => {
        if (language === '') {
            return;
        }
        navigation.navigate('UserOrNot' as never, {} as never);
    };

    const { i18n } = useTranslation();
    const languageContext = useContext(LanguageContext);

    const changeLanguage = (language: string) => {
        setgreyButton(false);
        i18n.changeLanguage(language)
            .then(() => languageContext.setLanguage(language))
            .catch((err) => console.error(err));
    };
    return (
        <Language
            language={language}
            greyButton={greyButton}
            writeData={writeData}
            changeLanguage={changeLanguage}
            setLanguage={setLanguage}
        />
    );
};

export default LanguageContainer;
