import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParamList } from '../../navigation/AppNavigator';

type DmChatNavigationProp = StackNavigationProp<RootStackParamList, 'DmChat'>;

/**
 * List is a component that displays a list of recipient
 *
 */
const RecipientList = (props: any) => {
    const navigation = useNavigation<DmChatNavigationProp>();

    const Item = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                navigation.navigate('DmChat', {
                    userName: item.name,
                    id: item.id
                });
            }}
        >
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }: { item: any }) => {
        // when no input, show all
        if (props.searchPhrase === '') {
            return <Item item={item} />;
        }
        // filter of the name of the recipient
        if (
            item.name
                .toUpperCase()
                .includes(
                    props.searchPhrase.toUpperCase().trim().replace(/\s/g, '')
                )
        ) {
            return <Item item={item} />;
        }
    };

    return (
        <SafeAreaView style={styles.list__container}>
            <View>
                <FlatList
                    data={props.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default RecipientList;

const styles = StyleSheet.create({
    list__container: {
        margin: 10,
        height: '85%',
        width: '100%'
    },
    item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey'
    },
    title: {
        fontSize: 20,
        marginBottom: 5
    }
});
