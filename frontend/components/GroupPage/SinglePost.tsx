import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';

export type SinglePostProps = {
    id: string;
    userName: string;
    description: string;
};

/**
 * A component for displaying a single post.
 *
 * @param userName the userName of the user that has made the post
 * @param description the description of a single post
 */
const SinglePost: React.FC<SinglePostProps> = ({ userName, description }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <Card style={styles.cardStyle}>
            <Card.Title
                title={userName}
                left={(props) => (
                    <Avatar.Icon
                        {...props}
                        icon="account"
                        color="white"
                        style={{ backgroundColor: 'grey' }}
                    />
                )}
            />
            <View style={styles.lineStyle}></View>
            <Card.Content>
                <Paragraph style={{ fontSize: 18 }}>{description}</Paragraph>
            </Card.Content>
            <View style={styles.bottomline}></View>
            <Card.Actions>
                <Button
                    accessibilityLabel="Comment"
                    onPress={() =>
                        navigation.navigate(
                            'CommentForm' as never,
                            { description: description } as never
                        )
                    }
                    icon={'chat'}
                    uppercase={false}
                    color="white"
                    style={styles.commentButtonStyle}
                >
                    <Text>{t('Comment')}</Text>
                </Button>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        marginTop: 30,
        marginLeft: 7,
        borderColor: '#DEDEDE',
        borderWidth: 1,
        borderRadius: 10,
        width: '96%',
        backgroundColor: '#DEDEDE'
    },
    commentButtonStyle: {
        backgroundColor: '#87B18A',
        borderWidth: 2,
        borderRadius: 30
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        marginTop: -10,
        marginBottom: 15
    },
    bottomline: {
        borderWidth: 0.5,
        borderColor: 'black',
        marginTop: 10,
        marginBottom: 5
    }
});

export default SinglePost;
