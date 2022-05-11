import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import HomeScreenContainer from '../container/home/HomeScreenContainer';
import LanguageContainer from '../container/language/LanguageContainer';
import ChatScreenContainer from '../container/message/ChatScreenContainer';
import MessageScreenContainer from '../container/message/MessageScreenContainer';
import NewChatContainer from '../container/message/NewChatContainer';
import NoUserScreenContainer from '../container/noUserScreen/NoUserScreenContainer';
import { ProfileContainer } from '../container/profile/ProfileContainer';
import SignUpContainer from '../container/signup/SignUpContainer';
import StartScreenContainer from '../container/startScreen/StartScreenContainer';
import UserOrNotContainer from '../container/userornot/UserOrNotContainer';
import { auth } from '../firebase.config';
import { GroupNavigation } from './GroupNavigation';
import WikiNavigation from './WikiNavigation';

export type RootStackParamList = {
    Root: undefined;
    WikiScreen: undefined;
    StartScreen: {};
    Language: undefined;
    SignUp: {};
    UserOrNot: undefined;
    WikiDetail: { wikiName: string };
    WikiSubCategoryInfo: { name: string };
    Messages: undefined;
    Chat: undefined;
    DmChat: { userName: string; id: string };
    NewChat: undefined;
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator lets the app to switch between screens
 * When a new screen is been switched, this screen will be placed on top of the stack
 * https://reactnavigation.org/docs/stack-navigator/
 */

export const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="StartScreen"
                component={StartScreenContainer}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Language"
                component={LanguageContainer}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="UserOrNot"
                component={UserOrNotContainer}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpContainer}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Root"
                component={TopTabNavigator}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen name="Messages" component={MessageScreenContainer} />
            <Stack.Screen
                name="DmChat"
                component={ChatScreenContainer}
                options={({ route }) => ({
                    title: route.params.userName,
                    headerStyle: {
                        backgroundColor: 'slategrey'
                    },
                    headerTintColor: 'white',
                    headerBackTitleVisible: false
                })}
            />
            <Stack.Screen
                name="NewChat"
                component={NewChatContainer}
                options={() => ({
                    title: 'New message',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: 'slategrey'
                    },
                    headerBackTitleVisible: false
                })}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileContainer}
                options={{
                    headerStyle: {
                        backgroundColor: 'slategrey'
                    },
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: 'white'
                }}
            />
        </Stack.Navigator>
    );
};

const Tab = createMaterialTopTabNavigator();

// A top tab navigator that displays tab buttos to navigate between different screens

export const TopTabNavigator = () => {
    const [user] = useAuthState(auth);
    const registered = user && user.displayName == null ? false : true;
    const { t } = useTranslation();

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader />
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#87B18A',
                        height: 63,
                        width: '100%',
                        justifyContent: 'center',
                        margin: 0,
                        padding: 0
                    },
                    tabBarLabelStyle: {
                        textTransform: 'none'
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: 'slategrey',
                        height: 4
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'grey',
                    swipeEnabled: false
                }}
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                size={25}
                                name={focused ? 'home' : 'home-outline'}
                                color={focused ? '#fff' : '#272727'}
                            />
                        )
                    }}
                    component={
                        registered ? HomeScreenContainer : NoUserScreenContainer
                    }
                    name={t('Home')}
                />

                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                size={25}
                                name={focused ? 'people' : 'people-outline'}
                                color={focused ? '#fff' : '#272727'}
                            />
                        )
                    }}
                    component={
                        registered ? GroupNavigation : NoUserScreenContainer
                    }
                    name={t('Groups')}
                />

                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                size={25}
                                name={
                                    focused
                                        ? 'chatbox'
                                        : 'chatbox-ellipses-outline'
                                }
                                color={focused ? '#fff' : '#272727'}
                            />
                        )
                    }}
                    component={
                        registered
                            ? MessageScreenContainer
                            : NoUserScreenContainer
                    }
                    name={t('Messages')}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                size={25}
                                name={
                                    focused ? 'newspaper' : 'newspaper-outline'
                                }
                                color={focused ? '#fff' : '#272727'}
                            />
                        )
                    }}
                    component={WikiNavigation}
                    name={t('Wiki')}
                />
            </Tab.Navigator>
        </View>
    );
};
