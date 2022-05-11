import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { push, ref } from 'firebase/database';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Button, HelperText, IconButton } from 'react-native-paper';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { auth, database } from '../firebase.config';
import { GroupStackParamList } from '../navigation/GroupNavigation';
import i18n, { speakUp } from '../translation';

type GroupPostRouteProp = RouteProp<GroupStackParamList, 'PostContainer'>;
type PostContainerNavigationProp = StackNavigationProp<
    GroupStackParamList,
    'PostContainer'
>;

/**
 * A component that lets the user create a new post in a group with a form
 */
const CreatePost = () => {
    const route = useRoute<GroupPostRouteProp>();

    const [user] = useAuthState(auth);
    const groupId = route.params.groupId;
    const groupName = route.params.groupName;
    const navigation = useNavigation<PostContainerNavigationProp>();

    const [postInfo, setPostInfo] = useState({
        postTitle: '',
        description: ''
    });

    const [errorMessage, setShowErrorMessage] = useState(false);
    const { postTitle, description } = postInfo;

    useEffect(() => {
        setPostInfo(postInfo);
    }, [postInfo]);

    const validateEmptyFields = () => {
        return [postTitle, description].some((i) => i === '');
    };

    // checks if length of title is under 5
    const checkTitleLength = () => {
        return postTitle.trim().length < 5;
    };

    // checks if length of description is under 8
    const checkDescriptionLength = () => {
        return description.trim().length < 8;
    };

    // Submitting the form to firebase, which creates a new post
    // Navigates back to the post screen after successfully created new post
    const onSubmit = () => {
        if (
            !validateEmptyFields() &&
            !checkDescriptionLength() &&
            !checkTitleLength()
        ) {
            Alert.alert('Successfully created new post!');
            push(ref(database, `groups/${groupId}/posts/`), {
                author: [user?.uid, user?.displayName],
                title: postTitle,
                description: description
            });
            navigation.navigate('PostContainer', {
                groupName: groupName,
                groupId: groupId
            });
        }
    };

    const onChangeInput = (value: string, fieldName: string) => {
        setPostInfo({ ...postInfo, [fieldName]: value });
    };

    return (
        <KeyboardAvoidingView behavior={'position'} style={{ flex: 1 }}>
            <SafeAreaView style={styles.subContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <React.Fragment>
                        <ScrollView
                            style={{
                                marginLeft: Platform.OS === 'ios' ? 50 : 30,
                                paddingRight: 30
                            }}
                            showsVerticalScrollIndicator={false}
                            invertStickyHeaders={true}
                        >
                            <View style={{ bottom: 10, right: 20 }}>
                                <IconButton
                                    icon="volume-high"
                                    size={35}
                                    style={{
                                        left: Platform.OS === 'ios' ? 290 : 270,
                                        margin: 0,
                                        top: 83
                                    }}
                                    onPress={() =>
                                        speakUp(i18n.language, t('Title'))
                                    }
                                />
                            </View>
                            <Text style={styles.titleTextStyle}>
                                {' '}
                                {t('Title')}:
                                <Text style={styles.asteriskStyle}>*</Text>
                            </Text>

                            <TextInput
                                textAlign="center"
                                textAlignVertical={'top'}
                                placeholder={t('Enter GroupPost title')}
                                style={[
                                    styles.postTitleInput,
                                    {
                                        borderColor: !postTitle
                                            ? '#FF0000'
                                            : 'lightgreen'
                                    }
                                ]}
                                accessibilityLabel="Enter Group post title"
                                value={postTitle}
                                blurOnSubmit={true}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                onChangeText={(postTitle) => {
                                    onChangeInput(postTitle, 'postTitle');
                                }}
                            />
                            <View style={{ width: 300, height: 30 }}>
                                {errorMessage && postInfo.postTitle !== '' ? (
                                    <HelperText
                                        type="error"
                                        visible={checkTitleLength()}
                                        style={[
                                            styles.helperTextStyle,
                                            { left: 30 }
                                        ]}
                                    >
                                        Required length is 5.
                                    </HelperText>
                                ) : null}
                            </View>
                            <View style={{ right: 30 }}>
                                <IconButton
                                    onPress={() =>
                                        speakUp(i18n.language, t('Description'))
                                    }
                                    icon="volume-high"
                                    size={35}
                                    style={{
                                        left: Platform.OS === 'ios' ? 300 : 280,
                                        margin: 0,
                                        top: 40
                                    }}
                                />
                            </View>
                            <View style={{ marginBottom: 10, bottom: 50 }}>
                                <Text style={styles.descriptionTextStyle}>
                                    {t('Description')}:
                                    <Text style={styles.asteriskStyle}>*</Text>
                                </Text>
                                <TextInput
                                    placeholder={
                                        t('Write some description') + '...'
                                    }
                                    textAlignVertical="top"
                                    multiline={true}
                                    autoFocus={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => {
                                        Keyboard.dismiss();
                                    }}
                                    style={[
                                        styles.descriptionInput,
                                        {
                                            borderColor: !description
                                                ? '#FF0000'
                                                : 'lightgreen'
                                        }
                                    ]}
                                    accessibilityLabel="Write description to post"
                                    value={description}
                                    onChangeText={(description) =>
                                        onChangeInput(
                                            description,
                                            'description'
                                        )
                                    }
                                />
                            </View>
                            {errorMessage && postInfo.description !== '' ? (
                                <HelperText
                                    style={[
                                        styles.helperTextStyle,
                                        styles.descriptionMessage
                                    ]}
                                    type="error"
                                    visible={checkDescriptionLength()}
                                >
                                    {'Required length is 8. Your text has a length of ' +
                                        description.trim().length}
                                </HelperText>
                            ) : null}
                        </ScrollView>
                        <View style={styles.buttonView}>
                            <Button
                                style={styles.createPostButton}
                                uppercase={false}
                                accessible={true}
                                accessibilityLabel="Create post"
                                onPress={() => {
                                    onSubmit();
                                    setShowErrorMessage(true);
                                }}
                                disabled={Boolean(
                                    !postInfo.postTitle && !postInfo.description
                                )}
                            >
                                <Text style={styles.createPostText}>
                                    {t('Create post')}
                                </Text>
                            </Button>
                        </View>
                    </React.Fragment>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    subContainer: {
        marginTop: Platform.OS === 'ios' ? 10 : 5,
        padding: 20,
        alignItems: 'center'
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    postTitleInput: {
        margin: 2,
        height: 40,
        width: 250,
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 20,
        paddingTop: 10
    },
    descriptionInput: {
        paddingHorizontal: 10,
        marginTop: 2,
        height: 75,
        width: 250,
        borderRadius: 5,
        borderWidth: 2,
        fontSize: 20
    },
    createPostButton: {
        flex: 1,
        backgroundColor: '#87B18A',
        margin: -30,
        height: 50,
        width: '190%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    helperTextStyle: {
        color: 'red',
        fontSize: 12,
        fontStyle: 'italic'
    },
    titleTextStyle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    descriptionTextStyle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    descriptionMessage: {
        bottom: Platform.OS === 'ios' ? 30 : 35,
        zIndex: 2,
        position: 'absolute'
    },
    buttonView: {
        flex: 1,
        position: 'absolute',
        left: 115,
        top: 350
    },
    createPostText: {
        color: 'white',
        fontSize: 20
    },
    asteriskStyle: {
        color: 'red',
        justifyContent: 'center'
    }
});

export default CreatePost;
