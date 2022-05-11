import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IconButton, TextInput } from 'react-native-paper';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { regionsList } from '../../assets/DataLists';
import { BottomPopup } from '../../components/BottomPopup';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

type SignUpprops = {
    userName: string;
    birthday: string;
    location: string;
    yearsInNorway: string;
    showDatePicker: () => void;
    isDatePickerVisible: boolean;
    handleConfirm: (date: Date) => void;
    hideDatePicker: () => void;
    radioButtons: RadioButtonProps[];
    onPressRadioButton: (radioButtonsArray: RadioButtonProps[]) => void;
    goBack: () => void;
    writeData: () => void;
    handleOnChangeText: (val: any, fieldname: string) => void;
    greyButton: boolean;
};

/**
 * Renders the signUp screen
 */

export const SignUp: React.FC<SignUpprops> = ({
    userName,
    birthday,
    location,
    yearsInNorway,
    showDatePicker,
    isDatePickerVisible,
    handleConfirm,
    hideDatePicker,
    radioButtons,
    onPressRadioButton,
    goBack,
    writeData,
    handleOnChangeText,
    greyButton
}) => {
    const { i18n, t } = useTranslation();
    let popupRef = React.createRef<BottomPopup>() as any;

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
            <SafeAreaView style={styles.cotainer}>
                <View style={styles.subcontainer}>
                    <Image
                        source={require('../../assets/Logo2.png')}
                        style={styles.logo}
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
                    setValue={(val) => handleOnChangeText(val, 'yearsInNorway')}
                    keyboardType="numeric"
                    maxLength={3}
                    returnKeyType="done"
                    language={i18n.language}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        width: 275,
                        marginRight: 10
                    }}
                >
                    <IconButton
                        style={{
                            paddingLeft: 0,
                            paddingBottom: 0,
                            marginBottom: 0,
                            marginLeft: 0
                        }}
                        icon="human-male"
                        size={40}
                    />
                    <IconButton
                        style={{
                            paddingLeft: 20,
                            paddingBottom: 0,
                            marginBottom: 0,
                            marginRight: 45
                        }}
                        icon="human-female"
                        size={40}
                    />
                    <IconButton
                        style={{ paddingBottom: 0, marginBottom: 0 }}
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
                    grey={greyButton ? true : false}
                    icon="check"
                    onPress={() => {
                        writeData();
                    }}
                    text={t('Sign up')}
                />
                <CustomButton
                    icon="arrow-left"
                    onPress={goBack}
                    text={t('Back')}
                />
            </SafeAreaView>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    input: {
        height: 60,
        margin: 10,
        marginRight: 1,
        marginLeft: 30,
        borderColor: 'black',
        width: '75%'
    },
    cotainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        margin: 0,
        marginTop: 20
    },
    subcontainer: {
        flexDirection: 'row'
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',
        width: 116,
        height: 56,
        justifyContent: 'center'
    }
});
