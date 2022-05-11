import { get, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { database } from '../../firebase.config';
import { IWiki } from '../../interfaces/types';
import WikiCard from './WikiCard';

/**
 * WikiList component displays the list of WikiCard component as Flatlist
 *
 */
const WikiList = () => {
    const [data, setData] = React.useState<IWiki[]>([]);

    useEffect(() => {
        get(ref(database, 'categories')).then((snapshot) => {
            if (snapshot.exists()) {
                setData(Object.values(snapshot.val()));
            }
        });
        return () => {
            setData([]);
        };
    }, []);

    const renderItem = ({ item }: { item: IWiki }) => {
        return <WikiCard data={item} {...item} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.listContainer}
                scrollEnabled={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => '#' + item.id}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#DEDEDE'
    },
    listContainer: {
        padding: 15,
        marginTop: Platform.OS === 'ios' ? 100 : 75,
        paddingTop: Platform.OS === 'ios' ? 0 : 5
    }
});

export default WikiList;
