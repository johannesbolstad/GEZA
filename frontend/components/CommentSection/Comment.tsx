import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ICommentProps } from '../../interfaces/types';

/**
 * A component for displaying a single comment.
 */
const Comment: React.FC<ICommentProps> = ({ id, content, userName }) => {
    return (
        <View style={styles.container} key={id}>
            <View style={styles.subContainer}>
                <Text style={styles.userNameTextStyle}>{userName}: </Text>
            </View>

            <Text>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#87B18A',
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 30
    },
    subContainer: {
        alignItems: 'center'
    },
    userNameTextStyle: {
        fontWeight: 'bold'
    }
});

export default Comment;
