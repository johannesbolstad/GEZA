import { t } from 'i18next';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';

type NoUserScreenprops = {
    sendToSignUp: () => void;
};

/**
 * Renders the noUserScreen
 */

export const NoUserScreen: React.FC<NoUserScreenprops> = ({ sendToSignUp }) => {
    return (
        <SafeAreaView style={styles.cotainer}>
            <CustomButton
                icon="account"
                onPress={sendToSignUp}
                text={t('register a user')}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
