import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import CommentForm from '../components/CommentSection/CommentForm';
import CreatePost from '../components/CreatePost';
import GroupInfoModal from '../components/GroupInfoModal';
import { GroupOverviewContainer } from '../container/group/GroupOverviewContainer';
import { MakeGroupContainer } from '../container/group/MakeGroupContainer';
import { PostsContainer } from '../container/group/PostsContainer';

export type GroupStackParamList = {
    CreatePost: { groupName: string; groupId: string };
    GroupOverviewContainer: {};
    PostContainer: {
        groupName: string;
        groupId: string;
        image: string;
        description: string;
        language: string;
    };
    MakeGroupContainer: {};
    CommentForm: { description: string };
};

const Stack = createNativeStackNavigator<GroupStackParamList>();

/**
 * GroupNavigation lets the app to switch between different screens in Group tab
 *
 */

export const GroupNavigation = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GroupOverviewContainer"
                component={GroupOverviewContainer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PostContainer"
                component={PostsContainer}
                options={({ route }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(
                                    'GroupOverviewContainer' as never,
                                    {} as never
                                )
                            }
                        >
                            <AntDesign name="left" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ top: 7, left: 2 }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Feather name="info" size={30} color="white" />
                            <GroupInfoModal
                                groupName={route.params.groupName}
                                modalVisible={modalVisible}
                                setVisible={() => setModalVisible(false)}
                                description={route.params.description}
                                language={route.params.language}
                            />
                        </TouchableOpacity>
                    ),
                    groupId: route.params.groupId,
                    title: route.params.groupName,
                    description: route.params.description,
                    language: route.params.language,
                    headerStyle: {
                        backgroundColor: 'rgba(155,155,155,0.9)'
                    },
                    headerShown: true,
                    gestureEnabled: false,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: 'white'
                })}
            />
            <Stack.Screen
                name="MakeGroupContainer"
                component={MakeGroupContainer}
                options={{
                    title: 'Make group',
                    headerShown: true,
                    gestureEnabled: false,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: 'slategrey'
                    }
                }}
            />
            <Stack.Screen
                name="CommentForm"
                component={CommentForm}
                options={({ route }) => ({
                    title:
                        route.params.description.length > 20
                            ? route.params.description.slice(0, 21) + '...'
                            : route.params.description,
                    headerStyle: {
                        backgroundColor: 'slategrey'
                    },
                    gestureEnabled: false,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: 'white'
                })}
            />
            <Stack.Screen
                name="CreatePost"
                component={CreatePost}
                options={({ route }) => ({
                    groupId: route.params.groupId,
                    groupName: route.params.groupName,
                    headerTitle: 'New post',
                    headerShown: true,
                    gestureEnabled: false,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: 'slategrey'
                    }
                })}
            />
        </Stack.Navigator>
    );
};
