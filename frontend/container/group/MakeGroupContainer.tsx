import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { push, ref } from 'firebase/database';
import { ref as refStorage, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Alert, Platform } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { auth, database, storage } from '../../firebase.config';
import { GroupStackParamList } from '../../navigation/GroupNavigation';
import { MakeGroup } from '../../view/group/MakeGroup';

type PostContainerNavigationProp = StackNavigationProp<
    GroupStackParamList,
    'PostContainer'
>;

/**
 * The screen where a user can create a new group
 * MakeGroupContainer contains the logic for makeGroupscreen and displays the makegroup view
 */

export const MakeGroupContainer = () => {
    const [groupInfo, setGroupInfo] = useState({
        groupName: '',
        description: '',
        language: '',
        location: '',
        image: null
    });
    const { groupName, description, language, image, location } = groupInfo;
    const [error, setError] = useState('');
    const [greyButton, setgreyButton] = useState(true);
    const navigation = useNavigation<PostContainerNavigationProp>();

    /**
     * Uploads a field to the groupInfo object when there respectively input field gets changed.
     * @param value the value from the user/input field.
     * @param fieldName the field thats gets updated.
     */
    const handleOnChangeText = (value: string, fieldName: string) => {
        setGroupInfo({ ...groupInfo, [fieldName]: value });
    };
    const [user] = useAuthState(auth);

    const navigateToPosts = () => {
        navigation.navigate('PostContainer', { groupName: groupName });
    };

    /**
     * Writes the group data to the database
     */
    async function writeGroupData() {
        if (isValidForm()) {
            const imageId =
                user?.uid +
                groupName.trim().replace(/\s/g, '') +
                Math.ceil(Math.random() * 1000).toString();
            push(ref(database, 'groups'), {
                admin: user?.uid,
                groupname: groupName,
                description: description,
                language: language,
                groupmembers: [[user?.uid, user?.displayName]],
                location: location,
                image: imageId
            });
            if (image != null) {
                const refs = refStorage(storage, 'groupImages/' + imageId);
                const img = await fetch(image);
                const bytes = await img.blob();
                await uploadBytes(refs, bytes);
            }
            navigateToPosts();
        }
    }

    useEffect(() => {
        setGroupInfo(groupInfo);
        isValidObjField(groupInfo);
    }, [groupInfo, error]);

    /**
     * Show an alert message to the user if the user enters invalid input.
     * @param message the error message which is shown to the user.
     */
    const showAlert = (message: string) =>
        Alert.alert(
            'Invalid Form',
            message,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ],
            {
                cancelable: true
            }
        );

    useEffect(() => {
        const syncFunction = async () => {
            if (Platform.OS !== 'web') {
                const { status } =
                    await ImagePicker.requestCameraPermissionsAsync();

                if (status !== 'granted') {
                    alert('Permisson denied');
                }
            }
        };
        syncFunction();
    }, []);

    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 2],
            quality: 1
        });
        if (!result.cancelled) {
            handleOnChangeText(result.uri, 'image');
        }
    };

    /**
     * Validates username and location. Ensures that these consist of alphanumeric characters, underscore, space and hyphen.
     * No underscore, space,  or hyphen at the begining or end. Also these special characters can not come one after the other.
     */
    const nameValidation = (name: string) => {
        var regEx =
            /^(?=[a-zæøåA-ZÆØÅ_-\s]{4,35}$)(?!.*[_.\s]{2,35})[^_-\s].*[^_-\s]$/;
        if (!regEx.test(name)) {
            return false;
        }
        return true;
    };

    const isValidForm = () => {
        if (!isValidObjField(groupInfo))
            return updateError('not all fields are complete', setError);
        if (
            !groupName.trim() ||
            groupName.length < 3 ||
            !nameValidation(groupName)
        )
            return updateError(
                'Invalid group name. Group name must consist of letters and be at least 3 letters long',
                setError
            );

        return true;
    };

    const updateError = (error: string, stateUpdater: Function) => {
        stateUpdater(error);
        showAlert(error);
    };

    /**
     * Validates every input field and checks if any are empty.
     */
    const isValidObjField = (obj: Object) => {
        const isValid = Object.values(obj)
            .filter((value) => value != null)
            .every((value) => value.trim());

        if (isValid === true) {
            setgreyButton(false);
        } else {
            setgreyButton(true);
        }
        return isValid;
    };

    return (
        <MakeGroup
            image={image}
            groupName={groupName}
            description={description}
            location={location}
            language={language}
            PickImage={PickImage}
            writeGroupData={writeGroupData}
            greyButton={greyButton}
            handleOnChangeText={handleOnChangeText}
        />
    );
};
