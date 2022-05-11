import { AntDesign } from '@expo/vector-icons';
import { t } from 'i18next';
import React from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Button } from 'react-native-paper';
import SinglePost from '../../components/GroupPage/SinglePost';
import SearchBar from '../../components/SearchBar';
import { PostObj } from '../../interfaces/types';

type Postsprops = {
    image: string;
    posts: { [id: string]: PostObj };
    loadMorePosts: () => void;
    showLessPosts: () => void;
    navigateToCreatePost: () => void;
};

/**
 *  Renders the posts screen
 */
export const Posts: React.FC<Postsprops> = ({
    image,
    posts,
    loadMorePosts,
    showLessPosts,
    navigateToCreatePost
}) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <Image style={styles.image} source={{ uri: image }} />
                <SearchBar
                    text={'Search for post'}
                    searchLabel={'Search for post'}
                />
                <View style={styles.postButtonContainer}>
                    <Button
                        style={styles.postButton}
                        uppercase={false}
                        onPress={() => navigateToCreatePost()}
                    >
                        <AntDesign name="pluscircleo" size={30} color="black" />
                        <Text style={styles.newPostTextStyle}>
                            {' '}
                            {t('Create new post')}{' '}
                        </Text>
                    </Button>
                </View>
                {Object.keys(posts).length > 0 ? (
                    <View>
                        {Object.keys(posts).map((key: string) => {
                            return (
                                <View key={key}>
                                    <SinglePost
                                        userName={posts[key].author[1]}
                                        description={posts[key].description}
                                        id={key}
                                    />
                                </View>
                            );
                        })}
                        <View style={styles.buttonView}>
                            <View style={{ margin: 15, marginRight: 25 }}>
                                <TouchableOpacity
                                    style={styles.buttons}
                                    accessible={true}
                                    onPress={() => loadMorePosts()}
                                    accessibilityLabel="Vis mer!"
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <AntDesign
                                            name="arrowdown"
                                            size={35}
                                            color="black"
                                        />
                                        <Text style={styles.btnText}>
                                            {' '}
                                            {t('SHOW MORE')}{' '}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={styles.buttons}
                                    accessible={true}
                                    onPress={() => showLessPosts()}
                                    accessibilityLabel="Vis mindre"
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <AntDesign
                                            name="arrowup"
                                            size={35}
                                            color="black"
                                        />
                                        <Text style={styles.btnText}>
                                            {t('SHOW LESS')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <Text style={{ fontSize: 25, margin: 20, marginLeft: 50 }}>
                        No posts..
                    </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    postButtonContainer: {
        top: 20
    },
    postButton: {
        borderColor: 'black',
        width: '92%',
        left: 15,
        borderWidth: 1.5,
        borderRadius: 15,
        backgroundColor: 'white',
        marginTop: -20,
        marginBottom: 10
    },
    newPostTextStyle: {
        color: 'black',
        fontSize: 22
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        paddingBottom: 10
    },
    buttons: {
        width: '100%',
        right: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        paddingTop: 5,
        paddingBottom: 5
    },
    btnText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 5,
        padding: 5
    },
    image: {
        height: 200,
        width: Platform.OS === 'ios' ? 390 : 375
    }
});
