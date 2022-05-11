import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { speakUp } from '../translation';

interface InputProps {
    left?: any;
    label: string;
    value: string;
    setValue?: (val: any) => void;
    onPressIn?: (val: any) => void;
    keyboardType: any;
    maxLength: number;
    returnKeyType?: any;
    showSoftInputOnFocus?: boolean;
    language: string;
}

/**
 * This is a custom button that takes ten props
 * @param left a elemetn of type React.ReactNode which is displayed on the left of the TextInput component.
 * @param label the text to use for the floating label.
 * @param value the value of the text input.
 * @param setValue a function that is called when the text inputs´s text changes.
 * @param onPressIn a function that gets called when a touch is engaged.
 * @param keyboardType Decides which keyboard that opens on evnts.
 * @param maxLength max number of characters that can be entered.
 * @param returnKeyType Decides how the return key should look. Options: done/go/next/search/send
 * @param showSoftInputOnFocus if true this will prevent the soft keyboard from showing when the field is focused.
 * @param language the language the SpeakUp function will speak with TTS
 *
 */

const CustomInput: React.FC<InputProps> = (props) => {
    return (
        <View style={styles.subcontainer}>
            <TextInput
                testID="MyInput"
                label={props.label}
                left={props.left}
                onChangeText={props.setValue}
                onPressIn={props.onPressIn}
                mode="outlined"
                style={styles.input}
                value={props.value}
                maxLength={props.maxLength}
                keyboardType={props.keyboardType}
                returnKeyType={props.returnKeyType}
                showSoftInputOnFocus={props.showSoftInputOnFocus}
            />

            <IconButton
                style={styles.icon}
                testID="MyIconButton"
                icon="volume-high"
                size={35}
                onPress={() => speakUp(props.language, props.label)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        margin: 10,
        marginRight: 1,
        marginLeft: 30,
        borderColor: 'black',
        width: 300
    },
    icon: {
        margin: 0,
        marginTop: 20
    },
    subcontainer: {
        flexDirection: 'row'
    }
});
export default CustomInput;
