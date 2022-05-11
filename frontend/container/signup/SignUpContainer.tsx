import { useNavigation } from '@react-navigation/native';
import { updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { RadioButtonProps } from 'react-native-radio-buttons-group';
import { auth, database } from '../../firebase.config';
import { SignUp } from '../../view/signup/SignUp';

/**
 * Lets the user set up a profile
 * ProfileContainer contains the logic for profile screen and displays the profilescreen view
 */

export const SignUpContainer = () => {
    const [userInfo, setUserInfo] = useState({
        userName: '',
        location: '',
        birthday: '',
        sex: '',
        yearsInNorway: ''
    });

    const [error, setError] = useState('');
    const { userName, sex, location, birthday, yearsInNorway } = userInfo;
    const [greyButton, setgreyButton] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const navigation = useNavigation();
    const [user] = useAuthState(auth);
    const { i18n, t } = useTranslation();

    const radioButtonsData: RadioButtonProps[] = [
        {
            id: '1',
            label: t('Male'),
            value: 'male'
        },
        {
            id: '2',
            label: t('Female'),
            value: 'female'
        },
        {
            id: '3',
            label: t('Other'),
            value: 'other'
        }
    ];

    const [radioButtons, setRadioButtons] = useState(radioButtonsData);

    function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
        setRadioButtons(radioButtonsArray);
        getSelctedButton();
    }

    /**
     * Shows an alert message to the users.
     *@param message the text on the alert shown to the user.
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

    React.useEffect(() => {
        isValidObjField(userInfo);
    }, [userInfo, error]);

    /**
     * Writes the users data to the database
     */
    function writeData() {
        if (user && isValidForm()) {
            set(ref(database, `users/${user.uid}`), {
                name: userName,
                birthday: birthday,
                location: location,
                yearsInNorway: yearsInNorway,
                gender: sex,
                language: i18n.language
            });
            updateProfile(user, {
                displayName: userName
            });
            navigation.navigate('Root' as never, {} as never);
        }
    }

    // Navigates the user back to UserOrNot screen
    const goBack = () => {
        navigation.navigate('UserOrNot' as never, {} as never);
    };

    /**
     * Validates every input field and checks if any are empty.
     */
    const isValidObjField = (obj: any) => {
        const isValid = Object.values(obj).every((value: any) => value.trim());
        if (isValid === true) {
            setgreyButton(false);
        } else {
            setgreyButton(true);
        }
        return isValid;
    };

    const isValidForm = () => {
        if (!isValidObjField(userInfo))
            return updateError('All fields are required!', setError);

        if (
            !userName.trim() ||
            userName.length < 2 ||
            !nameValidation(userName)
        )
            return updateError(
                'Invalid username. Username must consist of letters and be at least 3 letters long',
                setError
            );
        if (!nameValidation(location))
            return updateError(
                'Invalid location. Location can only contain letters',
                setError
            );
        if (!yearsInNorway.trim() || !yearValidation(yearsInNorway))
            return updateError(
                'Invalid number of years lived in norway',
                setError
            );
        return true;
    };

    /**
     * Validates the yearsInNorway property. Valid inputs are 0-100
     */
    const yearValidation = (year: string) => {
        var regEx = /^([1-9]?\d|100)$/;
        if (!regEx.test(year)) {
            return false;
        }
        return true;
    };

    /**
     * Validates username and location. Ensures that these consist of alphanumeric characters, underscore, space and hyphen.
     * No underscore, space,  or hyphen at the beining or end. Also these special characters can not come one after the other.
     */
    const nameValidation = (name: string) => {
        var regEx =
            /^(?=[a-zæøåA-ZÆØÅ_-\s]{4,35}$)(?!.*[_.\s]{2,35})[^_-\s].*[^_-\s]$/;
        if (!regEx.test(name)) {
            return false;
        }

        return true;
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    /**
     * Updates a choosen property of the userInfo state object.
     * @param value the new value of the property.
     * @param fieldName the property to be updated.
     */
    const handleOnChangeText = (value: any, fieldName: any) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
    };

    const updateError = (message: string, stateUpdater: Function) => {
        stateUpdater(message);
        showAlert(message);
    };

    /**
     *  When the confirm button on the DateTimePickerModal is pressed, this function runs.
     * @param date is the choosen date. This data is converted to a string and the birthday property of the userInfo state object is updated.
     */
    const handleConfirm = (date: Date) => {
        let fDate =
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear();
        handleOnChangeText(fDate, 'birthday');
        hideDatePicker();
    };

    /**
     * This gets the value of selected radiobutton and updates the sex property of the userInfo state object.
     */
    const getSelctedButton = () => {
        let selectedButton = radioButtons
            .find((e) => e.selected === true)
            ?.value?.toString();
        selectedButton = selectedButton ? selectedButton : 'No gender';
        handleOnChangeText(selectedButton, 'sex');
    };
    return (
        <SignUp
            userName={userName}
            location={location}
            yearsInNorway={yearsInNorway}
            birthday={birthday}
            handleOnChangeText={handleOnChangeText}
            isDatePickerVisible={isDatePickerVisible}
            showDatePicker={showDatePicker}
            hideDatePicker={hideDatePicker}
            handleConfirm={handleConfirm}
            radioButtons={radioButtons}
            onPressRadioButton={onPressRadioButton}
            writeData={writeData}
            goBack={goBack}
            greyButton={greyButton}
        />
    );
};

export default SignUpContainer;
