import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

type ButtonProps = {
    icon: IconSource;
    onPress: () => void;
    text: string;
    grey?: boolean;
};

/**
 * This is a custom button that takes four props
 * @param icon is the icon the button has
 * @param onPress is a function that gets called on a press event.
 * @param onPress is the text on the button
 * @param grey is a boolean that decides whether the button should be grey ot not.
 */

const CustomButton: React.FC<ButtonProps> = ({ icon, onPress, text, grey }) => {
    return (
        <View style={styles.subcontainer}>
            <Button
                testID={'myButton'}
                icon={icon}
                labelStyle={{ color: 'white' }}
                style={styles.button}
                mode="contained"
                color={grey ? '#BEBEBE' : '#4E8E48'}
                onPress={onPress}
                accessible={true}
                accessibilityLabel={text}
            >
                <Text style={{ color: 'white' }}> {text} </Text>
            </Button>
        </View>
    );
};
const styles = StyleSheet.create({
    subcontainer: {
        flexDirection: 'row'
    },
    button: {
        marginTop: 20,
        marginRight: 20,
        borderRadius: 5,
        alignItems: 'center',
        color: '#87B18A',
        borderWidth: 3,
        borderColor: 'black'
    }
});
export default CustomButton;
