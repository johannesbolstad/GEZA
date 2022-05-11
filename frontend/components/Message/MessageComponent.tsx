import { Ionicons } from '@expo/vector-icons';
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

type MessageComponentProps = {
    list: Array<any>;
};

/**
 * A MessageComponent that renders messages with a FlatList.
 * @param list the list of messages.
 */
const MessageComponent: React.FC<MessageComponentProps> = ({ list }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }: any) => (
                    <TouchableOpacity
                        style={{ width: '100%' }}
                        onPress={() => {
                            navigation.navigate(
                                'DmChat' as never,
                                {
                                    userName: item.userName,
                                    id: item.id
                                } as never
                            );
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <View style={{ paddingTop: 15, paddingBottom: 15 }}>
                                <Ionicons
                                    name="person-circle-sharp"
                                    size={50}
                                    color="black"
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.textSection}>
                                <View style={styles.userTextInfo}>
                                    <Text style={styles.userName}>
                                        {item.userName}
                                    </Text>
                                    <Text style={styles.textTime}>
                                        {item.messageTime}
                                    </Text>
                                </View>
                                <Text style={styles.messageText}>
                                    {item.messageText}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

export default MessageComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: 'stretch',
        backgroundColor: '#ffffff'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 15
    },
    textSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
        paddingLeft: 0,
        marginLeft: 0,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    userTextInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    textTime: {
        fontSize: 12,
        color: '#666'
    },
    messageText: {
        fontSize: 12,
        color: '#333333'
    }
});
