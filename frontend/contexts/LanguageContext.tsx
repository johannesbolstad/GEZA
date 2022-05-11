import React, { createContext, useState } from 'react';
import '../translation';

export const LanguageContext = createContext<{
    language: string;
    setLanguage: (language: string) => void;
}>({
    language: 'en',
    setLanguage: () => {}
});

export const LanguageContextProvider = ({ children } : {children: React.ReactElement}) => {
    const [language, setLanguage] = useState<string>('en');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
