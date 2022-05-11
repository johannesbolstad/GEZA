import { useNavigation } from '@react-navigation/native';
import { updateProfile } from 'firebase/auth';
import { get, ref, update } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { RadioButtonProps } from 'react-native-radio-buttons-group';
import { getLanguage } from '../../assets/DataLists';
import { LanguageContext } from '../../contexts/LanguageContext';
import { auth, database } from '../../firebase.config';
import { Profile } from '../../view/Profile/Profile';

/**
 * Lets the user edit their profile
 * ProfileContainer contains the logic for profile screen and displays the profilescreen view
 */

export const ProfileContainer = () => {
    const [userInfo, setUserInfo] = useState({
        userName: '',
        location: '',
        birthday: '',
        sex: '',
        yearsInNorway: '',
        userLanguage: ''
    });

    /* eslint-disable-next-line */
    const [error, setError] = useState('');
    const { userName, sex, location, birthday, yearsInNorway, userLanguage } =
        userInfo;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [user] = useAuthState(auth);
    const registered = user && user.displayName == null ? false : true;
    const { i18n, t } = useTranslation();

    const navigation = useNavigation();
    const sendToSignUp = () => {
        navigation.navigate('SignUp' as never, {} as never);
    };
    function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
        setRadioButtons(radioButtonsArray);
        getSelctedButton();
    }

    useEffect(() => {
        setLanguage(getLanguage(i18n.language));
        if (registered) {
            get(ref(database, `users/${user?.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const val = snapshot.val();
                    setUserInfo({
                        userName: val.name,
                        location: val.location,
                        birthday: val.birthday,
                        sex: val.gender,
                        yearsInNorway: val.yearsInNorway,
                        userLanguage: val.language
                    });
                    setLanguage(getLanguage(val.language));
                    setRadioButtons(radioButtonsData(val.gender));
                }
            });
        }
    }, []);

    const radioButtonsData = (sex: String) => {
        return [
            {
                id: '1',
                label: t('Male'),
                value: 'male',
                selected: sex === 'male' ? true : false
            },
            {
                id: '2',
                label: t('Female'),
                value: 'female',
                selected: sex === 'female' ? true : false
            },
            {
                id: '3',
                label: t('Other'),
                value: 'other',
                selected: sex === 'other' ? true : false
            }
        ];
    };

    const [radioButtons, setRadioButtons] = useState(radioButtonsData(''));

    /**
     * Shows an altert message to the users.
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

    /**
     * Updates the user's data in the database
     */
    function updateData() {
        if (user && isValidForm()) {
            const updates: { [id: string]: string } = {};
            updates.name = userName;
            updates.birthday = birthday;
            updates.location = location;
            updates.yearsInNorway = yearsInNorway;
            updates.gender = sex;
            updates.language = userLanguage.slice(0, 2).toLowerCase();
            update(ref(database, `users/${user.uid}`), updates);
            updateProfile(user, {
                displayName: userName
            });
            changeLanguage(userLanguage.slice(0, 2).toLowerCase());
            navigation.navigate('Root' as never, {} as never);
        }
    }

    /**
     * Validates every input field and checks if any are empty.
     */
    const isValidObjField = (obj: any) => {
        return Object.values(obj).every((value: any) => value.trim());
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

    /**
     * @param message a text that gets passed further to the showAlert function.
     * @param stateUpdater a function that updates the error property.
     */

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

    const [language, setLanguage] = useState<any>('');

    const languageContext = useContext(LanguageContext);

    const changeLanguage = (language: string | any) => {
        i18n.changeLanguage(language)
            .then(() => languageContext.setLanguage(language))
            .catch((err) => console.error(err));
    };

    return (
        <Profile
            userName={userName}
            birthday={birthday}
            location={location}
            yearsInNorway={yearsInNorway}
            language={language}
            setLanguage={setLanguage}
            changeLanguage={changeLanguage}
            showDatePicker={showDatePicker}
            isDatePickerVisible={isDatePickerVisible}
            handleConfirm={handleConfirm}
            hideDatePicker={hideDatePicker}
            radioButtons={radioButtons}
            onPressRadioButton={onPressRadioButton}
            updateData={updateData}
            handleOnChangeText={handleOnChangeText}
            sendToSignUp={sendToSignUp}
            registered={registered}
        />
    );
};
