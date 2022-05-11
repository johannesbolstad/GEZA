import { NavigationContainer } from '@react-navigation/native';
import { getAuth, signInAnonymously } from 'firebase/auth';
import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageContextProvider } from './contexts/LanguageContext';
import { AppNavigator } from './navigation/AppNavigator';

signInAnonymously(getAuth());
const App = () => {
    return (
        <SafeAreaProvider>
            <LanguageContextProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </LanguageContextProvider>
        </SafeAreaProvider>
    );
};

LogBox.ignoreLogs([
    'Warning: Async Storage has been extracted from react-native core'
]);
LogBox.ignoreAllLogs();
export default App;
