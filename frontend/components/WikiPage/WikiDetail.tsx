import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { IWiki } from '../../interfaces/types';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { speakUp } from '../../translation';
import { FindSubCategoryIcon } from '../../utils/FindIcon';

type WikiInfoScreenProp = StackNavigationProp<
    RootStackParamList,
    'WikiSubCategoryInfo'
>;

/**
 * Wiki detail is a component that displays each Subcategory card to a given Wiki category
 * Navigates to the info screen about a given subcategory when the user taps on a given subcategory
 *
 */

const WikiDetail = () => {
    const wiki = useRoute().params as IWiki;
    const navigation = useNavigation<WikiInfoScreenProp>();

    return (
        <ScrollView>
            <View>
                {wiki.subcategories &&
                    wiki.subcategories.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            'WikiSubCategoryInfo',
                                            item
                                        )
                                    }
                                >
                                    <WikiDetailCard name={item.name} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
            </View>
        </ScrollView>
    );
};

// A component to display a single subcategory about each Wiki category
const WikiDetailCard = (props: { name: string }) => {
    /*
    Helper function to check if a word is in data
    returns true if it exists.
    */
    const checkIfWordExists = (word: string) => {
        return props.name.toLowerCase() === word.toLowerCase();
    };

    const { i18n, t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.infoDisplay}>
                <FindSubCategoryIcon
                    name={props.name}
                    size={35}
                    color={'#87B18A'}
                />
                <Text
                    style={
                        checkIfWordExists('Emergency')
                            ? styles.emergencyText
                            : styles.mainText
                    }
                >
                    {t(props.name)}
                </Text>
                <View style={styles.soundButton}>
                    <Pressable>
                        <AntDesign
                            name="sound"
                            onPress={() =>
                                speakUp(i18n.language, t(props.name))
                            }
                            size={30}
                            color="black"
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Platform.OS === 'ios' ? 380 : 352,
        height: 90,
        margin: 5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#000000'
    },
    infoDisplay: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    emergencyText: {
        color: 'red',
        fontSize: 25,
        textAlign: 'center',
        margin: 10
    },
    mainText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    soundButton: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        margin: 0,
        marginLeft: Platform.OS === 'ios' ? 310 : 290
    }
});

export default WikiDetail;
