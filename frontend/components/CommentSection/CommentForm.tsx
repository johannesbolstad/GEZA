import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { ICommentProps } from '../../interfaces/types';
import CommentList from './CommentList';

export const getComments: { id: number; content: string; userName: string }[] =
    [
        {
            id: 1,
            content: 'Gøy',
            userName: ''
        },
        {
            id: 2,
            content: 'Bra forslag!',
            userName: ''
        }
    ];

/**
 * The form for making a new comment
 */
const CommentForm = () => {
    const [text, setText] = React.useState<string>('');
    const [counter, setCounter] = React.useState<number>(3);
    const [userName, setUserName] = React.useState<string>('');
    const [comments, setComments] =
        React.useState<ICommentProps[]>(getComments);

    const { t } = useTranslation();

    const isText = (text: string) => {
        return text.length === 0;
    };

    const handleAddComment = (): void => {
        const content = { id: counter, content: text, userName: userName };
        Keyboard.dismiss();
        setComments([...comments, content]);
        setCounter(counter + 1);
        setUserName(userName);
        setText('');
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}
            style={{ flex: 1 }}
        >
            <View
                style={{
                    paddingTop: 15,
                    flexDirection: 'column'
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={styles.descInput}
                            label={t('Write comment') + '...'}
                            accessible={true}
                            accessibilityLabel="Write a comment"
                            value={text}
                            onChangeText={(commentText) => setText(commentText)}
                            activeUnderlineColor="green"
                            underlineColor="green"
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View
                    style={{ flexDirection: 'column', marginTop: 10, left: 40 }}
                >
                    <Button
                        style={[
                            styles.buttonStyle,
                            {
                                backgroundColor: isText(text)
                                    ? 'grey'
                                    : '#87B18A'
                            }
                        ]}
                        mode="contained"
                        disabled={isText(text)}
                        onPress={() => {
                            handleAddComment();
                        }}
                        uppercase={false}
                        accessible={true}
                        accessibilityLabel="Create comment"
                        labelStyle={{
                            color: 'white',
                            fontSize: 15
                        }}
                    >
                        <Text>{t('Create comment')}</Text>
                    </Button>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
                <CommentList getComments={comments} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    descInput: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'lightgrey',
        borderRadius: 4,
        marginHorizontal: 8
    },
    buttonStyle: {
        borderColor: '#87B18A',
        width: '80%',
        height: 50,
        justifyContent: 'center'
    }
});

export default CommentForm;
