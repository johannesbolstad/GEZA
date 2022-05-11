import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { t } from 'i18next';
import React from 'react';
import WikiDetail from '../components/WikiPage/WikiDetail';
import WikiList from '../components/WikiPage/WikiList';
import WikiSubCategoryInfo from '../components/WikiPage/WikiSubCategoryInfo';

type RootStackParamList = {
    WikiList: undefined;
    WikiDetail: { name: string };
    WikiSubCategoryInfo: { name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * WikiNavigation lets the app to switch between different screens in Wiki tab
 *
 */

const WikiNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WikiList"
                component={WikiList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="WikiDetail"
                component={WikiDetail}
                options={({ route }) => ({
                    title: t(route.params?.name),
                    headerStyle: {
                        backgroundColor: 'slategray'
                    },
                    headerTintColor: 'white',
                    gestureEnabled: false,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center'
                })}
            />
            <Stack.Screen
                name="WikiSubCategoryInfo"
                component={WikiSubCategoryInfo}
                options={({ route }) => ({
                    title: t(route.params.name),
                    headerStyle: {
                        backgroundColor: 'slategray'
                    },
                    headerTintColor: 'white',
                    gestureEnabled: false,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center'
                })}
            />
        </Stack.Navigator>
    );
};

export default WikiNavigation;
