import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

/**
 * Renders the startscreen
 */

export const StartScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subcontainer}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
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
