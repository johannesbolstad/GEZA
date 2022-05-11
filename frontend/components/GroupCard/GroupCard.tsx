import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useState } from 'react';
import {
    ImageBackground,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { IGroup } from '../../interfaces/types';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { speakUp } from '../../translation';
import GroupModal from '../GroupModal/GroupModal';
import styles from './styles';

type GroupCardProp = StackNavigationProp<RootStackParamList, 'PostContainer'>;

/**
 * Component that creates a card for a single group
 *
 * @param groupId the groupId of the group
 * @param groupname the groupname of the group
 * @param description the description of the group
 * @param image the image of the group
 * @param language the language of the group and the language speakUp function will be used
 * @param joinGroup a function to add user to the list of group members
 * @param memberOfGroup a function to check if user is member of a given group
 */
const GroupCard: React.FC<IGroup> = ({
    groupId,
    groupname,
    description,
    image,
    language,
    joinGroup,
    memberOfGroup
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<GroupCardProp>();

    const navigateToPosts = () => {
        navigation.navigate('PostContainer', {
            groupName: groupname,
            groupId: groupId,
            image: image,
            description: description,
            language: language
        });
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    memberOfGroup(groupId)
                        ? navigateToPosts()
                        : setModalVisible(true);
                }}
            >
                <ImageBackground
                    source={{
                        uri:
                            image == null || image === ''
                                ? 'https://i.picsum.photos/id/101/2621/1747.jpg?hmac=cu15YGotS0gIYdBbR1he5NtBLZAAY6aIY5AbORRAngs'
                                : image
                    }}
                    style={{ width: '95%', height: 150, margin: 10 }}
                    imageStyle={{
                        margin: 8,
                        borderWidth: 3,
                        borderColor: 'black'
                    }}
                >
                    <View key={groupId} style={styles.groupCard}>
                        <Text style={styles.groupTitle}>{groupname}</Text>
                        <View style={styles.soundIconContainer}>
                            <Pressable
                                style={styles.soundIcon}
                                onPress={() =>
                                    speakUp(
                                        language.slice(0, 2).toLowerCase(),
                                        t(groupname)
                                    )
                                }
                            >
                                <AntDesign
                                    name="sound"
                                    size={32}
                                    color="black"
                                />
                            </Pressable>
                        </View>
                        <GroupModal
                            groupId={groupId}
                            language={language}
                            groupName={groupname}
                            modalVisible={modalVisible}
                            setVisible={() => {
                                setModalVisible(false);
                            }}
                            description={description}
                            joinGroup={joinGroup}
                        />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

export default GroupCard;
