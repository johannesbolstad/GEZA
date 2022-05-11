import { Entypo, Feather } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';

// A reusable SearchBar component that can be used by other components
// Inpired by https://github.com/kevintomas1995/logRocket_searchBar/blob/main/components/SearchBar.js

const SearchBar = (props: any) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View
                style={
                    !props.clicked
                        ? styles.searchBar__unclicked
                        : styles.searchBar__clicked
                }
            >
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder={t('Search')}
                    value={props.searchPhrase}
                    onChangeText={props.setSearchPhrase}
                />

                {props.clicked && (
                    <Entypo
                        name="cross"
                        size={20}
                        color="black"
                        style={{ padding: 1 }}
                        onPress={() => {
                            props.setSearchPhrase('');
                        }}
                    />
                )}
            </View>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '97%'
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: 'row',
        width: '95%',
        backgroundColor: '#d9dbda',
        borderRadius: 15,
        alignItems: 'center'
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#d9dbda',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: '90%'
    }
});
