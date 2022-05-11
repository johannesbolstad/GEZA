import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MessageComponent from '../../components/Message/MessageComponent';
import { ChatMessage } from '../../interfaces/types';

type MessageScreenprops = {
    chats: ChatMessage[];
};

/**
 * Renders the messageScreen
 */

export const MessageScreen: React.FC<MessageScreenprops> = ({ chats }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('NewChat' as never)}
            >
                <View style={styles.viewOne}>
                    <AntDesign name="pluscircleo" size={40} color={'#000000'} />
                    <Text style={styles.buttonText}>{t('New message')}</Text>
                </View>
            </TouchableOpacity>
            <MessageComponent list={chats} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        alignItems: 'stretch'
    },
    viewOne: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    buttonText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        margin: 5
    },
    button: {
        height: 60,
        width: 378,
        marginLeft: -10
    }
});
