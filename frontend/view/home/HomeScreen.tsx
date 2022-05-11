import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { IconButton } from 'react-native-paper';
import ReadMore from '../../components/ReadMore';
import { speakUp } from '../../translation';

type HomeScreenprops = {
    list: Array<any>;
};

/**
 * Renders the homeScreen
 */

export const HomeScreen: React.FC<HomeScreenprops> = ({ list }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }: any) => (
                    <TouchableOpacity
                        style={{ width: '100%' }}
                        onPress={() =>
                            navigation.navigate(
                                t('Groups') as never,
                                {} as never
                            )
                        }
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <View style={styles.textSection}>
                                <View style={styles.userTextInfo}>
                                    <Text style={styles.groupName}>
                                        {item.GroupName}
                                    </Text>
                                    <IconButton
                                        style={styles.icon}
                                        icon="volume-high"
                                        size={35}
                                        onPress={() =>
                                            speakUp('en', item.postText)
                                        }
                                    />
                                </View>

                                <ReadMore postext={item.postText} />

                                <Text style={styles.postUser}>
                                    {'By'}
                                    {': '}
                                    {item.postUser}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    icon: {
        margin: 0,
        padding: 0
    },
    textSection: {
        backgroundColor: '#d5ecea',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
        paddingTop: 0,
        width:
            Platform.OS === 'ios'
                ? Dimensions.get('window').width * 0.95
                : Dimensions.get('window').width * 0.88,
        borderWidth: 2,
        borderLeftColor: '#cccccc',
        borderTopColor: '#cccccc',
        borderBottomColor: '#cccccc',
        borderRightColor: '#cccccc',
        marginBottom: 10
    },
    userTextInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 0
    },
    groupName: {
        marginTop: 20,
        marginBottom: 3,
        fontSize: 14,
        fontWeight: 'bold'
    },
    postUser: {
        marginTop: 8,
        marginLeft: '75%',
        fontSize: 12,
        color: '#666'
    },
    messageText: {
        fontSize: 14,
        color: '#333333'
    }
});
