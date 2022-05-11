import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text
} from 'react-native';
import RecipientList from '../../components/Message/RecipientList';
import SearchBar from '../../components/SearchBar';
import { User } from '../../interfaces/types';

type NewChatprops = {
    searchPhrase: string;
    setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
    users: User[];
};

/**
 * Renders the newchat screen
 */

export const NewChat: React.FC<NewChatprops> = ({
    searchPhrase,
    setSearchPhrase,
    users
}) => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.recipientNameTextStyle}>
                {t('Name of recipient') + ':'}{' '}
            </Text>
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
            />
            {!users ? (
                <ActivityIndicator size="large" />
            ) : (
                <RecipientList searchPhrase={searchPhrase} data={users} />
            )}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    recipientNameTextStyle: {
        fontSize: 20,
        marginRight: 160,
        paddingTop: 20
    }
});
