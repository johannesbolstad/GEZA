import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Image } from 'react-native-elements';

/**
 * Returns a CustomHeader which is rendered in AppNavigator.tsx
 * Displays the logo of the application and a clickable profile icon
 *
 */
const CustomHeader = () => {
    const navigation = useNavigation();
    return (
        <Header
            backgroundColor="#87B18A"
            leftComponent={
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    height={undefined}
                    width={undefined}
                />
            }
            rightComponent={
                <TouchableOpacity
                    style={styles.userLogo}
                    onPress={() => navigation.navigate('Profile' as never)}
                >
                    <FontAwesome name="user-circle-o" size={30} color="white" />
                </TouchableOpacity>
            }
        />
    );
};

const styles = StyleSheet.create({
    logo: {
        display: 'flex',
        flexDirection: 'row',
        width: 100,
        height: 50,
        justifyContent: 'center'
    },
    userLogo: {
        marginRight: 10,
        marginTop: 12
    }
});

export default CustomHeader;
