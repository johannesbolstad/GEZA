import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { auth } from '../../firebase.config';
import { ICommentProps } from '../../interfaces/types';
import Comment from './Comment';

interface CommentListProps {
    getComments: Array<ICommentProps>;
}

/**
 * Displays the list of comments
 */
const CommentList: React.FC<CommentListProps> = ({ getComments }) => {
    const [user] = useAuthState(auth);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
                justifyContent: 'space-around'
            }}
        >
            <ScrollView
                invertStickyHeaders={true}
                showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: 20 }}
            >
                {getComments.length > 0 ? (
                    <View>
                        {getComments.map((comment, index) => {
                            return (
                                <View key={index}>
                                    <Comment
                                        id={comment.id}
                                        userName={user?.displayName!}
                                        content={comment.content}
                                    />
                                </View>
                            );
                        })}
                    </View>
                ) : (
                    <Text>No comments yet..</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CommentList;
