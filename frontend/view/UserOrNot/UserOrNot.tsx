import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import CustomButton from '../../components/CustomButton';

type UserOrNotprops = {
    sendToSignUp: () => void;
    sendToWiki: () => void;
};

/**
 * Renders the userorNot screen
 */

export const UserOrNot: React.FC<UserOrNotprops> = ({
    sendToSignUp,
    sendToWiki
}) => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.cotainer}>
            <View style={styles.subcontainer}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                />
            </View>

            <CustomButton
                icon="account"
                onPress={sendToSignUp}
                text={t('register a user')}
            />
            <CustomButton
                icon="account-off"
                onPress={sendToWiki}
                text={t('Continue without user')}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        backgroundColor: '#87B18A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subcontainer: {
        flexDirection: 'row'
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',
        width: 116,
        height: 56,
        marginBottom: 20,
        justifyContent: 'center'
    }
});
