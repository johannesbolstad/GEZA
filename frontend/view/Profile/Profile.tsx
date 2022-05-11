import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IconButton, TextInput } from 'react-native-paper';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { languagesWithFlags, regionsList } from '../../assets/DataLists';
import { BottomPopup } from '../../components/BottomPopup';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import DropDownMenu from '../../components/DropDownMenu';
import i18n from '../../translation';
import { styles } from './styles';

type Profileprops = {
    userName: string;
    birthday: string;
    location: string;
    yearsInNorway: string;
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    changeLanguage: (language: string) => void;
    showDatePicker: () => void;
    isDatePickerVisible: boolean;
    handleConfirm: (date: Date) => void;
    hideDatePicker: () => void;
    radioButtons: RadioButtonProps[];
    onPressRadioButton: (radioButtonsArray: RadioButtonProps[]) => void;
    updateData: () => void;
    handleOnChangeText: (val: any, fieldname: string) => void;
    sendToSignUp: () => void;
    registered: boolean;
};

/**
 * Renders the profile screen
 */

export const Profile: React.FC<Profileprops> = ({
    userName,
    birthday,
    location,
    yearsInNorway,
    language,
    setLanguage,
    changeLanguage,
    showDatePicker,
    isDatePickerVisible,
    handleConfirm,
    hideDatePicker,
    radioButtons,
    onPressRadioButton,
    updateData,
    handleOnChangeText,
    sendToSignUp,
    registered
}) => {
    let popupRef = React.createRef<BottomPopup>() as any;
    const { t } = useTranslation();

    const onShowPopup = () => {
        popupRef.show();
    };

    const onClosePopup = () => {
        popupRef.close();
    };

    const handleChange = () => {
        popupRef.close();
        handleOnChangeText(popupRef.returnLocation(), 'location');
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#fff' }}
        >
            {registered ? (
                <SafeAreaView style={styles.userContainer}>
                    <View
                        style={{ marginRight: Platform.OS === 'ios' ? 60 : 50 }}
                    >
                        <DropDownMenu
                            value={language}
                            onSelect={(selectedItem: any) => {
                                setLanguage(selectedItem.name);
                                handleOnChangeText(
                                    selectedItem.name,
                                    'userLanguage'
                                );
                            }}
                            list={languagesWithFlags}
                        />
                    </View>
                    <CustomInput
                        label={t('User Name')}
                        value={userName}
                        left={<TextInput.Icon size={35} name="account" />}
                        setValue={(val) => handleOnChangeText(val, 'userName')}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyType="done"
                        language={i18n.language}
                    />

                    <CustomInput
                        left={<TextInput.Icon size={35} name="home" />}
                        label={t('Location')}
                        showSoftInputOnFocus={false}
                        value={location}
                        setValue={(val) => handleOnChangeText(val, 'location')}
                        onPressIn={onShowPopup}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyType="done"
                        language={i18n.language}
                    />
                    <BottomPopup
                        ref={(target: any) => (popupRef = target)}
                        onTouchOutside={onClosePopup}
                        title={t('Location')}
                        data={regionsList}
                        handleChange={handleChange}
                    />

                    <CustomInput
                        label={t('Year of birth')}
                        left={<TextInput.Icon size={35} name="cake" />}
                        value={birthday}
                        onPressIn={showDatePicker}
                        keyboardType="numeric"
                        maxLength={10}
                        showSoftInputOnFocus={false}
                        language={i18n.language}
                    />

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        isDarkModeEnabled={true}
                        timePickerModeAndroid="spinner"
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        maximumDate={new Date()}
                        minimumDate={new Date('1900-10-29')}
                    />

                    <CustomInput
                        label={t('Years lived in Norway')}
                        value={yearsInNorway}
                        setValue={(val) =>
                            handleOnChangeText(val, 'yearsInNorway')
                        }
                        keyboardType="numeric"
                        maxLength={3}
                        returnKeyType="done"
                        language={i18n.language}
                    />

                    <View style={styles.buttonView}>
                        <IconButton
                            style={styles.male}
                            icon="human-male"
                            size={40}
                        />
                        <IconButton
                            style={styles.female}
                            icon="human-female"
                            size={40}
                        />
                        <IconButton
                            style={styles.maleFemale}
                            icon="gender-male-female"
                            size={40}
                        />
                    </View>

                    <View style={styles.subcontainer}>
                        <RadioGroup
                            radioButtons={radioButtons}
                            layout="row"
                            onPress={onPressRadioButton}
                        />
                    </View>
                    <CustomButton
                        icon="check"
                        onPress={() => {
                            updateData();
                        }}
                        text={t('Save changes')}
                    />
                </SafeAreaView>
            ) : (
                <SafeAreaView style={styles.noUserContainer}>
                    <View
                        style={{ marginRight: Platform.OS === 'ios' ? 60 : 50 }}
                    >
                        <DropDownMenu
                            value={language}
                            onSelect={(selectedItem: any) => {
                                setLanguage(selectedItem.title);
                                changeLanguage(
                                    selectedItem.name.slice(0, 2).toLowerCase()
                                );
                            }}
                            list={languagesWithFlags}
                        />
                    </View>
                    <CustomButton
                        icon="account"
                        onPress={sendToSignUp}
                        text={t('register a user')}
                    />
                </SafeAreaView>
            )}
        </ScrollView>
    );
};
