import { t } from 'i18next';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ReadMoreProps = {
    postext: string;
};

/**
 * This component displays Read more and read less text based on line number
 *
 * @param param posttext is the text of the a post
 * @returns
 */
const ReadMore: React.FC<ReadMoreProps> = ({ postext }) => {
    const [isTruncated, setIsTruncated] = useState(true);
    const [numOfLines, setNumOfLines] = useState(0);
    const needButton = numOfLines > 2 ? true : false;

    const onTextLayout = useCallback((e) => {
        if (numOfLines == 0) setNumOfLines(e.nativeEvent.lines.length);
    }, []);

    function toggleIsTruncated() {
        setIsTruncated(!isTruncated);
    }

    return (
        <View>
            {isTruncated === true && needButton === true && (
                <View>
                    <Text
                        onTextLayout={onTextLayout}
                        style={styles.messageText}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >
                        {postext}
                    </Text>

                    <Text style={{ color: 'blue' }} onPress={toggleIsTruncated}>
                        {t('Read more')}
                    </Text>
                </View>
            )}
            {isTruncated === false && needButton === true && (
                <View>
                    <Text
                        onTextLayout={onTextLayout}
                        style={styles.messageText}
                    >
                        {postext}
                    </Text>
                    <Text style={{ color: 'blue' }} onPress={toggleIsTruncated}>
                        {t('Read less')}{' '}
                    </Text>
                </View>
            )}
            {needButton === false && (
                <View>
                    <Text
                        onTextLayout={onTextLayout}
                        style={styles.messageText}
                    >
                        {postext}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default ReadMore;

const styles = StyleSheet.create({
    messageText: {
        fontSize: 14,
        color: '#333333'
    }
});
