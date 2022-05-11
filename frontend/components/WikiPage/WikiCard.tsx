import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { IWiki } from '../../interfaces/types';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { FindWikiIcon } from '../../utils/FindIcon';

type WikiProps = {
    data: IWiki;
};

type WikiDetailScreenProp = StackNavigationProp<
    RootStackParamList,
    'WikiDetail'
>;

/**
 * A card component for Wiki to display a single Wiki category
 * The card component contains an icon and the name of the category
 */

const WikiCard = ({ data }: WikiProps) => {
    const navigation = useNavigation<WikiDetailScreenProp>();

    // Function for navigate a single Wiki Card to a WikiDetail screen
    const navigateToWikiDetail = () => {
        navigation.navigate('WikiDetail', data);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.buttons, { backgroundColor: data.color }]}
                onPress={navigateToWikiDetail}
                accessibilityLabel={data.name}
            >
                <View style={styles.viewOne}>
                    <FindWikiIcon name={data.name} size={40} />
                </View>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>{t(data.name)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DEDEDE',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    viewOne: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    buttons: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 50
    }
});

export default WikiCard;
