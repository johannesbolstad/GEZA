import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { languagesWithFlags, regionsList } from '../../assets/DataLists';
import i18n, { speakUp } from '../../translation';
import { CheckboxList } from '../CheckboxList';
import SearchBar from '../SearchBar';

interface Filterprops {
    searchPhrase: string;
    setSearchPhrase: Dispatch<SetStateAction<string>>;
    setLanguages: Dispatch<SetStateAction<string[]>>;
    setLocations: Dispatch<SetStateAction<string[]>>;
}

/**
 * The filtercomponent shown in the upper part of the groupoverview.
 * Displays a searchbar and the filter categories (location and language).
 * If one filter category is pressed it shows the corresponding list of checkboxes.
 */
const FilterGroups: React.FC<Filterprops> = ({
    searchPhrase,
    setSearchPhrase,
    setLanguages,
    setLocations
}) => {
    const { t } = useTranslation();
    const [locationSelected, setLocationSelected] = useState(false);
    const [languageSelected, setLanguageSelected] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                style={{ width: 250 }}
            />
            <TouchableOpacity
                onPress={() => {
                    locationSelected
                        ? setLocationSelected(false)
                        : setLocationSelected(true);
                }}
            >
                <View style={styles.filterCategory}>
                    <Text
                        style={
                            locationSelected
                                ? styles.filterNameSelected
                                : styles.filterName
                        }
                    >
                        {t('Location')}
                    </Text>
                    <Pressable
                        style={styles.soundIcon}
                        onPress={() => speakUp(i18n.language, t('Location'))}
                    >
                        <AntDesign name="sound" size={30} color="black" />
                    </Pressable>
                    <View
                        style={{
                            marginLeft: Platform.OS === 'ios' ? 160 : 185
                        }}
                    >
                        {locationSelected ? (
                            <MaterialIcons
                                name="keyboard-arrow-up"
                                size={30}
                                color="black"
                            />
                        ) : (
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={30}
                                color="black"
                            />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {locationSelected ? (
                <View style={{ marginLeft: 8 }}>
                    <CheckboxList
                        data={regionsList}
                        handleChange={setLocations}
                    />
                </View>
            ) : null}
            <TouchableOpacity
                onPress={() => {
                    languageSelected
                        ? setLanguageSelected(false)
                        : setLanguageSelected(true);
                }}
            >
                <View style={styles.filterCategory}>
                    <Text
                        style={
                            languageSelected
                                ? styles.filterNameSelected
                                : styles.filterName
                        }
                    >
                        {t('Language')}
                    </Text>
                    <Pressable
                        style={styles.soundIcon}
                        onPress={() => speakUp(i18n.language, t('Language'))}
                    >
                        <AntDesign name="sound" size={30} color="black" />
                    </Pressable>
                    <View
                        style={{
                            marginLeft: Platform.OS === 'ios' ? 150 : 175
                        }}
                    >
                        {languageSelected ? (
                            <MaterialIcons
                                name="keyboard-arrow-up"
                                size={30}
                                color="black"
                            />
                        ) : (
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={30}
                                color="black"
                            />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {languageSelected ? (
                <View style={{ marginLeft: 8 }}>
                    <CheckboxList
                        data={languagesWithFlags}
                        handleChange={setLanguages}
                    />
                </View>
            ) : null}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: '#ffffff',
        alignItems: 'stretch',
        marginBottom: 5,
        marginTop: -15
    },
    filterCategory: {
        width: '89%',
        marginLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopWidth: 2,
        borderColor: 'lightgrey',
        borderBottomWidth: 2,
        marginBottom: -2,
        flexDirection: 'row'
    },
    filterName: {
        fontSize: 20,
        marginLeft: 5
    },
    filterNameSelected: {
        fontSize: 20,
        marginLeft: 5,
        textDecorationLine: 'underline'
    },
    soundIcon: {
        marginLeft: 10,
        width: 50
    }
});

export default FilterGroups;
