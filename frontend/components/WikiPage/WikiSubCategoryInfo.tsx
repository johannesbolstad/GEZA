import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Subcategory } from '../../interfaces/types';
import { speakUp } from '../../translation';

/**
 * A component to display details about a given Wiki subcategory
 *
 */
const WikiSubCategoryInfo = () => {
    const wiki = useRoute().params as Subcategory;
    const { i18n, t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.headingTitle}>{t(wiki.name)}</Text>
            <View style={styles.soundButtonContainer}>
                <Pressable onPress={() => speakUp(i18n.language, wiki.content)}>
                    <AntDesign name="sound" size={30} color="black" />
                </Pressable>
            </View>
            <View>
                <Text style={styles.paragraphText}>{wiki.content}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 50
    },
    headingTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        margin: 5
    },
    paragraphText: {
        margin: 5,
        fontSize: 14,
        lineHeight: 25
    },
    soundButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: 250,
        margin: 0,
        paddingTop: 3
    }
});

export default WikiSubCategoryInfo;
